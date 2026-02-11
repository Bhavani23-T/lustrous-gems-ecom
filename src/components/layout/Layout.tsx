import Navbar from "./Navbar";
import Footer from "./Footer";
import { LivePriceTicker } from "./LivePriceTicker";
import { WhatsAppButton } from "../WhatsAppButton";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <LivePriceTicker />
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Layout;
