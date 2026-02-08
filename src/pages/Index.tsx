import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { categories, products } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.png";
import { useState, useEffect } from "react";

const heroSlides = [
  { image: hero1, title: "Timeless Rose Gold Jewellery", subtitle: "Designed for elegance, crafted for everyday beauty" },
  { image: hero2, title: "Bridal Collection 2026", subtitle: "Make your special day even more memorable" },
  { image: hero3, title: "Diamond Elegance", subtitle: "Exquisite diamond pieces that captivate and shine" },
];

const features = [
  { icon: Sparkles, title: "Certified Purity", desc: "BIS Hallmarked" },
  { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
  { icon: ShieldCheck, title: "Lifetime Exchange", desc: "On all gold jewellery" },
  { icon: RotateCcw, title: "Easy Returns", desc: "15-day return policy" },
];

const Index = () => {
  const [slide, setSlide] = useState(0);
  const newArrivals = products.filter((p) => p.isNew || p.isBestseller).slice(0, 4);
  const featured = products.slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
          >
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
          </div>
        ))}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
              {heroSlides[slide].title}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-6">{heroSlides[slide].subtitle}</p>
            <div className="flex gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Shop Collection <ArrowRight size={16} />
              </Link>
              <Link
                to="/products?metal=gold"
                className="inline-flex items-center gap-2 border border-foreground/30 text-foreground px-6 py-3 rounded-lg font-medium text-sm hover:bg-foreground/5 transition-colors"
              >
                Explore Bridal
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === slide ? "bg-primary" : "bg-foreground/30"}`}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-3 justify-center">
                <f.icon size={20} className="text-primary shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">Shop by Category</h2>
          <p className="text-muted-foreground text-center mb-10">Find your perfect piece</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/products?category=${cat.slug}`}
                className="group block relative aspect-square rounded-xl overflow-hidden"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-display text-lg font-semibold text-primary-foreground">{cat.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">New Arrivals</h2>
              <p className="text-muted-foreground">Freshly crafted, just for you</p>
            </div>
            <Link to="/products" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Featured Collection</h2>
            <p className="text-muted-foreground">Curated pieces you'll love</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Index;
