import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, Star, BarChart3, ChevronLeft } from "lucide-react";

const links = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/reviews", icon: Star, label: "Reviews" },
  { to: "/admin/reports", icon: BarChart3, label: "Reports" },
];

const AdminLayout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="w-full md:w-56 bg-card border-b md:border-b-0 md:border-r border-border shrink-0">
        <div className="p-4">
          <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
            <ChevronLeft size={14} /> Back to store
          </Link>
          <h2 className="font-display text-lg font-bold text-primary mb-4">Admin Panel</h2>
          <nav className="flex md:flex-col gap-1 overflow-x-auto">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  location.pathname === l.to ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
                }`}
              >
                <l.icon size={16} /> {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
