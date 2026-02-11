import React from "react";
import { Gift, Check, MessageSquareReply } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GiftingOptionsProps {
    isGift: boolean;
    setIsGift: (val: boolean) => void;
    giftMessage: string;
    setGiftMessage: (val: string) => void;
}

export const GiftingOptions: React.FC<GiftingOptionsProps> = ({
    isGift,
    setIsGift,
    giftMessage,
    setGiftMessage,
}) => {
    return (
        <div className="bg-card border border-border rounded-lg p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Gift size={20} />
                    </div>
                    <div>
                        <h3 className="font-display font-semibold">Gifting Options</h3>
                        <p className="text-xs text-muted-foreground">Make your purchase extra special</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => setIsGift(!isGift)}
                    className={cn(
                        "relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        isGift ? "bg-primary" : "bg-muted"
                    )}
                >
                    <div
                        className={cn(
                            "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 flex items-center justify-center shadow-sm",
                            isGift ? "translate-x-6" : "translate-x-0"
                        )}
                    >
                        {isGift && <Check size={10} className="text-primary" />}
                    </div>
                </button>
            </div>

            <AnimatePresence>
                {isGift && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-4"
                    >
                        <div className="pt-4 border-t border-border">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-accent/10 p-1.5 rounded-lg">
                                    <MessageSquareReply size={14} className="text-primary" />
                                </div>
                                <label className="text-sm font-medium">Personalized Gift Message</label>
                            </div>
                            <textarea
                                value={giftMessage}
                                onChange={(e) => setGiftMessage(e.target.value)}
                                placeholder="Write a heartfelt message for your loved one..."
                                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[100px] resize-none"
                                maxLength={250}
                            />
                            <div className="flex justify-between mt-1">
                                <p className="text-[10px] text-muted-foreground italic">
                                    * Gift wrapping includes a premium box and a ribbon.
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                    {giftMessage.length}/250
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 p-3 border border-primary/20 bg-primary/5 rounded-xl flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Gift size={16} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold">Premium Wrap</p>
                                    <p className="text-[10px] text-muted-foreground">Complimentary</p>
                                </div>
                            </div>
                            <div className="flex-1 p-3 border border-border rounded-xl flex items-center gap-3 opacity-60">
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                    <Check size={16} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold">Standard Box</p>
                                    <p className="text-[10px] text-muted-foreground">Included</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
