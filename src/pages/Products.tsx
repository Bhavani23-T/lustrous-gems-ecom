import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { products, metalTypes, purityOptions, categories, collectionSubcategories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";

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
  const searchQuery = params.get("search") || "";

  // Re-sync from URL params on navigation
  useMemo(() => {
    const m = params.get("metal") || "";
    const c = params.get("category") || "";
    if (m !== selectedMetal) setSelectedMetal(m);
    if (c !== selectedCategory) setSelectedCategory(c);
  }, [params.get("metal"), params.get("category")]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchQuery) result = result.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedMetal) result = result.filter((p) => p.metal.toLowerCase().replace(/ /g, "-") === selectedMetal);
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
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

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-sm mb-3">Sub-Category</h4>
        <div className="space-y-2">
          {allSubcategories.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="category" checked={selectedCategory === c.toLowerCase().replace(/ /g, "-")} onChange={() => setSelectedCategory(c.toLowerCase().replace(/ /g, "-"))} className="accent-primary" />
              {c}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Metal</h4>
        <div className="space-y-2">
          {metalTypes.map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="metal" checked={selectedMetal === m.toLowerCase().replace(/ /g, "-")} onChange={() => setSelectedMetal(m.toLowerCase().replace(/ /g, "-"))} className="accent-primary" />
              {m}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Purity</h4>
        <div className="space-y-2">
          {purityOptions.map((p) => (
            <label key={p} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="purity" checked={selectedPurity === p} onChange={() => setSelectedPurity(p)} className="accent-primary" />
              {p}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Price Range</h4>
        <input type="range" min={0} max={400000} step={5000} value={priceRange[1]} onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-full accent-primary" />
        <p className="text-xs text-muted-foreground mt-1">Up to ₹{priceRange[1].toLocaleString()}</p>
      </div>
      <button onClick={clearFilters} className="text-sm text-primary hover:underline">Clear all filters</button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold">{getTitle()}</h1>
        <p className="text-muted-foreground text-sm mt-1">{filtered.length} products</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop filters */}
        <aside className="hidden lg:block w-60 shrink-0">
          <FilterPanel />
        </aside>

        {/* Mobile filter button */}
        <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
          <button onClick={() => setFiltersOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full shadow-lg text-sm font-medium">
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {/* Mobile filter drawer */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-foreground/40" onClick={() => setFiltersOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-background p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-semibold">Filters</h3>
                <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
              </div>
              <FilterPanel />
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1">
          <div className="flex justify-end mb-4">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border border-border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-ring focus:outline-none">
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
