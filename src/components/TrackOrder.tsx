import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Package, Truck, CheckCircle2, MapPin, ClipboardCheck, Box } from "lucide-react";
import { Order, OrderStatus } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface TrackOrderProps {
    order: Order;
    children: React.ReactNode;
}

const steps: { status: OrderStatus; icon: any; label: string }[] = [
    { status: "Confirmed", icon: ClipboardCheck, label: "Order Confirmed" },
    { status: "Packed", icon: Box, label: "Packed" },
    { status: "Shipped", icon: Truck, label: "Shipped" },
    { status: "Out for Delivery", icon: MapPin, label: "Out for Delivery" },
    { status: "Delivered", icon: CheckCircle2, label: "Delivered" },
];

export const TrackOrder: React.FC<TrackOrderProps> = ({ order, children }) => {
    const currentStatusIndex = steps.findIndex((s) => s.status === order.status);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rounded-3xl p-8 shadow-2xl border-none">
                <DialogHeader className="mb-8">
                    <DialogTitle className="font-display text-2xl font-bold flex items-center gap-3">
                        <Package className="text-primary" /> Track Order #{order.id}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                </DialogHeader>

                <div className="relative">
                    {/* Vertical line for mobile, horizontal for desktop? 
              Let's do a clean vertical list for mobile/small desktop as it's easier to read. */}
                    <div className="space-y-8 relative">
                        {/* Background Line */}
                        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-muted" />

                        {/* Active Line Overlay */}
                        <div
                            className="absolute left-[19px] top-2 w-0.5 bg-primary transition-all duration-1000"
                            style={{
                                height: `${(currentStatusIndex / (steps.length - 1)) * 100}%`,
                                maxHeight: "calc(100% - 16px)"
                            }}
                        />

                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isCompleted = index <= currentStatusIndex;
                            const isCurrent = index === currentStatusIndex;

                            return (
                                <div key={step.status} className="flex items-center gap-6 relative z-10">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                                        isCompleted ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground",
                                        isCurrent && "ring-4 ring-primary/20"
                                    )}>
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className={cn(
                                            "font-bold text-sm transition-colors",
                                            isCompleted ? "text-foreground" : "text-muted-foreground"
                                        )}>
                                            {step.label}
                                        </h4>
                                        {isCurrent && (
                                            <p className="text-xs text-primary font-medium animate-pulse">In Progress...</p>
                                        )}
                                        {isCompleted && !isCurrent && (
                                            <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Completed</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-10 p-4 bg-secondary/30 rounded-2xl border border-border/50">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Items:</span>
                        <span className="font-bold">{order.items.length} Products</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                        <span className="text-muted-foreground">Order Total:</span>
                        <span className="font-bold text-primary">₹{order.total.toLocaleString()}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
