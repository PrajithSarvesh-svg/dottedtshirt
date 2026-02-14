import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Shop = () => (
  <main className="container mx-auto px-4 lg:px-8 py-12">
    <h1 className="section-heading text-3xl font-semibold mb-2">Shop All</h1>
    <p className="text-muted-foreground mb-10">Our full collection of essential tees.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </main>
);

export default Shop;
