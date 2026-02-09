import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { collectionSubcategories } from "@/data/mockData";

const metalSlugs: Record<string, string> = {
  Gold: "gold",
  Diamond: "diamond",
  Silver: "silver",
  Platinum: "platinum",
  "One Gram Gold": "one-gram-gold",
};

const collections = Object.keys(collectionSubcategories);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [openCollection, setOpenCollection] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const subcatSlug = (sub: string) => sub.toLowerCase().replace(/ /g, "-");

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu */}
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="font-display text-xl md:text-2xl font-bold text-primary tracking-wide">
            LUMIÈRE
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">Home</Link>

            {collections.map((col) => (
              <div
                key={col}
                className="relative"
                onMouseEnter={() => setOpenCollection(col)}
                onMouseLeave={() => setOpenCollection(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  {col} <ChevronDown size={14} className={`transition-transform ${openCollection === col ? "rotate-180" : ""}`} />
                </button>
                {openCollection === col && (
                  <div className="absolute top-full left-0 mt-0 bg-popover border border-border rounded-lg shadow-lg py-2 w-48 z-50">
                    <Link
                      to={`/products?metal=${metalSlugs[col]}`}
                      className="block px-4 py-2 text-sm font-medium text-popover-foreground hover:bg-accent transition-colors"
                      onClick={() => setOpenCollection(null)}
                    >
                      All {col}
                    </Link>
                    <div className="border-t border-border my-1" />
                    {collectionSubcategories[col].map((sub) => (
                      <Link
                        key={sub}
                        to={`/products?metal=${metalSlugs[col]}&category=${subcatSlug(sub)}`}
                        className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
                        onClick={() => setOpenCollection(null)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link to="/products" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">Shop All</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="p-2 hover:text-primary transition-colors">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="p-2 hover:text-primary transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="p-2 hover:text-primary transition-colors">
                <User size={20} />
              </button>
              {profileOpen && (
                <div className="absolute top-full right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg py-2 w-40 z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent" onClick={() => setProfileOpen(false)}>My Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent" onClick={() => setProfileOpen(false)}>My Orders</Link>
                  <Link to="/admin" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent" onClick={() => setProfileOpen(false)}>Admin Panel</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for jewellery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Search size={16} />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border max-h-[70vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <Link to="/" className="text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Home</Link>

            {collections.map((col) => (
              <div key={col}>
                <button
                  className="flex items-center justify-between w-full text-sm font-medium py-2"
                  onClick={() => setMobileExpanded(mobileExpanded === col ? null : col)}
                >
                  {col}
                  <ChevronDown size={14} className={`transition-transform ${mobileExpanded === col ? "rotate-180" : ""}`} />
                </button>
                {mobileExpanded === col && (
                  <div className="pl-4 flex flex-col gap-1 pb-2">
                    <Link
                      to={`/products?metal=${metalSlugs[col]}`}
                      className="text-sm py-1.5 text-primary font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      All {col}
                    </Link>
                    {collectionSubcategories[col].map((sub) => (
                      <Link
                        key={sub}
                        to={`/products?metal=${metalSlugs[col]}&category=${subcatSlug(sub)}`}
                        className="text-sm py-1.5 text-muted-foreground"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link to="/products" className="text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Shop All</Link>
            <div className="border-t border-border my-2" />
            <Link to="/profile" className="text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Profile</Link>
            <Link to="/orders" className="text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>My Orders</Link>
            <Link to="/admin" className="text-sm font-medium py-2 text-primary" onClick={() => setMobileOpen(false)}>Admin Panel</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
