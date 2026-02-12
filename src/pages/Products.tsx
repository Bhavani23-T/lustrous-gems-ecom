import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { products, metalTypes, purityOptions, categories, collectionSubcategories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];

// Gather all unique subcategories
const allSubcategories = [...new Set(Object.values(collectionSubcategories).flat())].sort();

const Products = () => {
  const [params] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState(params.get("metal") || "");
  const [selectedCategory, setSelectedCategory] = useState(params.get("category") || "");
  const [selectedPurity, setSelectedPurity] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [isLoading, setIsLoading] = useState(true);
  const searchQuery = params.get("search") || "";

  // Artificial loading effect on filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [selectedMetal, selectedCategory, selectedPurity, priceRange, sortBy, searchQuery]);

  const metalParam = params.get("metal");
  const categoryParam = params.get("category");

  // Re-sync from URL params on navigation
  useEffect(() => {
    const m = metalParam || "";
    const c = categoryParam || "";
    if (m !== selectedMetal) setSelectedMetal(m);
    if (c !== selectedCategory) setSelectedCategory(c);
  }, [metalParam, categoryParam, selectedMetal, selectedCategory]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchQuery) result = result.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedMetal) result = result.filter((p) => p.metal.toLowerCase().replace(/ /g, "-") === selectedMetal);
    if (selectedCategory) {
      result = result.filter((p) => {
        const pCat = p.category.toLowerCase();
        const sCat = selectedCategory.toLowerCase();
        // Allow "necksets" and "necklaces" to be interchangeable for broader discovery
        if ((sCat === "necksets" || sCat === "necklaces") && (pCat === "necksets" || pCat === "necklaces")) return true;
        return pCat === sCat;
      });
    }
    if (selectedPurity) result = result.filter((p) => p.purity === selectedPurity);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => (a.isNew ? -1 : 1)); break;
    }
    return result;
  }, [selectedMetal, selectedCategory, selectedPurity, priceRange, sortBy, searchQuery]);

  const clearFilters = () => { setSelectedMetal(""); setSelectedCategory(""); setSelectedPurity(""); setPriceRange([0, 400000]); };

  // Build a friendly title
  const getTitle = () => {
    if (searchQuery) return `Results for "${searchQuery}"`;
    const metalName = metalTypes.find(m => m.toLowerCase().replace(/ /g, "-") === selectedMetal);
    const catName = selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : "";
    if (metalName && catName) return `${metalName} ${catName}`;
    if (metalName) return `${metalName} Jewellery`;
    if (catName) return catName;
    return "All Jewellery";
  };

  const CategoryMarquee = () => {
    // Get display name of metal to match mockData keys
    const rawMetalName = metalTypes.find(m => m.toLowerCase().replace(/ /g, "-") === selectedMetal);

    // If not metal selected, show all unique sub-categories
    const subCats = rawMetalName
      ? (collectionSubcategories[rawMetalName] || [])
      : [...new Set(Object.values(collectionSubcategories).flat())].sort();

    if (subCats.length === 0) return null;

    // Triple the items for seamless scrolling
    const items = [...subCats, ...subCats, ...subCats];

    return (
      <div className="mb-6 md:mb-10 py-4 md:py-6 bg-primary/5 rounded-2xl border border-primary/10 overflow-hidden relative group">
        <div className="absolute inset-y-0 left-0 w-16 md:w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex overflow-hidden marquee-container">
          <div className="flex animate-marquee whitespace-nowrap marquee-track py-2">
            {items.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat.toLowerCase())}
                className={`mx-2 md:mx-4 px-4 md:px-6 py-2 rounded-full border text-xs md:text-sm font-bold transition-all shadow-sm active:scale-95
                  ${selectedCategory === cat.toLowerCase()
                    ? "bg-primary text-primary-foreground border-primary shadow-primary/20"
                    : "bg-background border-border hover:border-primary/50 text-muted-foreground hover:text-primary"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <p className="text-center text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-primary/60 mt-3 md:mt-4 font-black">
          Top {rawMetalName || "Featured"} Trends
        </p>
      </div>
    );
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-sm">Category</h4>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory("")}
              className="text-[10px] uppercase font-bold text-primary hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {allSubcategories.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === c.toLowerCase().replace(/ /g, "-") || (selectedCategory === "necksets" && c.toLowerCase() === "necklaces") || (selectedCategory === "necklaces" && c.toLowerCase() === "necksets")}
                onChange={() => setSelectedCategory(c.toLowerCase().replace(/ /g, "-"))}
                className="accent-primary w-4 h-4"
              />
              <span className={selectedCategory === c.toLowerCase().replace(/ /g, "-") ? "font-bold text-primary" : ""}>
                {c}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-border/50" />

      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-sm">Metal</h4>
          {selectedMetal && (
            <button
              onClick={() => setSelectedMetal("")}
              className="text-[10px] uppercase font-bold text-primary hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2">
          {metalTypes.map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
              <input
                type="radio"
                name="metal"
                checked={selectedMetal === m.toLowerCase().replace(/ /g, "-")}
                onChange={() => setSelectedMetal(m.toLowerCase().replace(/ /g, "-"))}
                className="accent-primary w-4 h-4"
              />
              <span className={selectedMetal === m.toLowerCase().replace(/ /g, "-") ? "font-bold text-primary" : ""}>
                {m}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-border/50" />

      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-sm">Purity</h4>
          {selectedPurity && (
            <button
              onClick={() => setSelectedPurity("")}
              className="text-[10px] uppercase font-bold text-primary hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2">
          {purityOptions.map((p) => (
            <label key={p} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
              <input
                type="radio"
                name="purity"
                checked={selectedPurity === p}
                onChange={() => setSelectedPurity(p)}
                className="accent-primary w-4 h-4"
              />
              <span className={selectedPurity === p ? "font-bold text-primary" : ""}>
                {p}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-border/50" />

      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-sm">Price Range</h4>
          {priceRange[1] < 400000 && (
            <button
              onClick={() => setPriceRange([0, 400000])}
              className="text-[10px] uppercase font-bold text-primary hover:underline"
            >
              Reset
            </button>
          )}
        </div>
        <input
          type="range"
          min={0}
          max={400000}
          step={5000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-primary cursor-pointer h-2 bg-secondary rounded-lg appearance-none"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
          <span>₹0</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full py-3 text-xs font-black uppercase tracking-widest text-primary border border-primary/20 hover:bg-primary/5 rounded-xl transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <BackButton />
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-5xl font-black text-foreground">{getTitle()}</h1>
          <p className="text-muted-foreground text-sm mt-2 font-medium">{filtered.length} exquisite pieces found</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pt-1 hidden sm:block">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 sm:flex-none text-sm font-bold border-2 border-border rounded-xl px-4 py-3 bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer min-w-[160px]"
          >
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <CategoryMarquee />

      <div className="flex gap-8">
        {/* Desktop filters */}
        <aside className="hidden lg:block w-64 shrink-0 bg-secondary/20 p-6 rounded-3xl h-fit sticky top-24 border border-border/50">
          <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
            <SlidersHorizontal size={18} /> Filters
          </h3>
          <FilterPanel />
        </aside>

        {/* Mobile filter button */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full px-4 max-w-xs">
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center justify-center gap-3 bg-primary text-primary-foreground w-full py-4 rounded-2xl shadow-2xl shadow-primary/40 text-sm font-black uppercase tracking-widest active:scale-95 transition-transform"
          >
            <SlidersHorizontal size={18} /> Refine Search
          </button>
        </div>

        {/* Mobile filter drawer */}
        <AnimatePresence>
          {filtersOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={() => setFiltersOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background p-6 shadow-2xl flex flex-col"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-display text-xl font-black">Refine Results</h3>
                  <button onClick={() => setFiltersOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 pb-24">
                  <FilterPanel />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20"
                  >
                    View {filtered.length} Items
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Products grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
              {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32 bg-secondary/20 rounded-3xl border-2 border-dashed border-border">
              <p className="text-muted-foreground font-medium">No masterpieces found matching your criteria.</p>
              <button onClick={clearFilters} className="text-primary font-black mt-4 underline decoration-2 underline-offset-4">Reset all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 pb-20 md:pb-0">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
