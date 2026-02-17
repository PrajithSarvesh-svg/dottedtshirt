import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";

const orderSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Invalid phone number").max(20),
  address: z.string().trim().min(5, "Address is required").max(500),
});

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const shipping = totalPrice >= 100 ? 0 : 10;
  const total = totalPrice + shipping;

  if (items.length === 0 && !success) {
    navigate("/cart");
    return null;
  }

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = orderSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    const orderItems = items.map((i) => ({
      id: i.productId,
      name: i.name,
      size: i.size,
      quantity: i.quantity,
      price: i.price,
    }));

    const { error } = await supabase.from("orders").insert({
      customer_name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      address: result.data.address,
      items: orderItems,
      total_price: total,
    });

    setLoading(false);

    if (error) {
      toast.error("Failed to place order. Please try again.");
      return;
    }

    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <main className="container mx-auto px-4 lg:px-8 py-20 text-center max-w-lg">
        <CheckCircle className="mx-auto h-16 w-16 text-success mb-6" />
        <h1 className="section-heading text-3xl font-semibold mb-4">Order Placed</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order! We'll send a confirmation to your email shortly.
        </p>
        <Button
          variant="outline"
          className="rounded-none tracking-widest uppercase text-xs font-medium"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 lg:px-8 py-12">
      <h1 className="section-heading text-3xl font-semibold mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-xs tracking-widest uppercase">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="rounded-none mt-1"
                maxLength={100}
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-xs tracking-widest uppercase">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="rounded-none mt-1"
                maxLength={255}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-xs tracking-widest uppercase">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="rounded-none mt-1"
              maxLength={20}
            />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
          </div>

          <div>
            <Label htmlFor="address" className="text-xs tracking-widest uppercase">Address</Label>
            <Textarea
              id="address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="rounded-none mt-1 resize-none"
              rows={3}
              maxLength={500}
            />
            {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-none tracking-widest uppercase text-xs font-medium"
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Place Order — ₹{total}
          </Button>
        </form>

        {/* Summary */}
        <div className="bg-secondary p-6 h-fit">
          <h2 className="text-xs font-medium tracking-widest uppercase mb-4">Items</h2>
          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                <span>{item.name} ({item.size}) × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
