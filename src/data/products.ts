import blackTee from "@/assets/product-black-tee.jpg";
import whiteTee from "@/assets/product-white-tee.jpg";
import navyTee from "@/assets/product-navy-tee.jpg";
import sageTee from "@/assets/product-sage-tee.jpg";
import charcoalTee from "@/assets/product-charcoal-tee.jpg";
import creamTee from "@/assets/product-cream-tee.jpg";

export type Size = "S" | "M" | "L" | "XL";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  sizes: Size[];
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "essential-black",
    name: "Essential Black Tee",
    price: 450,
    description: "Our signature oversized tee in deep black. Crafted from 100% organic cotton with a relaxed drop-shoulder silhouette. Pre-washed for softness.",
    image: blackTee,
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "essential-white",
    name: "Essential White Tee",
    price: 450,
    description: "A clean canvas in pure white. Made from heavyweight organic cotton with a boxy, contemporary cut. The foundation of every wardrobe.",
    image: whiteTee,
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "essential-navy",
    name: "Essential Navy Tee",
    price: 480,
    description: "Rich navy blue in our relaxed fit. Garment-dyed for a lived-in feel with exceptional color depth that only improves with wear.",
    image: navyTee,
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "essential-sage",
    name: "Essential Sage Tee",
    price: 480,
    description: "Muted sage green for a grounded, natural palette. Enzyme-washed organic cotton with a soft hand feel and relaxed drape.",
    image: sageTee,
    sizes: ["S", "M", "L", "XL"],
    featured: false,
  },
  {
    id: "essential-charcoal",
    name: "Essential Charcoal Tee",
    price: 450,
    description: "Deep charcoal grey that bridges black and grey. Heavyweight 240gsm cotton jersey with reinforced collar construction.",
    image: charcoalTee,
    sizes: ["S", "M", "L", "XL"],
    featured: false,
  },
  {
    id: "essential-cream",
    name: "Essential Cream Tee",
    price: 480,
    description: "Warm cream with a subtle vintage tone. Our softest cotton blend with a gentle drape and naturally relaxed structure.",
    image: creamTee,
    sizes: ["S", "M", "L", "XL"],
    featured: false,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
