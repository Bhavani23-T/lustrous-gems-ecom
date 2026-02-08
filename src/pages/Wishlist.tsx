import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

const Wishlist = () => {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-6">Save your favourite pieces here</p>
        <Link to="/products" className="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm">Browse Jewellery</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">My Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default Wishlist;
