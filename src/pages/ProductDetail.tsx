import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getProduct, type Size } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check } from "lucide-react";

const sizes: Size[] = ["S", "M", "L", "XL"];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProduct(id || "");
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  if (!product) {
    navigate("/shop");
    return null;
  }

  const handleAdd = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.image,
    });
    toast.success("Added to cart");
  };

  return (
    <main className="container mx-auto px-4 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image */}
        <div className="aspect-square bg-secondary overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <h1 className="section-heading text-2xl md:text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-xl text-muted-foreground mb-6">${product.price}</p>
          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          {/* Sizes */}
          <div className="mb-8">
            <p className="text-xs font-medium tracking-widest uppercase mb-3">Size</p>
            <div className="flex gap-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 border text-sm font-medium transition-colors flex items-center justify-center ${
                    selectedSize === s
                      ? "bg-foreground text-background border-foreground"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleAdd}
            size="lg"
            className="rounded-none tracking-widest uppercase text-xs font-medium w-full lg:w-auto"
          >
            <Check className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
