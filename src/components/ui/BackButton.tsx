import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
    className?: string;
    label?: string;
}

export const BackButton = ({ className, label = "Back" }: BackButtonProps) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className={cn(
                "group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2 mb-4",
                className
            )}
        >
            <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 group-active:scale-90 transition-all">
                <ArrowLeft size={18} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">{label}</span>
        </button>
    );
};
