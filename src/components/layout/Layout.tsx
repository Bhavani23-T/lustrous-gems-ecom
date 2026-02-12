import Navbar from "./Navbar";
import Footer from "./Footer";
import { LivePriceTicker } from "./LivePriceTicker";
import { WhatsAppButton } from "../WhatsAppButton";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col pt-[132px] lg:pt-[108px]">
    <div className="fixed top-0 left-0 right-0 z-50">
      <LivePriceTicker />
      <Navbar />
    </div>
    <main className="flex-1">{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Layout;
