import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import heroImage from "@/assets/hero.jpg";

const Index = () => {
  const featured = products.filter((p) => p.featured);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <img
          src={heroImage}
          alt="Dotted essentials — premium t-shirts"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-foreground/20" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="brand-name text-5xl md:text-7xl font-bold text-primary-foreground mb-4 animate-fade-in">
            Dotted
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl font-light tracking-wide mb-8 animate-slide-up max-w-md">
            Premium essentials. Nothing more.
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-none px-8 tracking-widest uppercase text-xs font-medium">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="section-heading text-2xl font-semibold">Featured</h2>
          <Link to="/shop" className="text-xs font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
          <h2 className="section-heading text-2xl font-semibold mb-6">Crafted with Intent</h2>
          <p className="text-muted-foreground leading-relaxed">
            Every Dotted tee is made from 100% organic cotton, garment-dyed for rich color,
            and cut with a relaxed, contemporary silhouette. We believe in doing one thing exceptionally well.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Index;
