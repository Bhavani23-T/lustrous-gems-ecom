import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export function LivePriceTicker() {
    const [prices, setPrices] = useState({
        gold: 62450,
        silver: 74200,
        platinum: 98500,
    });

    const [trends, setTrends] = useState({
        gold: 0.45,
        silver: -0.12,
        platinum: 0.28,
    });

    // Simple simulation of price changes every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => ({
                gold: prev.gold + (Math.random() > 0.5 ? 10 : -10),
                silver: prev.silver + (Math.random() > 0.5 ? 5 : -5),
                platinum: prev.platinum + (Math.random() > 0.5 ? 15 : -15),
            }));
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-primary text-primary-foreground py-1 px-4 overflow-hidden select-none">
            <div className="container mx-auto flex items-center justify-center gap-6 text-[10px] md:text-xs font-semibold tracking-wider uppercase">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="opacity-70">Gold 24K:</span>
                    <span>₹{prices.gold.toLocaleString()}</span>
                    <span className={`flex items-center gap-0.5 ${trends.gold > 0 ? "text-green-300" : "text-red-300"}`}>
                        {trends.gold > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {Math.abs(trends.gold)}%
                    </span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 whitespace-nowrap">
                    <span className="opacity-70">Silver:</span>
                    <span>₹{prices.silver.toLocaleString()}</span>
                    <span className={`flex items-center gap-0.5 ${trends.silver > 0 ? "text-green-300" : "text-red-300"}`}>
                        {trends.silver > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {Math.abs(trends.silver)}%
                    </span>
                </div>
                <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap">
                    <span className="opacity-70">Platinum:</span>
                    <span>₹{prices.platinum.toLocaleString()}</span>
                    <span className={`flex items-center gap-0.5 ${trends.platinum > 0 ? "text-green-300" : "text-red-300"}`}>
                        {trends.platinum > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {Math.abs(trends.platinum)}%
                    </span>
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                    <span className="animate-pulse w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="opacity-70 text-[9px]">Live Market Rates</span>
                </div>
            </div>
        </div>
    );
}
