import React from "react";

interface LogoProps {
    className?: string;
    variant?: "full" | "icon" | "wordmark";
    style?: "gemstone" | "monogram" | "starburst";
}

export const Logo: React.FC<LogoProps> = ({
    className = "",
    variant = "full",
}) => {
    const primaryColor = "currentColor";

    const ModernLuxuryLogo = () => (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Sunburst Rays */}
            <g stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
                <line x1="50" y1="30" x2="50" y2="10" />
                <line x1="58" y1="32" x2="68" y2="15" />
                <line x1="65" y1="38" x2="82" y2="25" />
                <line x1="70" y1="46" x2="90" y2="40" />
                <line x1="42" y1="32" x2="32" y2="15" />
                <line x1="35" y1="38" x2="18" y2="25" />
                <line x1="30" y1="46" x2="10" y2="40" />
            </g>
            {/* Main Diamond Prism */}
            <path d="M50 35L80 65L50 95L20 65L50 35Z" stroke={primaryColor} strokeWidth="2.5" strokeLinejoin="round" />
            {/* facet lines */}
            <path d="M20 65H80" stroke={primaryColor} strokeWidth="1.5" strokeOpacity="0.4" />
            <path d="M50 35V95" stroke={primaryColor} strokeWidth="1.5" strokeOpacity="0.4" />
            <path d="M50 35L65 65L50 95M50 35L35 65L50 95" stroke={primaryColor} strokeWidth="1" strokeOpacity="0.3" />
            <path d="M50 35L80 65L50 95L20 65L50 35Z" fill={primaryColor} fillOpacity="0.05" />
            {/* Center sparkle */}
            <circle cx="50" cy="65" r="3" fill={primaryColor} className="animate-pulse" />
        </svg>
    );

    return (
        <div className={`flex items-center gap-2 sm:gap-3 h-full ${className}`}>
            {(variant === "full" || variant === "icon") && (
                <div className="h-full aspect-square text-primary shrink-0 transition-all hover:rotate-12 duration-500">
                    <ModernLuxuryLogo />
                </div>
            )}
            {(variant === "full" || variant === "wordmark") && (
                <div className="flex flex-col leading-none justify-center">
                    <span className="font-display font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-base md:text-xl lg:text-2xl text-foreground">
                        Lumière
                    </span>
                    {variant === "full" && (
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[5px] sm:text-[8px] md:text-[10px] tracking-[0.3em] sm:tracking-[0.6em] uppercase opacity-40 font-black whitespace-nowrap">
                                Fine Jewellery
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
