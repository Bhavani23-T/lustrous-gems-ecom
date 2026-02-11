import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, ShoppingBag, Heart, Star, X } from "lucide-react";
import { Product } from "@/data/mockData";
import { useStore } from "@/context/StoreContext";
import { cn } from "@/lib/utils";

interface QuickViewProps {
    product: Product;
    children: React.ReactNode;
}

export const QuickView: React.FC<QuickViewProps> = ({ product, children }) => {
    const { addToCart, toggleWishlist, isInWishlist } = useStore();
    const wishlisted = isInWishlist(product.id);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-background rounded-3xl">
                <div className="grid md:grid-cols-2">
                    {/* Image side */}
                    <div className="aspect-square bg-muted relative group">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {product.isNew && <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">New</span>}
                            {product.isBestseller && <span className="bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Bestseller</span>}
                        </div>
                    </div>

                    {/* Details side */}
                    <div className="p-8 flex flex-col justify-center">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-2">
                            {product.metal} · {product.purity}
                        </p>
                        <h2 className="font-display text-2xl font-bold mb-4">{product.name}</h2>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1">
                                <Star size={16} className="fill-primary text-primary" />
                                <span className="text-sm font-bold">{product.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{product.reviewCount} Reviews</span>
                        </div>

                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                            )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-8 line-clamp-3">
                            {product.description}
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-primary text-primary-foreground h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <ShoppingBag size={18} />
                                Add to Cart
                            </button>
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={cn(
                                    "w-12 h-12 rounded-xl border flex items-center justify-center transition-all",
                                    wishlisted ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                                )}
                            >
                                <Heart size={20} className={wishlisted ? "fill-primary" : ""} />
                            </button>
                        </div>

                        <button className="text-sm text-primary font-semibold mt-6 hover:underline inline-flex items-center gap-1" onClick={() => window.location.href = `/product/${product.id}`}>
                            View Full Details
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
