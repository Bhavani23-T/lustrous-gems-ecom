import React, { useState, useEffect } from "react";
import { Info, HelpCircle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface EMICalculatorProps {
    price: number;
}

export const EMICalculator: React.FC<EMICalculatorProps> = ({ price }) => {
    const [tenure, setTenure] = useState(6); // Default 6 months
    const [emi, setEmi] = useState(0);
    const interestRate = 14; // 14% Annual Interest Rate

    const calculateEMI = (p: number, n: number, r: number) => {
        // r is annual rate, convert to monthly
        const monthlyRate = r / 12 / 100;
        const emiAmount = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
        return Math.round(emiAmount);
    };

    useEffect(() => {
        setEmi(calculateEMI(price, tenure, interestRate));
    }, [price, tenure]);

    const tenures = [3, 6, 9, 12, 18, 24];

    return (
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 my-6">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-display font-bold text-sm flex items-center gap-2">
                    EMI Plans Available
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <HelpCircle size={14} className="text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">Based on 14% annual interest rate</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </h4>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    Starting from ₹{calculateEMI(price, 24, interestRate).toLocaleString()}/mo
                </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {tenures.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTenure(t)}
                        className={`flex-1 min-w-[60px] py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${tenure === t
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background border-border hover:border-primary/50 text-muted-foreground"
                            }`}
                    >
                        {t} Months
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/50">
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Monthly EMI</p>
                    <p className="text-lg font-bold text-foreground">₹{emi.toLocaleString()}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Total Interest</p>
                    <p className="text-sm font-semibold text-primary">₹{(emi * tenure - price).toLocaleString()}</p>
                </div>
            </div>

            <p className="text-[10px] text-muted-foreground mt-3 flex items-start gap-1">
                <Info size={10} className="shrink-0 mt-0.5" />
                EMI amount is indicative and may vary based on bank schemes and credit card offers.
            </p>
        </div>
    );
};
