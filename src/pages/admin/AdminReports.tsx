import { adminStats } from "@/data/mockData";

const AdminReports = () => (
  <div>
    <h1 className="font-display text-2xl font-bold mb-6">Reports & Analytics</h1>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-display font-semibold mb-4">Sales Summary</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Total Revenue</span><span className="font-semibold">₹{adminStats.totalSales.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Avg Order Value</span><span className="font-semibold">₹{Math.round(adminStats.totalSales / adminStats.totalOrders).toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Total Orders</span><span className="font-semibold">{adminStats.totalOrders}</span></div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-display font-semibold mb-4">Top Categories</h3>
        <div className="space-y-3">
          {[
            { name: "Earrings", pct: 35 },
            { name: "Rings", pct: 28 },
            { name: "Necklaces", pct: 22 },
            { name: "Bangles", pct: 15 },
          ].map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{c.name}</span><span className="text-muted-foreground">{c.pct}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-6 md:col-span-2">
        <h3 className="font-display font-semibold mb-4">Monthly Trend</h3>
        <div className="flex items-end gap-2 h-40">
          {[65, 45, 78, 90, 55, 85, 70, 95, 80, 60, 88, 92].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-primary/20 rounded-t" style={{ height: `${v}%` }}>
                <div className="w-full bg-primary rounded-t h-full opacity-70" />
              </div>
              <span className="text-[10px] text-muted-foreground">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminReports;
