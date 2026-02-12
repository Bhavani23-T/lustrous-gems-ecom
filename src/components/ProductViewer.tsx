import { useState, useRef, useEffect } from "react";
import { Move, RotateCw, Hand } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductViewerProps {
    images: string[];
    name: string;
}

export function ProductViewer({ images = [], name }: ProductViewerProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isRotating, setIsRotating] = useState(false);
    const [rotationIndex, setRotationIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef({ isDragging: false, startX: 0 });

    // Handle 360 rotation logic
    useEffect(() => {
        if (!isRotating) return;
        const interval = setInterval(() => {
            setRotationIndex((prev) => (prev + 1) % images.length);
        }, 150);
        return () => clearInterval(interval);
    }, [isRotating, images.length]);

    const handleStart = (clientX: number) => {
        if (isZoomed) return;
        dragRef.current = { isDragging: true, startX: clientX };
        setIsRotating(false);
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (dragRef.current.isDragging) {
            const deltaX = clientX - dragRef.current.startX;
            if (Math.abs(deltaX) > 10) {
                const step = Math.floor(deltaX / 10);
                setRotationIndex((prev) => {
                    let next = (prev - step) % images.length;
                    if (next < 0) next = images.length - 1;
                    return next;
                });
                dragRef.current.startX = clientX;
            }
        }

        if (isZoomed && containerRef.current) {
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = ((clientX - left) / width) * 100;
            const y = ((clientY - top) / height) * 100;
            setZoomPos({ x, y });
        }
    };

    const handleEnd = () => {
        dragRef.current.isDragging = false;
        if (!window.matchMedia("(pointer: coarse)").matches) {
            // Only reset zoom on desktop mouse leave
            // On mobile we'll handle zoom differently if needed, 
            // but for now let's just avoid auto-zoom on touch
        }
    };

    const povLabels = ["Front", "Side", "Back", "Top", "Bottom"];

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Main Viewer Container */}
            <div className="flex-1 order-1 md:order-2">
                <div
                    ref={containerRef}
                    className={cn(
                        "relative aspect-[4/3] sm:aspect-square rounded-[1.5rem] overflow-hidden bg-[#FBFBFB] border border-border/50 shadow-inner group touch-pan-y w-full max-h-[300px] sm:max-h-none",
                        !isRotating && "cursor-zoom-in"
                    )}
                    onMouseDown={(e) => handleStart(e.pageX)}
                    onMouseMove={(e) => handleMove(e.pageX, e.pageY)}
                    onMouseUp={handleEnd}
                    onMouseLeave={() => { handleEnd(); setIsZoomed(false); }}
                    onMouseEnter={() => { if (!isRotating && !window.matchMedia("(pointer: coarse)").matches) setIsZoomed(true); }}

                    onTouchStart={(e) => handleStart(e.touches[0].pageX)}
                    onTouchMove={(e) => handleMove(e.touches[0].pageX, e.touches[0].pageY)}
                    onTouchEnd={handleEnd}
                >
                    {/* Main Image */}
                    <img
                        src={images[isRotating ? rotationIndex : selectedImage]}
                        alt={name}
                        loading="eager"
                        decoding="sync"
                        className={cn(
                            "w-full h-full object-contain transition-transform duration-300 ease-out will-change-transform p-4 md:p-8",
                            isZoomed ? "scale-[2.5]" : "scale-100"
                        )}
                        style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                    />

                    {/* Overlays */}
                    {isRotating && (
                        <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl animate-in fade-in zoom-in duration-300">
                            <RotateCw size={12} className="animate-spin" />
                            360° View
                        </div>
                    )}

                    {!isZoomed && !isRotating && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 md:group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                            <div className="bg-black/10 backdrop-blur-[2px] rounded-full p-6 text-white/80">
                                <Hand size={32} className="animate-bounce" />
                            </div>
                        </div>
                    )}

                    {/* Interaction Hint for mobile */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden">
                        <div className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-black/5 shadow-sm text-[8px] font-bold uppercase tracking-tighter text-muted-foreground flex items-center gap-2">
                            <Move size={10} /> {isRotating ? "Slide to rotate" : "Swipe to see more"}
                        </div>
                    </div>
                </div>

                <div className="flex gap-1.5 h-6 items-center">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-0.5 rounded-full transition-all duration-500",
                                (selectedImage === i && !isRotating) || (isRotating && rotationIndex === i) ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/20"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Thumbnails - Smaller for mobile */}
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar py-1 order-2 md:order-1 px-1 -mx-4 md:mx-0 px-4 md:px-0">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setSelectedImage(i);
                            setRotationIndex(i);
                            setIsRotating(false);
                            setIsZoomed(false);
                        }}
                        className={cn(
                            "group relative w-12 h-12 md:w-24 md:h-24 rounded-xl overflow-hidden border transition-all duration-300 shrink-0 bg-white shadow-sm flex items-center justify-center p-0.5",
                            (selectedImage === i && !isRotating) ? "border-primary ring-2 ring-primary/10 scale-95" : "border-transparent opacity-60 hover:opacity-100 hover:border-border"
                        )}
                    >
                        <img src={img} alt={povLabels[i] || `View ${i + 1}`} className="w-full h-full object-contain" />
                    </button>
                ))}
                <button
                    onClick={() => {
                        setIsRotating(!isRotating);
                        setIsZoomed(false);
                    }}
                    className={cn(
                        "relative w-12 h-12 md:w-24 md:h-24 rounded-xl overflow-hidden border transition-all duration-300 shrink-0 flex items-center justify-center shadow-sm",
                        isRotating ? "border-primary bg-primary/10 text-primary scale-95 ring-2 ring-primary/10" : "border-transparent bg-white text-muted-foreground hover:bg-muted"
                    )}
                >
                    <div className="flex flex-col items-center gap-0.5">
                        <RotateCw size={14} className={cn(isRotating && "animate-spin")} style={{ animationDuration: '3s' }} />
                        <span className="text-[7px] font-black uppercase tracking-tighter">360°</span>
                    </div>
                </button>
            </div>
        </div>

    );
}
