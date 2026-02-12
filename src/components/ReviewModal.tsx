import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Star, Camera, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ReviewModalProps {
    productName: string;
    children: React.ReactNode;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ productName, children }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            toast.success("Review submitted successfully!");

            // Reset form after a delay and close
            setTimeout(() => {
                setOpen(false);
                // Reset state after closing
                setTimeout(() => {
                    setIsSuccess(false);
                    setRating(0);
                    setComment("");
                    setImages([]);
                }, 300);
            }, 2000);
        }, 1500);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // In a real app, you'd upload to a server. 
        // Here we'll simulate by creating a local URL.
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages([...images, reader.result as string]);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background p-6 border-b border-border/50">
                    <DialogHeader>
                        <DialogTitle className="font-display text-2xl font-bold">Write a Review</DialogTitle>
                        <p className="text-sm text-muted-foreground">Sharing your experience with <strong>{productName}</strong></p>
                    </DialogHeader>
                </div>

                <div className="p-6">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                            <p className="text-muted-foreground mb-6">Your review has been submitted and will be visible shortly after moderation.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Star Rating */}
                            <div className="flex flex-col items-center gap-3 py-4 bg-secondary/30 rounded-2xl">
                                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Overall Rating</p>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="transition-transform active:scale-90 hover:scale-110"
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                            onClick={() => setRating(star)}
                                        >
                                            <Star
                                                size={32}
                                                className={cn(
                                                    "transition-colors duration-200",
                                                    (hover || rating) >= star
                                                        ? "fill-primary text-primary"
                                                        : "text-muted stroke-[1.5]"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                                {rating > 0 && (
                                    <p className="text-xs font-bold text-primary animate-in fade-in slide-in-from-top-1">
                                        {rating === 5 ? "Excellent!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                                    </p>
                                )}
                            </div>

                            {/* Review Text */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">Your Review</label>
                                <textarea
                                    className="w-full min-h-[120px] p-4 rounded-2xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm outline-none"
                                    placeholder="Tell us what you loved or how we can improve..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Photo Upload */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-foreground">Add Photos</label>
                                <div className="flex flex-wrap gap-3">
                                    {images.map((img, index) => (
                                        <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden border border-border group">
                                            <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    {images.length < 5 && (
                                        <label className="w-20 h-20 rounded-xl border-2 border-dashed border-muted hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center cursor-pointer text-muted-foreground hover:text-primary">
                                            <Camera size={20} />
                                            <span className="text-[10px] mt-1 font-bold">Add</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                    )}
                                </div>
                                <p className="text-[10px] text-muted-foreground">You can add up to 5 photos of the product.</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2",
                                    isSubmitting && "opacity-70 cursor-not-allowed"
                                )}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Review"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
