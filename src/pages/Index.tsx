import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { categories, products } from "@/data/mockData";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "@/components/ProductCard";
import { FestivalShowcase } from "@/components/FestivalShowcase";
import hero3 from "@/assets/hero-3.png";

const marqueeItems = [
  { icon: Sparkles, title: "Certified Purity", desc: "BIS Hallmarked Jewellery" },
  { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
  { icon: ShieldCheck, title: "Lifetime Exchange", desc: "On all gold jewellery" },
  { icon: RotateCcw, title: "Easy Returns", desc: "15-day return policy" },
];

const Index = () => {
  const newArrivals = products.filter((p) => p.isNew || p.isBestseller).slice(0, 4);
  const featured = products.slice(0, 8);
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img src={hero3} alt="Diamond Elegance" className="w-full h-full object-cover object-center" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        <div className="absolute inset-0 z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-primary font-display text-xs md:text-sm tracking-[0.4em] uppercase mb-3 font-black">Luxury Fine Jewellery</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-foreground leading-[1.1] mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-xl mb-8 max-w-md leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-95"
              >
                {t("hero.button")} <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scrolling Marquee */}
      <section className="border-b border-border bg-secondary/60 overflow-hidden">
        <div className="marquee-container py-3">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-8 shrink-0">
                <item.icon size={18} className="text-primary shrink-0" />
                <span className="text-sm font-semibold whitespace-nowrap">{item.title}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">— {item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="container mx-auto px-4 py-10 md:py-20">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">{t("category.title")}</h2>
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
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="eager" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-display text-lg font-semibold text-primary-foreground">{cat.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Festival Showcase */}
      <FestivalShowcase />

      {/* New Arrivals */}
      <section className="bg-secondary/50 py-10 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">{t("arrivals.title")}</h2>
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
      <section className="container mx-auto px-4 pt-10 pb-2 md:py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">{t("featured.title")}</h2>
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
