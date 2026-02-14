import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 lg:px-8 py-20 text-center">
        <h1 className="section-heading text-3xl font-semibold mb-4">Your Cart</h1>
        <p className="text-muted-foreground mb-8">Your cart is empty.</p>
        <Link to="/shop">
          <Button variant="outline" className="rounded-none tracking-widest uppercase text-xs font-medium">
            Continue Shopping
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 lg:px-8 py-12">
      <h1 className="section-heading text-3xl font-semibold mb-10">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="flex gap-4 border-b border-border pb-6">
              <Link to={`/product/${item.productId}`} className="w-24 h-24 bg-secondary flex-shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Size: {item.size}</p>
                  </div>
                  <button onClick={() => removeItem(item.productId, item.size)} aria-label="Remove item">
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-border">
                    <button
                      className="p-2 hover:bg-secondary transition-colors"
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button
                      className="p-2 hover:bg-secondary transition-colors"
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-sm font-medium">${item.price * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-secondary p-6">
          <h2 className="text-xs font-medium tracking-widest uppercase mb-6">Order Summary</h2>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm mb-6">
            <span className="text-muted-foreground">Shipping</span>
            <span>{totalPrice >= 100 ? "Free" : "$10"}</span>
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-medium mb-6">
            <span>Total</span>
            <span>${totalPrice >= 100 ? totalPrice : totalPrice + 10}</span>
          </div>
          <Link to="/checkout">
            <Button className="w-full rounded-none tracking-widest uppercase text-xs font-medium" size="lg">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
