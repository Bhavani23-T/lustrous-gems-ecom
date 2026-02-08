import { mockOrders } from "@/data/mockData";

const statusColors: Record<string, string> = {
  Processing: "bg-accent text-accent-foreground",
  Shipped: "bg-primary/10 text-primary",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-destructive/10 text-destructive",
};

const AdminOrders = () => (
  <div>
    <h1 className="font-display text-2xl font-bold mb-6">Orders</h1>
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-3 font-medium">Order ID</th>
              <th className="text-left p-3 font-medium">Date</th>
              <th className="text-left p-3 font-medium">Items</th>
              <th className="text-left p-3 font-medium">Total</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="p-3 font-medium">{o.id}</td>
                <td className="p-3">{o.date}</td>
                <td className="p-3">{o.items.length}</td>
                <td className="p-3">₹{o.total.toLocaleString()}</td>
                <td className="p-3"><span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[o.status]}`}>{o.status}</span></td>
                <td className="p-3">
                  <select className="text-xs border border-border rounded px-2 py-1 bg-background">
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AdminOrders;
