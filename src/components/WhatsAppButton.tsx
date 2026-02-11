import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
    const phoneNumber = "919000000000"; // Replace with actual number
    const message = "Hi Lumière, I'm interested in your jewellery collection.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={24} className="fill-current" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-background border border-border text-foreground px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none">
                Chat with a Diamond Expert
            </span>
        </a>
    );
}
