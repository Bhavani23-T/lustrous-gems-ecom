import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Languages } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useLanguage } from "@/context/LanguageContext";
import { collectionSubcategories } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

import { SearchOverlay } from "./SearchOverlay";
import { Logo } from "../Logo";

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
  const [langOpen, setLangOpen] = useState(false);
  const [openCollection, setOpenCollection] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { cartCount } = useStore();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const subcatSlug = (sub: string) => sub.toLowerCase().replace(/ /g, "-");
  const isHomePage = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center select-none h-6 sm:h-8 md:h-10"
          >
            <Logo variant="full" className="h-full shrink-0" />
          </Link>

          {/* Desktop Collections Nav - Hidden on Home Page */}
          <nav className={`hidden lg:flex items-center gap-1 flex-1 ml-10 overflow-visible ${isHomePage ? "invisible pointer-events-none" : ""}`}>
            <Link to="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t("nav.home")}
            </Link>

            {collections.map((col) => (
              <div
                key={col}
                className="relative shrink-0 group"
                onMouseEnter={() => setOpenCollection(col)}
                onMouseLeave={() => setOpenCollection(null)}
              >
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => navigate(`/products?metal=${metalSlugs[col]}`)}
                >
                  {col} <ChevronDown size={14} className={`transition-transform duration-300 ${openCollection === col ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {openCollection === col && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-0 bg-popover border border-border rounded-xl shadow-xl py-3 w-56 z-50"
                    >
                      <Link
                        to={`/products?metal=${metalSlugs[col]}`}
                        className="block px-4 py-2 text-sm font-bold text-primary hover:bg-accent transition-colors"
                        onClick={() => setOpenCollection(null)}
                      >
                        Explore All {col}
                      </Link>
                      <div className="border-t border-border my-2" />
                      <div className="max-h-60 overflow-y-auto px-1">
                        {collectionSubcategories[col].map((sub) => (
                          <Link
                            key={sub}
                            to={`/products?metal=${metalSlugs[col]}&category=${subcatSlug(sub)}`}
                            className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent rounded-md transition-colors"
                            onClick={() => setOpenCollection(null)}
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link to="/products" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t("nav.shop")}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5 md:gap-2 relative z-10">
            <div className={`relative ${isHomePage ? "hidden lg:hidden" : "hidden lg:block"}`}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-1.5 md:p-2 hover:text-primary transition-colors flex items-center gap-1"
                title="Change Language"
              >
                <Languages size={20} className="md:size-[22px]" />
                <span className="text-[10px] font-bold uppercase hidden md:inline">{language}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-full right-0 mt-1 bg-popover border border-border rounded-xl shadow-xl py-2 w-32 z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => { setLanguage("en"); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${language === "en" ? "bg-primary text-primary-foreground font-bold" : "text-popover-foreground hover:bg-accent"}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => { setLanguage("te"); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${language === "te" ? "bg-primary text-primary-foreground font-bold" : "text-popover-foreground hover:bg-accent"}`}
                    >
                      తెలుగు
                    </button>
                    <button
                      onClick={() => { setLanguage("hi"); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${language === "hi" ? "bg-primary text-primary-foreground font-bold" : "text-popover-foreground hover:bg-accent"}`}
                    >
                      हिन्दी
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => setSearchOpen(true)} className="p-1.5 md:p-2 hover:text-primary transition-colors">
              <Search size={20} className="md:size-[22px]" />
            </button>
            <Link to="/wishlist" className="p-1.5 md:p-2 hover:text-primary transition-colors">
              <Heart size={20} className="md:size-[22px]" />
            </Link>
            <Link to="/cart" className="p-1.5 md:p-2 hover:text-primary transition-colors relative">
              <ShoppingBag size={20} className="md:size-[22px]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center border-2 border-background translate-x-1/4 -translate-y-1/4">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="p-1.5 md:p-2 hover:text-primary transition-colors">
                <User size={20} className="md:size-[22px]" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-1 bg-popover border border-border rounded-xl shadow-xl py-2 w-44 z-50 overflow-hidden"
                  >
                    <Link to="/profile" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors" onClick={() => setProfileOpen(false)}>My Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors" onClick={() => setProfileOpen(false)}>My Orders</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Collections Horizontal Scroll - Enhanced for visibility */}
        <div className="lg:hidden relative overflow-hidden border-t border-border/50 bg-background/50 backdrop-blur-sm">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-3 px-4">
            <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors shrink-0">
              {t("nav.home")}
            </Link>
            {collections.map((col) => (
              <Link
                key={col}
                to={`/products?metal=${metalSlugs[col]}`}
                className="text-[10px] font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors shrink-0 whitespace-nowrap"
              >
                {col}
              </Link>
            ))}
            <Link to="/products" className="text-[10px] font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors shrink-0 whitespace-nowrap pr-4">
              {t("nav.shop")}
            </Link>
          </div>
          {/* Subtle gradient to indicate more content */}
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 z-[101] w-[85%] max-w-sm bg-background border-r border-border shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Logo variant="full" className="h-7" />
                <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 overflow-y-auto flex flex-col gap-1">
                <Link
                  to="/"
                  className="text-lg font-display font-bold py-4 border-b border-border/50 flex items-center justify-between"
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                  <ChevronDown size={16} className="-rotate-90 text-muted-foreground" />
                </Link>

                <div className="mt-4 mb-2">
                  <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] px-1 mb-2">Our Collections</p>
                </div>

                {collections.map((col) => (
                  <div key={col} className="border-b border-border/50">
                    <button
                      className="flex items-center justify-between w-full text-lg font-display font-bold py-4 transition-colors"
                      onClick={() => setMobileExpanded(mobileExpanded === col ? null : col)}
                    >
                      <span className={mobileExpanded === col ? "text-primary" : ""}>{col}</span>
                      <ChevronDown size={18} className={`transition-transform duration-300 ${mobileExpanded === col ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileExpanded === col && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-secondary/30 rounded-xl mb-3"
                        >
                          <div className="py-2 flex flex-col">
                            <Link
                              to={`/products?metal=${metalSlugs[col]}`}
                              className="px-4 py-3 text-sm text-primary font-black hover:bg-secondary/50 transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              Explore All {col}
                            </Link>
                            <div className="h-px bg-border/40 mx-4 my-1" />
                            {collectionSubcategories[col].map((sub) => (
                              <Link
                                key={sub}
                                to={`/products?metal=${metalSlugs[col]}&category=${subcatSlug(sub)}`}
                                className="px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary/50 transition-colors flex items-center gap-2"
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <Link
                  to="/products"
                  className="text-lg font-display font-bold py-4 border-b border-border/50"
                  onClick={() => setMobileOpen(false)}
                >
                  Shop All Collection
                </Link>

                <div className="mt-8 flex flex-col gap-3 pb-8">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold px-1">My Account</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/profile" className="flex items-center gap-2 text-sm font-bold p-4 bg-secondary/50 rounded-2xl hover:bg-secondary transition-colors" onClick={() => setMobileOpen(false)}>
                      <User size={18} className="text-primary" /> Profile
                    </Link>
                    <Link to="/orders" className="flex items-center gap-2 text-sm font-bold p-4 bg-secondary/50 rounded-2xl hover:bg-secondary transition-colors" onClick={() => setMobileOpen(false)}>
                      <ShoppingBag size={18} className="text-primary" /> Orders
                    </Link>
                  </div>
                  <Link to="/wishlist" className="flex items-center gap-3 text-sm font-bold p-4 bg-secondary/50 rounded-2xl hover:bg-secondary transition-colors" onClick={() => setMobileOpen(false)}>
                    <Heart size={18} className="text-primary" /> Wishlist
                  </Link>
                </div>
              </nav>

              <div className="p-6 border-t border-border bg-muted/30">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-4">Select Language</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setLanguage("en"); }}
                    className={`flex-1 py-3 rounded-xl text-xs font-black transition-all border-2 ${language === "en" ? "bg-primary border-primary text-primary-foreground shadow-lg scale-[1.02]" : "bg-background border-transparent text-muted-foreground hover:border-border"}`}
                  >
                    ENGLISH
                  </button>
                  <button
                    onClick={() => { setLanguage("te"); setMobileOpen(false); }}
                    className={`flex-1 py-3 rounded-xl text-xs font-black transition-all border-2 ${language === "te" ? "bg-primary border-primary text-primary-foreground shadow-lg scale-[1.02]" : "bg-background border-transparent text-muted-foreground hover:border-border"}`}
                  >
                    తెలుగు
                  </button>
                  <button
                    onClick={() => { setLanguage("hi"); setMobileOpen(false); }}
                    className={`flex-1 py-3 rounded-xl text-xs font-black transition-all border-2 ${language === "hi" ? "bg-primary border-primary text-primary-foreground shadow-lg scale-[1.02]" : "bg-background border-transparent text-muted-foreground hover:border-border"}`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header >
  );
};

export default Navbar;
