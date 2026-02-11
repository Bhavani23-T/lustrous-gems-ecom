import React, { createContext, useContext, useState } from "react";

type Language = "en" | "te" | "hi";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        "nav.home": "Home",
        "nav.shop": "Shop All",
        "nav.wishlist": "Wishlist",
        "nav.cart": "Cart",
        "hero.title": "LUMIÈRE",
        "hero.subtitle": "Exquisite jewellery that captivates and shines",
        "hero.button": "Shop Now",
        "category.title": "Shop by Category",
        "arrivals.title": "New Arrivals",
        "featured.title": "Featured Collection",
        "wishlist.empty": "Your wishlist is empty",
        "wishlist.save": "Save your favourite pieces here",
        "wishlist.browse": "Browse Jewellery",
        "wishlist.title": "My Wishlist"
    },
    te: {
        "nav.home": "హోమ్",
        "nav.shop": "షాప్",
        "nav.wishlist": "విష్‌లిస్ట్",
        "nav.cart": "కార్ట్",
        "hero.title": "లూమియర్",
        "hero.subtitle": "మిమ్మల్ని ఆకట్టుకునే విశిష్టమైన ఆభరణాలు",
        "hero.button": "ఇప్పుడే కొనండి",
        "category.title": "విభాగాల వారీగా షాపింగ్",
        "arrivals.title": "కొత్త ఆభరణాలు",
        "featured.title": "ప్రత్యేక సేకరణ",
        "wishlist.empty": "మీ విష్‌లిస్ట్ ఖాళీగా ఉంది",
        "wishlist.save": "మీకు నచ్చిన వాటిని ఇక్కడ సేవ్ చేయండి",
        "wishlist.browse": "ఆభరణాలను చూడండి",
        "wishlist.title": "నా విష్‌లిస్ట్"
    },
    hi: {
        "nav.home": "होम",
        "nav.shop": "शॉप",
        "nav.wishlist": "विशलिस्ट",
        "nav.cart": "कार्ट",
        "hero.title": "लूमिएर",
        "hero.subtitle": "उत्कृष्ट आभूषण जो मंत्रमुग्ध और चमकते हैं",
        "hero.button": "अभी खरीदें",
        "category.title": "श्रेणी के अनुसार खरीदारी करें",
        "arrivals.title": "नए आगमन",
        "featured.title": "विशेष संग्रह",
        "wishlist.empty": "आपकी विशलिस्ट खाली है",
        "wishlist.save": "अपने पसंदीदा पीस यहाँ सहेजें",
        "wishlist.browse": "आभूषण ब्राउज़ करें",
        "wishlist.title": "मेरी विशलिस्ट"
    }
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
    return ctx;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>("en");

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations["en"]] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
