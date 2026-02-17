import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => (
  <Link to={`/product/${product.id}`} className="group block">
    <div className="aspect-square overflow-hidden bg-secondary mb-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
    <p className="text-sm text-muted-foreground mt-1">₹{product.price}</p>
  </Link>
);

export default ProductCard;
