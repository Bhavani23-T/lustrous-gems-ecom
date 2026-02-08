import catEarrings from "@/assets/cat-earrings.jpg";
import catRings from "@/assets/cat-rings.jpg";
import catNecklaces from "@/assets/cat-necklaces.jpg";
import catBangles from "@/assets/cat-bangles.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

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

const allImages = [product1, product2, product3, product4, catEarrings, catRings, catNecklaces, catBangles];

export const products: Product[] = [
  {
    id: "1", name: "Rose Gold Diamond Bracelet", price: 45999, originalPrice: 52999,
    image: product1, images: [product1, product2, product3],
    category: "bangles", metal: "Gold", purity: "18K", weight: "8.5g",
    description: "An exquisite rose gold bracelet featuring brilliant-cut diamonds set in a delicate chain design. Perfect for everyday elegance.",
    rating: 4.8, reviewCount: 124, isNew: true,
  },
  {
    id: "2", name: "Solitaire Diamond Pendant", price: 32999, originalPrice: 38999,
    image: product2, images: [product2, product1, product4],
    category: "necklaces", metal: "Gold", purity: "18K", weight: "3.2g",
    description: "A stunning solitaire diamond pendant on a delicate rose gold chain. The perfect statement piece.",
    rating: 4.9, reviewCount: 89, isBestseller: true,
  },
  {
    id: "3", name: "Diamond Stud Earrings", price: 18999,
    image: product3, images: [product3, catEarrings, product2],
    category: "earrings", metal: "Gold", purity: "18K", weight: "2.1g",
    description: "Classic diamond stud earrings set in warm yellow gold. Timeless elegance for every occasion.",
    rating: 4.7, reviewCount: 256, isBestseller: true,
  },
  {
    id: "4", name: "Platinum Eternity Band", price: 67999, originalPrice: 75999,
    image: product4, images: [product4, catRings, product1],
    category: "rings", metal: "Platinum", purity: "950 Platinum", weight: "5.8g",
    description: "A luxurious platinum eternity band with channel-set diamonds. Symbol of everlasting love.",
    rating: 4.9, reviewCount: 67,
  },
  {
    id: "5", name: "Gold Filigree Drop Earrings", price: 24999,
    image: catEarrings, images: [catEarrings, product3, product2],
    category: "earrings", metal: "Gold", purity: "22K", weight: "6.3g",
    description: "Intricately crafted filigree drop earrings in warm gold with diamond accents.",
    rating: 4.6, reviewCount: 43, isNew: true,
  },
  {
    id: "6", name: "Classic Solitaire Ring", price: 89999, originalPrice: 99999,
    image: catRings, images: [catRings, product4, product1],
    category: "rings", metal: "Gold", purity: "18K", weight: "4.1g",
    description: "A breathtaking solitaire diamond ring in rose gold. The ultimate engagement ring.",
    rating: 5.0, reviewCount: 201,
  },
  {
    id: "7", name: "Gold Teardrop Necklace", price: 15999,
    image: catNecklaces, images: [catNecklaces, product2, catEarrings],
    category: "necklaces", metal: "Gold", purity: "22K", weight: "4.5g",
    description: "A beautiful teardrop pendant necklace in lustrous gold. Minimalist and modern.",
    rating: 4.5, reviewCount: 78,
  },
  {
    id: "8", name: "Diamond Gold Bangles Set", price: 125999, originalPrice: 139999,
    image: catBangles, images: [catBangles, product1, product4],
    category: "bangles", metal: "Gold", purity: "22K", weight: "32g",
    description: "A magnificent set of three gold bangles with diamond accents. Perfect for celebrations.",
    rating: 4.8, reviewCount: 156, isBestseller: true,
  },
  {
    id: "9", name: "Silver Charm Bracelet", price: 4999,
    image: product1, images: [product1, product3],
    category: "bangles", metal: "Silver", purity: "Sterling Silver", weight: "12g",
    description: "A charming sterling silver bracelet perfect for everyday wear.",
    rating: 4.3, reviewCount: 312,
  },
  {
    id: "10", name: "One Gram Gold Temple Necklace", price: 2999,
    image: catNecklaces, images: [catNecklaces, product2],
    category: "necklaces", metal: "One Gram Gold", purity: "22K", weight: "15g",
    description: "Traditional temple design necklace in one gram gold. Affordable luxury.",
    rating: 4.4, reviewCount: 89,
  },
  {
    id: "11", name: "Diamond Cluster Ring", price: 55999,
    image: catRings, images: [catRings, product4],
    category: "rings", metal: "Diamond", purity: "18K", weight: "3.8g",
    description: "A stunning cluster of diamonds set in white gold. Show-stopping brilliance.",
    rating: 4.7, reviewCount: 34, isNew: true,
  },
  {
    id: "12", name: "Platinum Diamond Studs", price: 78999,
    image: product3, images: [product3, product4],
    category: "earrings", metal: "Platinum", purity: "950 Platinum", weight: "2.5g",
    description: "Premium platinum diamond stud earrings. Unmatched clarity and brilliance.",
    rating: 4.9, reviewCount: 56,
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2026-02-05",
    items: [{ ...products[0], quantity: 1 }, { ...products[2], quantity: 1 }],
    total: 64998,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    date: "2026-02-07",
    items: [{ ...products[1], quantity: 1 }],
    total: 32999,
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
