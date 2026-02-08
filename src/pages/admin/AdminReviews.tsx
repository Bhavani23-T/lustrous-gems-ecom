import { Star, Check, X } from "lucide-react";
import { mockReviews } from "@/data/mockData";

const AdminReviews = () => (
  <div>
    <h1 className="font-display text-2xl font-bold mb-6">Reviews</h1>
    <div className="space-y-4">
      {mockReviews.map((r) => (
        <div key={r.id} className="bg-card border border-border rounded-lg p-4 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">{r.user}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className={i < r.rating ? "fill-primary text-primary" : "text-muted"} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{r.date}</span>
            </div>
            <p className="text-sm text-muted-foreground">{r.comment}</p>
          </div>
          <div className="flex gap-1">
            <button className="p-1.5 hover:bg-accent rounded text-primary"><Check size={14} /></button>
            <button className="p-1.5 hover:bg-destructive/10 rounded text-destructive"><X size={14} /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AdminReviews;
