import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Ruler } from "lucide-react";

export function SizeGuide() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-xs font-medium text-primary hover:underline flex items-center gap-1.5 mt-2">
                    <Ruler size={13} /> Size Guide
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-display">Jewellery Size Guide</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <section>
                        <h3 className="text-sm font-semibold mb-2">How to measure your ring size?</h3>
                        <p className="text-xs text-muted-foreground mb-3">
                            1. Wrap a piece of string around the base of your finger.<br />
                            2. Mark the point where the ends meet.<br />
                            3. Measure the string in millimeters to find the circumference.
                        </p>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full text-[11px]">
                                <thead className="bg-secondary">
                                    <tr>
                                        <th className="px-3 py-2 text-left">Internal Dia (mm)</th>
                                        <th className="px-3 py-2 text-left">Indian Size</th>
                                        <th className="px-3 py-2 text-left">US Size</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {[
                                        { dia: "15.3", in: "8", us: "4.5" },
                                        { dia: "16.1", in: "10", us: "5.5" },
                                        { dia: "16.9", in: "12", us: "6.5" },
                                        { dia: "17.7", in: "14", us: "7.5" },
                                        { dia: "18.5", in: "16", us: "8.5" },
                                    ].map((row) => (
                                        <tr key={row.in}>
                                            <td className="px-3 py-2">{row.dia}</td>
                                            <td className="px-3 py-2">{row.in}</td>
                                            <td className="px-3 py-2">{row.us}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-semibold mb-2">Bangle Size Chart</h3>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full text-[11px]">
                                <thead className="bg-secondary">
                                    <tr>
                                        <th className="px-3 py-2 text-left">Bangle Size</th>
                                        <th className="px-3 py-2 text-left">Inside Dia (Inches)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {[
                                        { size: "2-2", dia: "2.125" },
                                        { size: "2-4", dia: "2.25" },
                                        { size: "2-6", dia: "2.375" },
                                        { size: "2-8", dia: "2.5" },
                                    ].map((row) => (
                                        <tr key={row.size}>
                                            <td className="px-3 py-2">{row.size}</td>
                                            <td className="px-3 py-2">{row.dia}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <p className="text-[10px] text-muted-foreground italic">
                        * Sizes may vary slightly based on the design and craftsmanship.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
