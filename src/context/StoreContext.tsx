import React, { createContext, useContext, useState, useCallback } from "react";
import { Product, CartItem, Order, OrderStatus, mockOrders } from "@/data/mockData";
import { toast } from "sonner";

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  isAdmin: boolean;
  loginAsAdmin: () => void;
  logout: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
  placeOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cartCount: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | null>(null);

export { StoreContext };

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isAdmin, setIsAdmin] = useState(false);

  const loginAsAdmin = useCallback(() => setIsAdmin(true), []);
  const logout = useCallback(() => setIsAdmin(false), []);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i));
      return [...prev, { ...product, quantity }];
    });
    toast.success(`${product.name} added to cart!`, {
      description: `${quantity} item(s) have been added to your shopping bag.`,
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    toast.info("Item removed from cart");
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const isExist = prev.find((i) => i.id === product.id);
      if (isExist) {
        toast.info(`Removed from wishlist`);
        return prev.filter((i) => i.id !== product.id);
      } else {
        toast.success(`Added to wishlist!`);
        return [...prev, product];
      }
    });
  }, []);

  const isInWishlist = useCallback((id: string) => wishlist.some((i) => i.id === id), [wishlist]);

  const placeOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
    toast.success("Order placed successfully!");
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    toast.info(`Order #${orderId} status updated to ${status}`);
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        isAdmin,
        loginAsAdmin,
        logout,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        updateOrderStatus,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
