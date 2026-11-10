"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav & General
    "nav.demos": "Demos Showcase",
    "nav.customer": "Customer Portal",
    "nav.admin": "Admin Console",
    "nav.getQuote": "Get Quotation",
    "brand.tagline": "Technology That Powers Your Business",
    
    // Showcase & Filters
    "showcase.title": "160 Enterprise Demo Models",
    "showcase.subtitle": "Explore our interactive software catalog across 12 high-impact industry sectors. Test live environments, evaluate role-based permissions, and request custom architecture.",
    "showcase.searchPlaceholder": "Search 160 demos by name, industry, or feature...",
    "showcase.allCategories": "All Categories",
    "showcase.allDemos": "All 160 Models",
    "showcase.featured": "Featured Demos",
    "showcase.popular": "Popular & Trending",
    "showcase.recentlyAdded": "Recent Systems",
    "showcase.filterBy": "Filter Catalogue",
    "showcase.clearFilters": "Reset Filters",
    "showcase.resultsCount": "Showing {count} enterprise demos",
    
    // Filter tags
    "filter.industry": "Industry Category",
    "filter.softwareType": "Software Type",
    "filter.platform": "Platform",
    "filter.ai": "AI Enabled",
    "filter.ecommerce": "E-Commerce Ready",
    "filter.erpCrm": "ERP / CRM System",
    "filter.freeDemo": "Free Demo Available",
    "filter.all": "All",
    "filter.yes": "Yes Only",

    // Card buttons
    "btn.viewLiveDemo": "View Live Demo",
    "btn.watchVideo": "Watch Demo Video",
    "btn.viewFeatures": "View Features",
    "btn.requestCustomization": "Request Customization",
    "btn.getQuotation": "Get Quotation",
    "btn.backToCatalogue": "Back to Catalogue",
    "btn.resetDemoData": "Reset Demo Data",
    "btn.exploreCategory": "Explore Category",
    
    // Demo Metadata
    "meta.techStack": "Technology Stack",
    "meta.devType": "Development Type",
    "meta.estTime": "Est. Delivery",
    "meta.startingPrice": "Starting From",
    "meta.suitableFor": "Ideal For",
    "meta.status": "Availability",
    
    // Demo Simulator
    "sim.demoEnv": "DEMO ENVIRONMENT",
    "sim.demoNotice": "You are interacting with an isolated preview environment populated with fictional data. No real systems or credentials are affected.",
    "sim.switchRole": "Switch Demo Persona",
    "sim.currentRole": "Active Role",
    "sim.admin": "Administrator",
    "sim.customer": "Customer",
    "sim.staff": "Staff / Vendor",
    "sim.onlineReady": "Online Cloud Hosted",
    "sim.offlineReady": "Offline Ready Package",
    
    // Lead Form
    "form.enquiryTitle": "Request Architecture & Quotation",
    "form.fullName": "Full Name",
    "form.businessName": "Company / Business Name",
    "form.email": "Work Email Address",
    "form.phone": "Phone Number",
    "form.industry": "Business Industry",
    "form.budget": "Estimated Budget",
    "form.timeline": "Target Launch Date",
    "form.contactMethod": "Preferred Contact Method",
    "form.submit": "Submit Demo Enquiry",
    "form.success": "Enquiry Received! Our solutions engineering team will connect with your proposal.",
  },
  hi: {
    // Nav & General
    "nav.demos": "डेमो शोकेस",
    "nav.customer": "ग्राहक पोर्टल",
    "nav.admin": "एडमिन कंसोल",
    "nav.getQuote": "कोटेशन प्राप्त करें",
    "brand.tagline": "तकनीक जो आपके व्यवसाय को सशक्त बनाती है",
    
    // Showcase & Filters
    "showcase.title": "160 एंटरप्राइज डेमो मॉडल्स",
    "showcase.subtitle": "12 प्रमुख उद्योग श्रेणियों में हमारे इंटरैक्टिव सॉफ्टवेयर कैटलॉग का अन्वेषण करें। लाइव वातावरण का परीक्षण करें, भूमिका-आधारित अनुमतियों का मूल्यांकन करें और कस्टम आर्किटेक्चर का अनुरोध करें।",
    "showcase.searchPlaceholder": "नाम, उद्योग या फीचर द्वारा 160 डेमो खोजें...",
    "showcase.allCategories": "सभी श्रेणियां",
    "showcase.allDemos": "सभी 160 मॉडल",
    "showcase.featured": "विशेष डेमो",
    "showcase.popular": "लोकप्रिय और ट्रेंडिंग",
    "showcase.recentlyAdded": "हाल ही में जोड़े गए",
    "showcase.filterBy": "फ़िल्टर करें",
    "showcase.clearFilters": "फ़िल्टर रीसेट करें",
    "showcase.resultsCount": "{count} एंटरप्राइज डेमो प्रदर्शित हो रहे हैं",
    
    // Filter tags
    "filter.industry": "उद्योग श्रेणी",
    "filter.softwareType": "सॉफ्टवेयर प्रकार",
    "filter.platform": "प्लेटफॉर्म",
    "filter.ai": "एआई सक्षम",
    "filter.ecommerce": "ई-कॉमर्स रेडी",
    "filter.erpCrm": "ईआरपी / सीआरएम सिस्टम",
    "filter.freeDemo": "मुफ्त डेमो उपलब्ध",
    "filter.all": "सभी",
    "filter.yes": "केवल हाँ",

    // Card buttons
    "btn.viewLiveDemo": "लाइव डेमो देखें",
    "btn.watchVideo": "डेमो वीडियो देखें",
    "btn.viewFeatures": "सुविधाएँ देखें",
    "btn.requestCustomization": "कस्टमाइज़ेशन अनुरोध",
    "btn.getQuotation": "कोटेशन प्राप्त करें",
    "btn.backToCatalogue": "कैटलॉग पर वापस जाएँ",
    "btn.resetDemoData": "डेमो डेटा रीसेट करें",
    "btn.exploreCategory": "श्रेणी का अन्वेषण करें",
    
    // Demo Metadata
    "meta.techStack": "टेक्नोलॉजी स्टैक",
    "meta.devType": "विकास प्रकार",
    "meta.estTime": "अनुमानित समय",
    "meta.startingPrice": "शुरुआती मूल्य",
    "meta.suitableFor": "किसके लिए उपयुक्त",
    "meta.status": "उपलब्धता",
    
    // Demo Simulator
    "sim.demoEnv": "डेमो वातावरण",
    "sim.demoNotice": "आप काल्पनिक डेटा से भरे एक अलग पूर्वावलोकन वातावरण के साथ बातचीत कर रहे हैं। कोई वास्तविक सिस्टम या क्रेडेंशियल्स प्रभावित नहीं होते हैं।",
    "sim.switchRole": "डेमो भूमिका बदलें",
    "sim.currentRole": "सक्रिय भूमिका",
    "sim.admin": "व्यवस्थापक (Admin)",
    "sim.customer": "ग्राहक (Customer)",
    "sim.staff": "स्टाफ / विक्रेता (Staff)",
    "sim.onlineReady": "ऑनलाइन क्लाउड होस्टेड",
    "sim.offlineReady": "ऑफलाइन रेडी पैकेज",
    
    // Lead Form
    "form.enquiryTitle": "कस्टम आर्किटेक्चर एवं कोटेशन अनुरोध",
    "form.fullName": "पूरा नाम",
    "form.businessName": "कंपनी या व्यवसाय का नाम",
    "form.email": "कार्य ईमेल",
    "form.phone": "फ़ोन नंबर",
    "form.industry": "व्यवसाय का उद्योग",
    "form.budget": "अनुमानित बजट",
    "form.timeline": "लक्षित डिलीवरी तिथि",
    "form.contactMethod": "पसंदीदा संपर्क माध्यम",
    "form.submit": "डेमो पूछताछ सबमिट करें",
    "form.success": "पूछताछ प्राप्त हुई! हमारी सॉल्यूशंस इंजीनियरिंग टीम आपसे शीघ्र संपर्क करेगी।",
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

let memoryLang: Language = "en";
const listeners = new Set<() => void>();

function getClientSnapshot(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem("starx_lang");
    if (saved === "hi" || saved === "en") return saved;
  } catch {
    // Ignore storage errors
  }
  return memoryLang;
}

function getServerSnapshot(): Language {
  return "en";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", callback);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", callback);
    }
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = React.useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const setLanguage = (lang: Language) => {
    memoryLang = lang;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("starx_lang", lang);
      } catch {
        // Ignore storage errors
      }
    }
    listeners.forEach((listener) => listener());
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
