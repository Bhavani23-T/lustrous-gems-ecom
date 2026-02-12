import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LivePriceTicker } from "./LivePriceTicker";
import { WhatsAppButton } from "../WhatsAppButton";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={cn(
      "min-h-screen flex flex-col pt-[128px] lg:pt-[104px]",
      isHomePage && "pt-[88px] lg:pt-[104px]"
    )}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <LivePriceTicker />
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
