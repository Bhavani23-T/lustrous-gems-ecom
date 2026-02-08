import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { adminStats } from "@/data/mockData";

const cards = [
  { label: "Total Sales", value: `₹${(adminStats.totalSales / 100000).toFixed(1)}L`, icon: DollarSign, color: "bg-primary/10 text-primary" },
  { label: "Orders", value: adminStats.totalOrders, icon: ShoppingCart, color: "bg-accent text-accent-foreground" },
  { label: "Users", value: adminStats.totalUsers, icon: Users, color: "bg-secondary text-secondary-foreground" },
  { label: "Products", value: adminStats.totalProducts, icon: Package, color: "bg-rose-gold-light text-rose-gold-dark" },
];

const Dashboard = () => (
  <div>
    <h1 className="font-display text-2xl font-bold mb-6">Dashboard</h1>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((c) => (
        <div key={c.label} className="bg-card border border-border rounded-lg p-5">
          <div className={`w-10 h-10 rounded-lg ${c.color} flex items-center justify-center mb-3`}>
            <c.icon size={20} />
          </div>
          <p className="text-2xl font-bold">{c.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
        </div>
      ))}
    </div>
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-display font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>• New order #ORD-003 placed — ₹45,999</p>
        <p>• User Anita M. registered</p>
        <p>• Product "Rose Gold Bracelet" updated</p>
        <p>• Order #ORD-001 delivered</p>
        <p>• Review approved for "Diamond Stud Earrings"</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
