import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-secondary border-t border-border mt-16">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold text-primary mb-4">LUMIÈRE</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Designed for elegance, crafted for everyday beauty. Premium jewellery for every occasion.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Shop</h4>
          <div className="flex flex-col gap-2">
            <Link to="/products?metal=gold" className="text-sm text-muted-foreground hover:text-primary">Gold</Link>
            <Link to="/products?metal=silver" className="text-sm text-muted-foreground hover:text-primary">Silver</Link>
            <Link to="/products?metal=diamond" className="text-sm text-muted-foreground hover:text-primary">Diamond</Link>
            <Link to="/products?metal=platinum" className="text-sm text-muted-foreground hover:text-primary">Platinum</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Company</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Careers</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Help</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">FAQs</Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Shipping</Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Returns</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
        <p>© 2026 Lumière Jewellery. Made with <Heart size={12} className="inline text-primary" /> All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
