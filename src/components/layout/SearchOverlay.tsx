import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { products } from "@/data/mockData";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

interface SearchOverlayProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    // Keyboard shortcut to open search
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(true);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [onOpenChange]);

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.metal.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput
                placeholder="Search for jewellery, collections..."
                value={query}
                onValueChange={setQuery}
            />
            <CommandList className="max-h-[70vh]">
                <CommandEmpty>No results found for "{query}".</CommandEmpty>

                {filteredProducts.length > 0 && (
                    <CommandGroup heading="Products">
                        {filteredProducts.map((product) => (
                            <CommandItem
                                key={product.id}
                                onSelect={() => {
                                    navigate(`/product/${product.id}`);
                                    onOpenChange(false);
                                    setQuery("");
                                }}
                                className="flex items-center gap-4 p-3 cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <span className="font-semibold text-sm line-clamp-1">{product.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">{product.metal}</span>
                                        <span className="text-xs text-primary font-bold">₹{product.price.toLocaleString("en-IN")}</span>
                                    </div>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                <CommandSeparator />

                <CommandGroup heading="Collections & Categories">
                    <CommandItem onSelect={() => { navigate("/products?metal=gold"); onOpenChange(false); }}>
                        Gold Collection
                    </CommandItem>
                    <CommandItem onSelect={() => { navigate("/products?metal=diamond"); onOpenChange(false); }}>
                        Diamond Collection
                    </CommandItem>
                    <CommandItem onSelect={() => { navigate("/products?category=rings"); onOpenChange(false); }}>
                        Rings
                    </CommandItem>
                    <CommandItem onSelect={() => { navigate("/products?category=necklaces"); onOpenChange(false); }}>
                        Necklaces
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Quick Links">
                    <CommandItem onSelect={() => { navigate("/products"); onOpenChange(false); }}>
                        Shop All Products
                    </CommandItem>
                    <CommandItem onSelect={() => { navigate("/orders"); onOpenChange(false); }}>
                        My Orders
                    </CommandItem>
                </CommandGroup>
            </CommandList>
            <div className="p-3 border-t bg-muted/50 flex justify-between items-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                    Lumière Fine Jewellery
                </p>
                <div className="flex gap-2">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 italic">
                        ESC to close
                    </kbd>
                </div>
            </div>
        </CommandDialog>
    );
}
