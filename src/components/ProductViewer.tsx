import { useState, useRef, useEffect } from "react";
import { Move, ZoomIn, ZoomOut, RotateCw, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductViewerProps {
    images: string[];
    name: string;
}

export function ProductViewer({ images, name }: ProductViewerProps) {
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

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isZoomed) return;
        dragRef.current = { isDragging: true, startX: e.pageX };
        setIsRotating(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (dragRef.current.isDragging) {
            const deltaX = e.pageX - dragRef.current.startX;
            if (Math.abs(deltaX) > 10) {
                const step = Math.floor(deltaX / 10);
                setRotationIndex((prev) => {
                    let next = (prev + step) % images.length;
                    if (next < 0) next = images.length - 1;
                    return next;
                });
                dragRef.current.startX = e.pageX;
            }
        }

        if (isZoomed && containerRef.current) {
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = ((e.pageX - left) / width) * 100;
            const y = ((e.pageY - top) / height) * 100;
            setZoomPos({ x, y });
        }
    };

    const handleMouseEnter = () => {
        if (!isRotating) setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);
        dragRef.current.isDragging = false;
    };

    // POV Labels for thumbnails
    const povLabels = ["Front", "Side", "Back", "Top", "Bottom"];

    return (
        <div className="flex gap-4">
            {/* Side Thumbnails */}
            <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar py-1">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onMouseEnter={() => {
                            setSelectedImage(i);
                            setRotationIndex(i);
                            setIsRotating(false);
                        }}
                        className={cn(
                            "group relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-muted",
                            (selectedImage === i && !isRotating) ? "border-primary scale-105" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                    >
                        <img src={img} alt={povLabels[i] || `View ${i + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 text-[7px] text-white py-0.5 text-center translate-y-full group-hover:translate-y-0 transition-transform">
                            {povLabels[i] || `View ${i + 1}`}
                        </div>
                    </button>
                ))}
                <button
                    onMouseEnter={() => {
                        setIsRotating(true);
                        setIsZoomed(false);
                    }}
                    className={cn(
                        "relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-primary/5 flex items-center justify-center",
                        isRotating ? "border-primary bg-primary/10" : "border-transparent text-muted-foreground hover:bg-primary/5"
                    )}
                >
                    <RotateCw size={20} className={cn("text-primary", isRotating && "animate-spin")} style={{ animationDuration: '3s' }} />
                </button>
            </div>

            {/* Main Viewer Container */}
            <div className="flex-1 max-w-[480px]">
                <div
                    ref={containerRef}
                    className={cn(
                        "relative aspect-square rounded-xl overflow-hidden bg-[#FBFBFB] border border-border cursor-crosshair group shadow-sm",
                        isZoomed && "cursor-zoom-in"
                    )}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Main Image */}
                    <img
                        src={images[isRotating ? rotationIndex : selectedImage]}
                        alt={name}
                        className={cn(
                            "w-full h-full object-contain transition-transform duration-300 will-change-transform",
                            isZoomed ? "scale-[2.2]" : "scale-100"
                        )}
                        style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                    />

                    {/* Overlays */}
                    {isRotating && (
                        <div className="absolute top-3 left-3 bg-primary/95 text-white px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                            <RotateCw size={10} className="animate-spin" />
                            360° MODE
                        </div>
                    )}

                    {!isZoomed && !isRotating && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                            <div className="bg-black/10 backdrop-blur-[1px] rounded-full p-3 text-white">
                                <Move size={24} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-4 flex justify-between items-center px-1">
                    <div className="flex flex-col">
                        <p className="text-[10px] text-foreground font-semibold uppercase tracking-wider">
                            {isRotating ? "360° Viewing" : povLabels[selectedImage] || "Product View"}
                        </p>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">
                            Drag to Rotate • Hover to Zoom
                        </p>
                    </div>
                    <div className="flex gap-1.5">
                        {images.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-1 rounded-full transition-all",
                                    (selectedImage === i && !isRotating) || (isRotating && rotationIndex === i) ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/20"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
