import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { festivalCollections } from "@/data/mockData";

export const FestivalShowcase = () => {
    return (
        <section className="container mx-auto px-4 py-10 md:py-24">
            <div className="flex flex-col md:flex-row gap-10">
                {festivalCollections.map((col, i) => (
                    <motion.div
                        key={col.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="flex-1 relative h-[500px] md:h-[600px] rounded-[40px] overflow-hidden group shadow-2xl shadow-primary/10"
                    >
                        <img
                            src={col.image}
                            alt={col.name}
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-primary-foreground/90 text-[10px] md:text-xs uppercase tracking-[0.5em] font-black mb-4 block">
                                    Seasonal Collection
                                </span>
                                <h3 className="font-display text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                    {col.name}
                                </h3>
                                <p className="text-white/80 mb-10 max-w-sm text-sm md:text-base leading-relaxed font-medium">
                                    {col.description}
                                </p>
                                <Link
                                    to={`/products?metal=${col.slug === 'wedding' ? 'gold' : ''}`}
                                    className="group/btn inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl shadow-black/20"
                                >
                                    Explore Edit
                                    <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-2" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
