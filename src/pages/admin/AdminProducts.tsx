import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { products } from "@/data/mockData";

const AdminProducts = () => {
  const [list] = useState(products);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">Products</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
          <Plus size={16} /> Add Product
        </button>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-3 font-medium">Product</th>
                <th className="text-left p-3 font-medium">Category</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">Metal</th>
                <th className="text-left p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-3 flex items-center gap-3">
                    <img src={p.image} alt="" className="w-10 h-10 rounded object-cover" />
                    <span className="font-medium line-clamp-1">{p.name}</span>
                  </td>
                  <td className="p-3 capitalize">{p.category}</td>
                  <td className="p-3">₹{p.price.toLocaleString()}</td>
                  <td className="p-3">{p.metal}</td>
                  <td className="p-3 flex gap-2">
                    <button className="p-1.5 hover:bg-accent rounded"><Edit size={14} /></button>
                    <button className="p-1.5 hover:bg-destructive/10 text-destructive rounded"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
