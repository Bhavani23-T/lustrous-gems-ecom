import catEarrings from "@/assets/cat-earrings.jpg";
import catRings from "@/assets/cat-rings.jpg";
import catNecklaces from "@/assets/cat-necklaces.jpg";
import catBangles from "@/assets/cat-bangles.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import colGold1 from "@/assets/col-gold-1.jpg";
import colGold2 from "@/assets/col-gold-2.jpg";
import colDiamond1 from "@/assets/col-diamond-1.jpg";
import colDiamond2 from "@/assets/col-diamond-2.jpg";
import colSilver1 from "@/assets/col-silver-1.jpg";
import colSilver2 from "@/assets/col-silver-2.jpg";
import colPlatinum1 from "@/assets/col-platinum-1.jpg";
import colOnegram1 from "@/assets/col-onegram-1.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  metal: string;
  purity: string;
  weight: string;
  description: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

export const categories = [
  { name: "Earrings", slug: "earrings", image: catEarrings },
  { name: "Rings", slug: "rings", image: catRings },
  { name: "Necklaces", slug: "necklaces", image: catNecklaces },
  { name: "Bangles", slug: "bangles", image: catBangles },
];

export const metalTypes = ["Gold", "Silver", "Diamond", "Platinum", "One Gram Gold"];
export const purityOptions = ["24K", "22K", "18K", "14K", "Sterling Silver", "950 Platinum"];

// Collection-based subcategories for navbar
export const collectionSubcategories: Record<string, string[]> = {
  Gold: ["Rings", "Chains", "Necksets", "Bangles", "Bracelets", "Earrings"],
  Diamond: ["Rings", "Necklaces", "Earrings", "Bracelets"],
  Silver: ["Rings", "Chains", "Anklets", "Bracelets"],
  Platinum: ["Rings", "Chains", "Bracelets"],
  "One Gram Gold": ["Rings", "Chains", "Bangles", "Necksets"],
};

// Image pools per metal
const goldImages = [colGold1, colGold2, catBangles, catNecklaces];
const diamondImages = [colDiamond1, colDiamond2, product3, product4];
const silverImages = [colSilver1, colSilver2, product1];
const platinumImages = [colPlatinum1, product4];
const onegramImages = [colOnegram1, catNecklaces, catBangles];

const pick = (arr: string[], i: number) => arr[i % arr.length];

export const products: Product[] = [
  // === GOLD (10 products) ===
  { id: "g1", name: "Gold Filigree Wedding Neckset", price: 125999, originalPrice: 139999, image: colGold1, images: [colGold1, colGold2, catNecklaces], category: "necksets", metal: "Gold", purity: "22K", weight: "32g", description: "A magnificent traditional gold neckset perfect for weddings and celebrations. Intricate filigree work.", rating: 4.9, reviewCount: 201, isBestseller: true },
  { id: "g2", name: "Gold Classic Band Ring", price: 18999, image: colGold2, images: [colGold2, colGold1], category: "rings", metal: "Gold", purity: "22K", weight: "4.5g", description: "A timeless gold band ring with ornate scroll patterns. Perfect for everyday elegance.", rating: 4.7, reviewCount: 156 },
  { id: "g3", name: "Gold Rope Chain 20\"", price: 45999, originalPrice: 52999, image: colGold1, images: [colGold1, colGold2], category: "chains", metal: "Gold", purity: "22K", weight: "12g", description: "Classic rope chain in lustrous 22K gold. A wardrobe essential.", rating: 4.8, reviewCount: 89, isNew: true },
  { id: "g4", name: "Gold Temple Bangles Set", price: 89999, image: catBangles, images: [catBangles, colGold1, colGold2], category: "bangles", metal: "Gold", purity: "22K", weight: "28g", description: "Set of 4 traditional temple design bangles in 22K gold.", rating: 4.9, reviewCount: 312, isBestseller: true },
  { id: "g5", name: "Gold Link Bracelet", price: 34999, image: colGold2, images: [colGold2, colGold1], category: "bracelets", metal: "Gold", purity: "18K", weight: "9g", description: "Modern link bracelet in warm rose gold. Sleek and stylish.", rating: 4.6, reviewCount: 67 },
  { id: "g6", name: "Gold Jhumka Earrings", price: 24999, image: catEarrings, images: [catEarrings, colGold1], category: "earrings", metal: "Gold", purity: "22K", weight: "8g", description: "Traditional jhumka earrings with intricate gold work and pearl drops.", rating: 4.8, reviewCount: 178, isBestseller: true },
  { id: "g7", name: "Gold Bridal Neckset Deluxe", price: 199999, originalPrice: 225999, image: colGold1, images: [colGold1, catNecklaces, colGold2], category: "necksets", metal: "Gold", purity: "22K", weight: "48g", description: "Premium bridal neckset with matching earrings. Heirloom quality craftsmanship.", rating: 5.0, reviewCount: 45 },
  { id: "g8", name: "Gold Cocktail Ring", price: 22999, image: colGold2, images: [colGold2, catRings], category: "rings", metal: "Gold", purity: "18K", weight: "5.2g", description: "Statement cocktail ring with floral motifs in polished gold.", rating: 4.5, reviewCount: 92, isNew: true },
  { id: "g9", name: "Gold Wheat Chain 24\"", price: 58999, image: colGold1, images: [colGold1, colGold2], category: "chains", metal: "Gold", purity: "24K", weight: "15g", description: "Premium 24K wheat chain, perfect for pendants or standalone wear.", rating: 4.7, reviewCount: 34 },
  { id: "g10", name: "Gold Kada Bangle", price: 67999, image: catBangles, images: [catBangles, colGold1], category: "bangles", metal: "Gold", purity: "22K", weight: "22g", description: "Solid gold kada with traditional engraving. A classic men's accessory.", rating: 4.8, reviewCount: 123 },

  // === DIAMOND (8 products) ===
  { id: "d1", name: "Diamond Solitaire Pendant", price: 89999, originalPrice: 99999, image: colDiamond1, images: [colDiamond1, colDiamond2, product2], category: "necklaces", metal: "Diamond", purity: "18K", weight: "3.2g", description: "A breathtaking solitaire diamond pendant on a delicate white gold chain.", rating: 4.9, reviewCount: 89, isBestseller: true },
  { id: "d2", name: "Diamond Engagement Ring", price: 145999, image: colDiamond2, images: [colDiamond2, colDiamond1, catRings], category: "rings", metal: "Diamond", purity: "18K", weight: "4.1g", description: "Classic solitaire diamond engagement ring. Brilliant cut, exceptional clarity.", rating: 5.0, reviewCount: 201 },
  { id: "d3", name: "Diamond Stud Earrings", price: 54999, image: product3, images: [product3, colDiamond1, colDiamond2], category: "earrings", metal: "Diamond", purity: "18K", weight: "2.1g", description: "Classic diamond stud earrings in white gold. Timeless sparkle.", rating: 4.7, reviewCount: 256, isBestseller: true },
  { id: "d4", name: "Diamond Tennis Bracelet", price: 189999, originalPrice: 215999, image: colDiamond1, images: [colDiamond1, colDiamond2], category: "bracelets", metal: "Diamond", purity: "18K", weight: "8.5g", description: "Stunning tennis bracelet with 3 carats of brilliant diamonds.", rating: 4.9, reviewCount: 67 },
  { id: "d5", name: "Diamond Cluster Ring", price: 78999, image: colDiamond2, images: [colDiamond2, catRings], category: "rings", metal: "Diamond", purity: "18K", weight: "3.8g", description: "A dazzling cluster of diamonds set in white gold. Show-stopping brilliance.", rating: 4.7, reviewCount: 34, isNew: true },
  { id: "d6", name: "Diamond Drop Earrings", price: 112999, image: product3, images: [product3, colDiamond1], category: "earrings", metal: "Diamond", purity: "18K", weight: "4.2g", description: "Elegant drop earrings with cascading diamonds. Red carpet worthy.", rating: 4.8, reviewCount: 78 },
  { id: "d7", name: "Diamond Rivière Necklace", price: 299999, originalPrice: 349999, image: colDiamond1, images: [colDiamond1, product2], category: "necklaces", metal: "Diamond", purity: "18K", weight: "12g", description: "A luxurious diamond rivière necklace. 5 carats of graduated brilliance.", rating: 5.0, reviewCount: 23 },
  { id: "d8", name: "Diamond Eternity Band", price: 67999, image: colDiamond2, images: [colDiamond2, product4], category: "rings", metal: "Diamond", purity: "18K", weight: "3.5g", description: "Channel-set diamond eternity band. Symbol of everlasting love.", rating: 4.9, reviewCount: 145 },

  // === SILVER (7 products) ===
  { id: "s1", name: "Silver Twist Ring", price: 2999, image: colSilver1, images: [colSilver1, colSilver2], category: "rings", metal: "Silver", purity: "Sterling Silver", weight: "4g", description: "Minimalist twisted silver ring. Perfect for daily wear.", rating: 4.5, reviewCount: 312 },
  { id: "s2", name: "Silver Figaro Chain 18\"", price: 4999, image: colSilver2, images: [colSilver2, colSilver1], category: "chains", metal: "Silver", purity: "Sterling Silver", weight: "8g", description: "Classic figaro chain in sterling silver. Versatile and stylish.", rating: 4.3, reviewCount: 189 },
  { id: "s3", name: "Silver Ghungroo Anklet", price: 1999, image: colSilver1, images: [colSilver1, colSilver2], category: "anklets", metal: "Silver", purity: "Sterling Silver", weight: "10g", description: "Traditional silver anklet with ghungroo bells. Ethnic charm.", rating: 4.6, reviewCount: 234 },
  { id: "s4", name: "Silver Charm Bracelet", price: 3999, image: colSilver2, images: [colSilver2, colSilver1, product1], category: "bracelets", metal: "Silver", purity: "Sterling Silver", weight: "12g", description: "Charming sterling silver bracelet with dangling charms.", rating: 4.4, reviewCount: 167 },
  { id: "s5", name: "Silver Payal Anklet Set", price: 3499, image: colSilver1, images: [colSilver1, colSilver2], category: "anklets", metal: "Silver", purity: "Sterling Silver", weight: "15g", description: "Pair of traditional silver payals with delicate patterns.", rating: 4.7, reviewCount: 289, isBestseller: true },
  { id: "s6", name: "Silver Signet Ring", price: 3999, image: colSilver2, images: [colSilver2, colSilver1], category: "rings", metal: "Silver", purity: "Sterling Silver", weight: "6g", description: "Bold signet ring in polished sterling silver. Unisex design.", rating: 4.5, reviewCount: 98, isNew: true },
  { id: "s7", name: "Silver Box Chain 22\"", price: 5999, image: colSilver2, images: [colSilver2, colSilver1], category: "chains", metal: "Silver", purity: "Sterling Silver", weight: "10g", description: "Sleek box chain in sterling silver. Premium weight and finish.", rating: 4.4, reviewCount: 76 },

  // === PLATINUM (6 products) ===
  { id: "p1", name: "Platinum Solitaire Ring", price: 125999, originalPrice: 139999, image: colPlatinum1, images: [colPlatinum1, product4], category: "rings", metal: "Platinum", purity: "950 Platinum", weight: "5.8g", description: "A luxurious platinum solitaire ring with a brilliant-cut diamond.", rating: 4.9, reviewCount: 67 },
  { id: "p2", name: "Platinum Curb Chain 20\"", price: 89999, image: colPlatinum1, images: [colPlatinum1, product4], category: "chains", metal: "Platinum", purity: "950 Platinum", weight: "18g", description: "Heavy curb chain in 950 platinum. Unmistakable luxury.", rating: 4.8, reviewCount: 45 },
  { id: "p3", name: "Platinum Link Bracelet", price: 78999, image: colPlatinum1, images: [colPlatinum1, product4], category: "bracelets", metal: "Platinum", purity: "950 Platinum", weight: "15g", description: "Sleek link bracelet in platinum. Modern masculine elegance.", rating: 4.7, reviewCount: 34, isNew: true },
  { id: "p4", name: "Platinum Wedding Band", price: 45999, image: product4, images: [product4, colPlatinum1], category: "rings", metal: "Platinum", purity: "950 Platinum", weight: "6g", description: "Classic comfort-fit wedding band in 950 platinum.", rating: 4.9, reviewCount: 189, isBestseller: true },
  { id: "p5", name: "Platinum Diamond Studs", price: 98999, image: product3, images: [product3, colPlatinum1], category: "earrings", metal: "Platinum", purity: "950 Platinum", weight: "2.5g", description: "Premium platinum diamond stud earrings. Unmatched brilliance.", rating: 4.9, reviewCount: 56 },
  { id: "p6", name: "Platinum Rope Chain 18\"", price: 115999, image: colPlatinum1, images: [colPlatinum1, product4], category: "chains", metal: "Platinum", purity: "950 Platinum", weight: "22g", description: "Substantial rope chain in platinum. Statement piece.", rating: 4.8, reviewCount: 28 },

  // === ONE GRAM GOLD (7 products) ===
  { id: "og1", name: "One Gram Gold Temple Neckset", price: 2999, image: colOnegram1, images: [colOnegram1, catNecklaces], category: "necksets", metal: "One Gram Gold", purity: "22K", weight: "15g", description: "Traditional temple design neckset in one gram gold. Affordable luxury.", rating: 4.4, reviewCount: 89 },
  { id: "og2", name: "One Gram Gold Bridal Set", price: 4999, originalPrice: 5999, image: colOnegram1, images: [colOnegram1, catNecklaces, catBangles], category: "necksets", metal: "One Gram Gold", purity: "22K", weight: "25g", description: "Complete bridal set with necklace, earrings and tikka in one gram gold.", rating: 4.6, reviewCount: 345, isBestseller: true },
  { id: "og3", name: "One Gram Gold Bangles Set", price: 1999, image: catBangles, images: [catBangles, colOnegram1], category: "bangles", metal: "One Gram Gold", purity: "22K", weight: "20g", description: "Set of 6 traditional bangles in one gram gold. Festival ready.", rating: 4.3, reviewCount: 456 },
  { id: "og4", name: "One Gram Gold Chain 18\"", price: 1499, image: colOnegram1, images: [colOnegram1, catNecklaces], category: "chains", metal: "One Gram Gold", purity: "22K", weight: "8g", description: "Delicate chain in one gram gold. Looks like real gold.", rating: 4.2, reviewCount: 567 },
  { id: "og5", name: "One Gram Gold Finger Ring", price: 799, image: catRings, images: [catRings, colOnegram1], category: "rings", metal: "One Gram Gold", purity: "22K", weight: "3g", description: "Traditional finger ring in one gram gold with stone setting.", rating: 4.1, reviewCount: 234, isNew: true },
  { id: "og6", name: "One Gram Gold Haram Neckset", price: 5999, image: colOnegram1, images: [colOnegram1, catNecklaces], category: "necksets", metal: "One Gram Gold", purity: "22K", weight: "30g", description: "Long haram neckset in one gram gold. South Indian bridal favourite.", rating: 4.5, reviewCount: 178 },
  { id: "og7", name: "One Gram Gold Kada Bangles", price: 2499, image: catBangles, images: [catBangles, colOnegram1], category: "bangles", metal: "One Gram Gold", purity: "22K", weight: "18g", description: "Pair of broad kada bangles in one gram gold. Festive statement.", rating: 4.4, reviewCount: 123 },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2026-02-05",
    items: [{ ...products[0], quantity: 1 }, { ...products[2], quantity: 1 }],
    total: 171998,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    date: "2026-02-07",
    items: [{ ...products[10], quantity: 1 }],
    total: 89999,
    status: "Shipped",
  },
];

export const mockReviews = [
  { id: "1", user: "Priya S.", rating: 5, comment: "Absolutely stunning! The quality is exceptional.", date: "2026-01-15" },
  { id: "2", user: "Anita M.", rating: 4, comment: "Beautiful piece, packaging was premium too.", date: "2026-01-20" },
  { id: "3", user: "Ritu K.", rating: 5, comment: "Perfect gift for my anniversary. Wife loved it!", date: "2026-02-01" },
];

// Admin mock data
export const adminStats = {
  totalSales: 2456789,
  totalOrders: 342,
  totalUsers: 1256,
  totalProducts: products.length,
};
