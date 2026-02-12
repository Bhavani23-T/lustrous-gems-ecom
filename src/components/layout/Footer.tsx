import { Link } from "react-router-dom";
import { Heart, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "../Logo";

const Footer = () => (
  <footer className="bg-secondary/30 border-t border-border mt-6 md:mt-20 relative overflow-hidden">
    {/* Decorative background element */}
    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="h-6 sm:h-8 mb-6">
            <Logo variant="full" className="h-full shrink-0" />
          </div>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm mb-8 font-medium">
            Designed for elegance, crafted for everyday beauty. Premium jewellery for every occasion that matters.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-black text-lg mb-6 uppercase tracking-widest text-[11px] text-muted-foreground">Shop Collections</h4>
          <div className="flex flex-col gap-3">
            <Link to="/products?metal=gold" className="text-sm font-bold text-foreground hover:text-primary transition-colors">Gold Collection</Link>
            <Link to="/products?metal=silver" className="text-sm font-bold text-foreground hover:text-primary transition-colors">Sterling Silver</Link>
            <Link to="/products?metal=diamond" className="text-sm font-bold text-foreground hover:text-primary transition-colors">Diamond Essentials</Link>
            <Link to="/products?metal=platinum" className="text-sm font-bold text-foreground hover:text-primary transition-colors">Platinum Elite</Link>
            <Link to="/products" className="text-sm font-bold text-foreground hover:text-primary transition-colors">New Arrivals</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-black text-lg mb-6 uppercase tracking-widest text-[11px] text-muted-foreground">Company</h4>
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-sm font-bold text-foreground hover:text-primary transition-colors">About Our Story</Link>
            <Link to="/" className="text-sm font-bold text-foreground hover:text-primary transition-colors">Our Craftmanship</Link>
            <Link to="/" className="text-sm font-bold text-foreground hover:text-primary transition-colors">Store Locator</Link>
            <Link to="/" className="text-sm font-bold text-foreground hover:text-primary transition-colors">Careers</Link>
            <Link to="/" className="text-sm font-bold text-foreground hover:text-primary transition-colors">Investor Relations</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-black text-lg mb-6 uppercase tracking-widest text-[11px] text-muted-foreground">Contact Us</h4>
          <div className="flex flex-col gap-4">
            <a href="tel:+911234567890" className="flex items-center gap-3 text-sm font-bold text-foreground hover:text-primary transition-colors">
              <Phone size={16} className="text-primary" /> +91 1800 123 456
            </a>
            <a href="mailto:contact@lumiere.com" className="flex items-center gap-3 text-sm font-bold text-foreground hover:text-primary transition-colors">
              <Mail size={16} className="text-primary" /> care@lumiere.com
            </a>
            <div className="flex items-start gap-3 text-sm font-bold text-foreground">
              <MapPin size={16} className="text-primary mt-1 shrink-0" />
              <span>123 Luxury Lane, High Street, Mumbai, MH 400001</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground font-medium">© 2026 Lumière Jewellery. All Rights Reserved.</p>
          <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase tracking-widest font-bold">Made with <Heart size={10} className="inline text-primary mx-1" /> — Every Moment Deserves A Little Sparkle.</p>
        </div>

        <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="/" className="hover:text-primary transition-colors">Sitemap</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
