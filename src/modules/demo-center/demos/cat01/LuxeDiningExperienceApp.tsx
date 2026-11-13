"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { DemoProductDefinition } from "../../types";
import { useDemoState } from "../../state/useDemoState";
import {
  Sparkles,
  Wine,
  UtensilsCrossed,
  Calendar,
  Clock,
  Users,
  Compass,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  Star,
  MapPin,
  ArrowRight,
  Info,
  Sliders,
  Send,
  Eye,
  Settings,
  X,
  PhoneCall,
  Mail,
  Award,
  Layers,
  Check,
} from "lucide-react";

// =============================================================================
// DOMAIN MODELS & TYPES
// =============================================================================

export interface TastingCourse {
  number: number;
  roman: string;
  title: string;
  subTitle: string;
  category: "Amuse-Bouche" | "Premier Entrée" | "Deuxième Entrée" | "Mer" | "Terre" | "Fromage" | "Dessert" | "Mignardises";
  description: string;
  technique: string;
  temperature: string;
  terroir: string;
  region: string;
  dietaryTags: string[];
  image: string;
  winePairing: {
    wine: string;
    vintage: string;
    producer: string;
    region: string;
    notes: string;
    glassPrice: number;
  };
}

export interface CellarBottle {
  id: string;
  name: string;
  vintage: string;
  producer: string;
  appellation: string;
  category: "Champagne" | "Burgundy" | "Bordeaux" | "Rhone & Piedmont" | "Rare Sake";
  rating: string;
  tastingNotes: string;
  bottlesRemaining: number;
  bottlePrice: number;
  glassPrice?: number;
  image: string;
}

export interface PrivateSalon {
  id: string;
  name: string;
  capacity: string;
  maxGuests: number;
  minSpend: number;
  description: string;
  features: string[];
  image: string;
}

export interface ReservationInquiry {
  id: string;
  createdAt: string;
  salonId: string;
  salonName: string;
  guestName: string;
  guestTitle: string;
  guestEmail: string;
  guestPhone: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  experienceTier: "The 10-Course Equinox" | "The Grand Imperial Reserve";
  wineTier: "Prestige Cru" | "Rare Cellar Allocation" | "Botanical Non-Alcoholic";
  dietaryNotes: string[];
  specialCelebration?: string;
  status: "Pending Sommelier Review" | "Confirmed VIP" | "Allocated";
}

interface LuxeDiningState {
  inquiries: ReservationInquiry[];
  selectedSalonId: string;
  selectedCourseIndex: number;
  selectedCellarCategory: string;
  activeView: "brand-experience" | "concierge-operations";
  isAudioMuted: boolean;
  bookmarkedCourses: number[];
}

// =============================================================================
// RICH SEED DATA
// =============================================================================

const TASTING_COURSES: TastingCourse[] = [
  {
    number: 1,
    roman: "I",
    title: "L'Éveil de l'Huître",
    subTitle: "Gillardeau No. 2, Hokkaido Dashi Gelée, Finger Lime Caviar",
    category: "Amuse-Bouche",
    description:
      "Plump Gillardeau oyster poached gently for 12 seconds in sea water broth, enveloped in an umami-dense smoked kombu gelée and finished with natural Australian finger lime vesicles.",
    technique: "Flash infusion & cryogenic citrus extraction",
    temperature: "8°C (Cellar Chilled)",
    terroir: "Marennes-Oléron, France & Rebun Island, Japan",
    region: "Atlantic Coastline",
    dietaryTags: ["Gluten-Free", "Pescatarian", "Dairy-Free"],
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    winePairing: {
      wine: "La Grande Année Brut",
      vintage: "2014",
      producer: "Champagne Bollinger",
      region: "Aÿ, Champagne",
      notes: "Crisp salinity, toasted brioche, and hazelnut that elevate the oyster's mineral brine.",
      glassPrice: 65,
    },
  },
  {
    number: 2,
    roman: "II",
    title: "Le Jardin Suspendu",
    subTitle: "Ember-Charred White Asparagus, Fermented Morel Velouté",
    category: "Premier Entrée",
    description:
      "First-harvest Pertuis white asparagus roasted over binchotan embers, dressed in cold-pressed hazelnut oil and a 48-hour slow-reduced reduction of wild spring morels.",
    technique: "Binchotan charcoal sear & 48-hour reduction",
    temperature: "42°C (Warm Ambient)",
    terroir: "Vaucluse, Provence, France",
    region: "Southern French Terroir",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
    winePairing: {
      wine: "Clos Sainte Hune Riesling",
      vintage: "2017",
      producer: "Maison Trimbach",
      region: "Alsace Grand Cru",
      notes: "Steely minerality and dry petrol notes that cut through the rich earthiness of morels.",
      glassPrice: 75,
    },
  },
  {
    number: 3,
    roman: "III",
    title: "La Nacre et l'Or Noir",
    subTitle: "Brittany Diver Scallop, Imperial Oscietra Caviar, Cauliflower Silk",
    category: "Deuxième Entrée",
    description:
      "Hand-harvested Saint-Brieuc scallop carpaccio pressed with salted nori sheets, crowned with 15 grams of mature Imperial Oscietra and warm clarified Normandy butter drizzle.",
    technique: "Carpaccio press & brown-butter emulsion",
    temperature: "14°C (Slightly Tempered)",
    terroir: "Bay of Saint-Brieuc, Brittany",
    region: "English Channel Marine Shelf",
    dietaryTags: ["Gluten-Free", "Pescatarian"],
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=85",
    winePairing: {
      wine: "Batard-Montrachet Grand Cru",
      vintage: "2018",
      producer: "Domaine Leflaive",
      region: "Côte de Beaune, Burgundy",
      notes: "Silky stone fruit, wet flint, and vanilla oak complementing the sweet iodine scallop.",
      glassPrice: 110,
    },
  },
  {
    number: 4,
    roman: "IV",
    title: "Le Homard Bleu de Roscoff",
    subTitle: "Blue Lobster Tail, Saffron Coral Bisque, Sea Fennel",
    category: "Mer",
    description:
      "Wild blue lobster tail gently poached in salted butter broth at 56°C, resting in an aromatic roasted shell bisque perfumed with Iranian saffron pistils and crisp coastal sea fennel.",
    technique: "Sous-vide thermal precision & coral reduction",
    temperature: "56°C (Gentle Warmth)",
    terroir: "Finistère Rocks, Roscoff, Brittany",
    region: "Deep Ocean Celtic Current",
    dietaryTags: ["Gluten-Free", "Pescatarian"],
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=85",
    winePairing: {
      wine: "Chevalier-Montrachet Grand Cru",
      vintage: "2016",
      producer: "Domaine Bouchard Père & Fils",
      region: "Burgundy, France",
      notes: "Explosive tension, crushed limestone, and Meyer lemon rind that mirror the saffron bisque.",
      glassPrice: 145,
    },
  },
  {
    number: 5,
    roman: "V",
    title: "L'Ombre du Sous-Bois",
    subTitle: "Winter Alba White Truffle, Acquerello Risotto 7-Years Aged",
    category: "Deuxième Entrée",
    description:
      "Carnaroli rice aged seven winters, simmered with 36-month Parmigiano-Reggiano whey, hand-churned mountain butter, and generously shaved Alba tuber magnatum pico at tableside.",
    technique: "Tableside hand-shaving & whey mantecatura",
    temperature: "65°C (Steaming)",
    terroir: "Piedmont Hills, Alba, Italy",
    region: "Langhe Valley Monferrato",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    image:
      "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=85",
    winePairing: {
      wine: "Barolo Monfortino Riserva",
      vintage: "2013",
      producer: "Giacomo Conterno",
      region: "Serralunga d'Alba, Piedmont",
      notes: "Truffle undertones, dried rose petal, and balsamic tar harmonizing with aged risotto.",
      glassPrice: 190,
    },
  },
  {
    number: 6,
    roman: "VI",
    title: "Le Canard de Challans",
    subTitle: "Blood Duck Breast, Fermented Black Cherries, Kampot Peppercorn",
    category: "Terre",
    description:
      "Heritage Challans duck dry-aged on Himalayan salt blocks for 21 days, skin lacquered with heather honey and crushed red Kampot peppercorns, carved over tart cherry jus.",
    technique: "21-Day Salt-Ageing & Honey Lacquering",
    temperature: "58°C (Rosé Tender)",
    terroir: "Vendée Marshes, Western France",
    region: "Atlantic Pays de la Loire",
    dietaryTags: ["Dairy-Free"],
    image:
      "https://images.unsplash.com/photo-1514944298352-f673895e3474?auto=format&fit=crop&w=1200&q=85",
    winePairing: {
      wine: "Hermitage 'La Chapelle'",
      vintage: "2010",
      producer: "Paul Jaboulet Aîné",
      region: "Northern Rhône",
      notes: "Smoked game, black currant, and cracked pepper framing the spiced duck skin.",
      glassPrice: 130,
    },
  },
  {
    number: 7,
    roman: "VII",
    title: "Le Miyazaki A5 Wagyu",
    subTitle: "Striploin BMS 12, Smoked Bone Marrow Glaze, Wasabi Leaf",
    category: "Terre",
    description:
      "Pure Kuroge Washu beef grilled over white oak charcoal, finished with natural black garlic molasses, smoked marrow glaze, and fresh micro-grated Shizuoka mountain wasabi.",
    technique: "Tanto charcoal sear & marrow deglaze",
    temperature: "54°C (Medium Rare)",
    terroir: "Miyazaki Prefecture, Kyushu, Japan",
    region: "Pacific Kuroshio Plains",
    dietaryTags: ["Dairy-Free"],
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    winePairing: {
      wine: "Château Margaux 1er Grand Cru Classé",
      vintage: "2005",
      producer: "Château Margaux",
      region: "Margaux, Bordeaux",
      notes: "Velvety cedar, dark violets, and graphite tannins standing up to the intense beef marbling.",
      glassPrice: 240,
    },
  },
  {
    number: 8,
    roman: "VIII",
    title: "Le Comté d'Exception",
    subTitle: "Affineur Marcel Petite 40-Month, Vin Jaune Gelee, Walnut Bread",
    category: "Fromage",
    description:
      "Raw summer milk Comté selected from the Fort Saint-Antoine underground stone arches, paired with crystallized honey comb, toasted walnut brioche, and golden Jura wine drops.",
    technique: "Underground stone cave maturation",
    temperature: "16°C (Cellar Ambient)",
    terroir: "Fort Saint-Antoine, Jura Mountains",
    region: "Franche-Comté High Plateaus",
    dietaryTags: ["Vegetarian"],
    image:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1200&q=85",
    winePairing: {
      wine: "Vin Jaune d'Arbois",
      vintage: "2012",
      producer: "Domaine Jacques Puffeney",
      region: "Jura, France",
      notes: "Nutty oxidised walnut, fenugreek, and curry spice that unite with amino acid crystals.",
      glassPrice: 85,
    },
  },
  {
    number: 9,
    roman: "IX",
    title: "La Poire & le Shiso Givré",
    subTitle: "Comice Pear Granita, Green Shiso Emulsion, Candied Yuzu",
    category: "Dessert",
    description:
      "A palate cleansing reverie of ice-carved Comice pear spheres, emerald green shiso leaf sorbet, and candied Japanese yuzu peel with effervescent sake foam.",
    technique: "Liquid nitrogen crystallization",
    temperature: "-4°C (Sub-Zero Crystal)",
    terroir: "Loire Valley Orchards & Kochi Prefecture",
    region: "River Valley Sunlit Terraces",
    dietaryTags: ["Vegetarian", "Gluten-Free", "Dairy-Free"],
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85",
    winePairing: {
      wine: "Juyondai Ryugetsu Junmai Daiginjo",
      vintage: "2022",
      producer: "Takagi Shuzo",
      region: "Yamagata, Japan",
      notes: "Ethereal melon blossom, soft mountain spring water, and honeydew purity.",
      glassPrice: 120,
    },
  },
  {
    number: 10,
    roman: "X",
    title: "L'Or & le Cacao Criollo",
    subTitle: "75% Chuao Venezuelan Cocoa, Smoked Madagascar Vanilla, 24k Gold",
    category: "Dessert",
    description:
      "Single-estate Venezuelan Criollo chocolate dome resting on cocoa nib praline, infused with lightly smoked bourbon vanilla crème, and cloaked in edible 24-karat gold leaf.",
    technique: "Artisanal tempering & tableside hot infusion",
    temperature: "35°C (Warm Ganache Core)",
    terroir: "Chuao Plantation, Aragua, Venezuela",
    region: "Coastal Caribbean Rainforest",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85",
    winePairing: {
      wine: "Château d'Yquem 1er Cru Supérieur",
      vintage: "2009",
      producer: "Château d'Yquem",
      region: "Sauternes, Bordeaux",
      notes: "Candied apricot, saffron honey, and marmalade providing unforgettable dessert opulence.",
      glassPrice: 210,
    },
  },
];

const CELLAR_BOTTLES: CellarBottle[] = [
  {
    id: "CELLAR-01",
    name: "Dom Pérignon P2 Plénitude Brut",
    vintage: "2004",
    producer: "Moët & Chandon",
    appellation: "Champagne, France",
    category: "Champagne",
    rating: "98 pts Robert Parker",
    tastingNotes: "Brioche, smoky hazelnut, Meyer lemon curd, and endless crystalline minerality.",
    bottlesRemaining: 7,
    bottlePrice: 950,
    glassPrice: 130,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "CELLAR-02",
    name: "Krug Clos d'Ambonnay Blanc de Noirs",
    vintage: "2002",
    producer: "Maison Krug",
    appellation: "Montagne de Reims, Champagne",
    category: "Champagne",
    rating: "100 pts Decanter",
    tastingNotes: "Pure Pinot Noir majesty. Gingerbread, spiced pear, truffles, and laser acidity.",
    bottlesRemaining: 3,
    bottlePrice: 3800,
    image:
      "https://images.unsplash.com/photo-1558001373-4b93945a557b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "CELLAR-03",
    name: "Romanée-Conti Grand Cru Monopole",
    vintage: "2015",
    producer: "Domaine de la Romanée-Conti",
    appellation: "Vosne-Romanée, Burgundy",
    category: "Burgundy",
    rating: "100 pts Wine Spectator",
    tastingNotes: "Ethereal violets, Asian spice box, crushed raspberries, and aristocratic velvet structure.",
    bottlesRemaining: 2,
    bottlePrice: 18500,
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "CELLAR-04",
    name: "Batard-Montrachet Grand Cru",
    vintage: "2018",
    producer: "Domaine Leflaive",
    appellation: "Puligny-Montrachet, Burgundy",
    category: "Burgundy",
    rating: "97 pts Vinous",
    tastingNotes: "White peach, toasted almonds, crushed chalk, and noble richness.",
    bottlesRemaining: 9,
    bottlePrice: 1450,
    glassPrice: 110,
    image:
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "CELLAR-05",
    name: "Château Cheval Blanc 1er Grand Cru Classé A",
    vintage: "2009",
    producer: "Château Cheval Blanc",
    appellation: "Saint-Émilion, Bordeaux",
    category: "Bordeaux",
    rating: "99 pts Robert Parker",
    tastingNotes: "Black cherry liqueur, incense, tobacco leaf, and sublime cashmere tannins.",
    bottlesRemaining: 6,
    bottlePrice: 2200,
    glassPrice: 175,
    image:
      "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "CELLAR-06",
    name: "Château Mouton Rothschild",
    vintage: "2010",
    producer: "Baron Philippe de Rothschild",
    appellation: "Pauillac, Bordeaux",
    category: "Bordeaux",
    rating: "100 pts Wine Advocate",
    tastingNotes: "Cassis, dark chocolate shavings, cedarwood, and unyielding mineral depth.",
    bottlesRemaining: 5,
    bottlePrice: 1950,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "CELLAR-07",
    name: "Barolo Monfortino Riserva",
    vintage: "2013",
    producer: "Giacomo Conterno",
    appellation: "Serralunga d'Alba, Piedmont",
    category: "Rhone & Piedmont",
    rating: "100 pts Antonio Galloni",
    tastingNotes: "Dried roses, black truffles, crushed mint, leather, and monumentally balanced grip.",
    bottlesRemaining: 4,
    bottlePrice: 2100,
    glassPrice: 190,
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "CELLAR-08",
    name: "Juyondai Ryugetsu Junmai Daiginjo",
    vintage: "2023",
    producer: "Takagi Shuzo",
    appellation: "Yamagata Prefecture, Japan",
    category: "Rare Sake",
    rating: "Grand Gold Sake Medal 2024",
    tastingNotes: "Pure Yamada Nishiki polished to 35%. Sweet melon blossom, white pear, velvet finish.",
    bottlesRemaining: 6,
    bottlePrice: 1600,
    glassPrice: 120,
    image:
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80",
  },
];

const PRIVATE_SALONS: PrivateSalon[] = [
  {
    id: "salon-obsidian",
    name: "The Obsidian Cellar Vault",
    capacity: "Up to 12 Guests",
    maxGuests: 12,
    minSpend: 6500,
    description:
      "Enclosed deep beneath the Paris limestone foundations, flanked by 3,800 historic vintage bottles. Features a monolithic black marble dining table, dedicated sommelier service, and bespoke acoustic intimacy.",
    features: ["Dedicated Master Sommelier", "Private Wine Vault Access", "Custom Monogrammed Menus", "Acoustic Seclusion"],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "salon-orchid",
    name: "The Orchid Court Pavilion",
    capacity: "Up to 8 Guests",
    maxGuests: 8,
    minSpend: 4800,
    description:
      "Bathed in soft ambient candlelight overlooking an exclusive Japanese moss rock garden and reflecting water pool. Neoclassical French mouldings meet minimalist Kyoto cedar screens.",
    features: ["Zen Garden Courtyard View", "Private Valet Concierge", "Curated Floral Installations", "Pre-Dinner Champagne Terrace"],
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "salon-counter",
    name: "The Hearth Chef's Counter",
    capacity: "Strictly 6 Guests",
    maxGuests: 6,
    minSpend: 5400,
    description:
      "A front-row sanctuary overlooking Chef Kenzo's open binchotan embers and plating atelier. Each course is presented, explained, and finished directly before your eyes.",
    features: ["Frontline Hearth & Binchotan View", "Direct Chef Interaction", "Exclusive Off-Menu Courses", "Rare Vintage Sake Pours"],
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80",
  },
];

const INITIAL_INQUIRIES: ReservationInquiry[] = [
  {
    id: "RES-VIP-901",
    createdAt: "Today, 14:22",
    salonId: "salon-obsidian",
    salonName: "The Obsidian Cellar Vault",
    guestName: "Lady Genevieve de Montmirail",
    guestTitle: "Private Collector & Patron",
    guestEmail: "g.montmirail@haute-patrimoine.fr",
    guestPhone: "+33 6 45 92 10 88",
    date: "2026-11-28",
    timeSlot: "20:00 (Evening Service)",
    guestCount: 8,
    experienceTier: "The Grand Imperial Reserve",
    wineTier: "Rare Cellar Allocation",
    dietaryNotes: ["No Shellfish for 2 guests", "Pescatarian adaptation for 1 guest"],
    specialCelebration: "30th Anniversary Cellar Tasting",
    status: "Confirmed VIP",
  },
  {
    id: "RES-VIP-902",
    createdAt: "Yesterday, 19:15",
    salonId: "salon-counter",
    salonName: "The Hearth Chef's Counter",
    guestName: "Sora & Kenji Takahashi",
    guestTitle: "Visiting Tokyo Gastronomes",
    guestEmail: "takahashi.k@ginza-capital.jp",
    guestPhone: "+81 90 4118 7720",
    date: "2026-12-05",
    timeSlot: "19:30 (Evening Service)",
    guestCount: 4,
    experienceTier: "The 10-Course Equinox",
    wineTier: "Rare Cellar Allocation",
    dietaryNotes: ["Halal Beef Preferred", "No Alcohol for 1 guest (Botanical Elixir)"],
    specialCelebration: "Culinary Tour Milestone",
    status: "Pending Sommelier Review",
  },
];

// =============================================================================
// MAIN COMPONENT: AURELIA LUXE DINING EXPERIENCE APP
// =============================================================================

export function LuxeDiningExperienceApp({ product }: { product: DemoProductDefinition }) {
  const { state, setState } = useDemoState<LuxeDiningState>(product.slug, {
    inquiries: INITIAL_INQUIRIES,
    selectedSalonId: "salon-obsidian",
    selectedCourseIndex: 0,
    selectedCellarCategory: "All",
    activeView: "brand-experience",
    isAudioMuted: true,
    bookmarkedCourses: [1, 4, 7],
  });

  // Local Form State for VIP Reservation
  const [formDate, setFormDate] = useState("2026-12-14");
  const [formTimeSlot, setFormTimeSlot] = useState("20:00 (Prime Dinner)");
  const [formGuestCount, setFormGuestCount] = useState(6);
  const [formSalonId, setFormSalonId] = useState("salon-obsidian");
  const [formTier, setFormTier] = useState<"The 10-Course Equinox" | "The Grand Imperial Reserve">("The Grand Imperial Reserve");
  const [formWineTier, setFormWineTier] = useState<"Prestige Cru" | "Rare Cellar Allocation" | "Botanical Non-Alcoholic">("Rare Cellar Allocation");
  const [formName, setFormName] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formCelebration, setFormCelebration] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [submittedReservation, setSubmittedReservation] = useState<ReservationInquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Audio tone generator ref for ambient culinary soundscape
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    const nextMuted = !state.isAudioMuted;
    setState((s) => ({ ...s, isAudioMuted: nextMuted }));

    if (typeof window === "undefined") return;

    if (!nextMuted) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(174, ctx.currentTime); // 174 Hz solfeggio frequency: deep relaxation & sanctuary

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(280, ctx.currentTime);

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
      } catch (err) {
        console.warn("Audio Context init error", err);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        try {
          gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
          setTimeout(() => {
            oscillatorRef.current?.stop();
            oscillatorRef.current?.disconnect();
            oscillatorRef.current = null;
          }, 900);
        } catch {}
      }
    }
  };

  useEffect(() => {
    return () => {
      try {
        oscillatorRef.current?.stop();
        audioCtxRef.current?.close();
      } catch {}
    };
  }, []);

  const activeCourse = TASTING_COURSES[state.selectedCourseIndex] || TASTING_COURSES[0];
  const activeSalon = PRIVATE_SALONS.find((s) => s.id === (state.selectedSalonId || "salon-obsidian")) || PRIVATE_SALONS[0];

  const filteredBottles = useMemo(() => {
    if (!state.selectedCellarCategory || state.selectedCellarCategory === "All") {
      return CELLAR_BOTTLES;
    }
    return CELLAR_BOTTLES.filter((b) => b.category === state.selectedCellarCategory);
  }, [state.selectedCellarCategory]);

  const toggleBookmark = (courseNum: number) => {
    setState((s) => {
      const exists = s.bookmarkedCourses.includes(courseNum);
      return {
        ...s,
        bookmarkedCourses: exists ? s.bookmarkedCourses.filter((n) => n !== courseNum) : [...s.bookmarkedCourses, courseNum],
      };
    });
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const salonObj = PRIVATE_SALONS.find((s) => s.id === formSalonId) || PRIVATE_SALONS[0];
      const newInquiry: ReservationInquiry = {
        id: `RES-VIP-${Math.floor(100 + Math.random() * 900)}`,
        createdAt: "Just now",
        salonId: formSalonId,
        salonName: salonObj.name,
        guestName: formName,
        guestTitle: formTitle || "Private Guest",
        guestEmail: formEmail,
        guestPhone: formPhone || "+33 (0) 1 42 68 00 00",
        date: formDate,
        timeSlot: formTimeSlot,
        guestCount: formGuestCount,
        experienceTier: formTier,
        wineTier: formWineTier,
        dietaryNotes: selectedAllergies.length > 0 ? selectedAllergies : ["No specific dietary allergies specified"],
        specialCelebration: formCelebration || "Gastronomic Dinner",
        status: "Pending Sommelier Review",
      };

      setState((s) => ({
        ...s,
        inquiries: [newInquiry, ...s.inquiries],
      }));
      setSubmittedReservation(newInquiry);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#E8E6E3] font-sans selection:bg-[#D4AF37]/30 selection:text-[#FFF8E7] antialiased">
      {/* =================================================================== */}
      {/* TOP NOTIFICATION / PILOT GUARD BAR */}
      {/* =================================================================== */}
      <div className="bg-[#0D0D12] border-b border-[#2A2A38] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-[#B0B0C0]">
        <div className="flex items-center gap-3">
          <Link
            href={`/demos/${product.categorySlug}/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-[#F3E5AB] font-medium transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Catalogue Blueprint</span>
          </Link>
          <span className="text-[#3A3A4A]">|</span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#A0A0B5]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            LIVE VERIFIED RUNTIME · CAT-01 #161
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded bg-[#1C1C26] text-[10px] text-[#D4AF37] border border-[#D4AF37]/30">
            Three Michelin Stars
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Ambient Audio Toggle */}
          <button
            onClick={toggleAudio}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono border transition-all ${
              !state.isAudioMuted
                ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#F3E5AB]"
                : "bg-[#14141E] border-[#2A2A38] text-[#8C8C9E] hover:text-white"
            }`}
            title="Toggle meditative ambient soundscape"
          >
            {!state.isAudioMuted ? <Volume2 className="w-3 h-3 text-[#D4AF37]" /> : <VolumeX className="w-3 h-3" />}
            <span>{!state.isAudioMuted ? "Audio: 174Hz Ambient" : "Ambient Audio: Off"}</span>
          </button>

          {/* Mode Switcher: Client View vs Concierge Operations */}
          <div className="flex items-center rounded bg-[#14141E] p-0.5 border border-[#2A2A38]">
            <button
              onClick={() => setState((s) => ({ ...s, activeView: "brand-experience" }))}
              className={`px-2.5 py-1 text-[11px] font-medium rounded transition-all ${
                state.activeView === "brand-experience"
                  ? "bg-[#D4AF37] text-black font-semibold shadow"
                  : "text-[#8C8C9E] hover:text-white"
              }`}
            >
              Editorial Showcase
            </button>
            <button
              onClick={() => setState((s) => ({ ...s, activeView: "concierge-operations" }))}
              className={`px-2.5 py-1 text-[11px] font-medium rounded transition-all flex items-center gap-1 ${
                state.activeView === "concierge-operations"
                  ? "bg-[#D4AF37] text-black font-semibold shadow"
                  : "text-[#8C8C9E] hover:text-white"
              }`}
            >
              <Settings className="w-3 h-3" />
              <span>Concierge Desk ({state.inquiries.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* EDITORIAL BRAND SHOWCASE VIEW */}
      {/* =================================================================== */}
      {state.activeView === "brand-experience" && (
        <>
          {/* NAVIGATION BAR */}
          <header className="sticky top-0 z-40 backdrop-blur-md bg-[#070709]/85 border-b border-[#1E1E28]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#101016]">
                  <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-serif tracking-[0.25em] text-[#FFF8E7] uppercase">
                    A U R E L I A
                  </h1>
                  <p className="text-[10px] tracking-[0.3em] font-mono text-[#D4AF37] uppercase">
                    Trois Étoiles Michelin · Paris
                  </p>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-[#A6A6BA]">
                <a href="#odyssey" className="hover:text-[#D4AF37] transition-colors">
                  The Tasting Odyssey
                </a>
                <a href="#cellar" className="hover:text-[#D4AF37] transition-colors">
                  Grand Cellar
                </a>
                <a href="#manifesto" className="hover:text-[#D4AF37] transition-colors">
                  Chef Manifesto
                </a>
                <a href="#salons" className="hover:text-[#D4AF37] transition-colors">
                  Private Salons
                </a>
                <a href="#reserve" className="hover:text-[#D4AF37] transition-colors text-[#D4AF37]">
                  Reserve Table
                </a>
              </nav>

              <div className="flex items-center gap-3">
                <a
                  href="#reserve"
                  className="px-4 py-2 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 hover:from-[#D4AF37]/30 hover:to-[#D4AF37]/20 text-[#FFF8E7] text-xs uppercase tracking-widest font-medium transition-all shadow-[0_0_20px_rgba(212,175,55,0.15)] flex items-center gap-1.5"
                >
                  <span>VIP Reservation</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </a>
              </div>
            </div>
          </header>

          {/* HERO: CINEMATIC FULL BLEED */}
          <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20 border-b border-[#1E1E28]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/80 via-[#070709]/90 to-[#070709]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />

            <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#12121A]/80 backdrop-blur-sm text-xs text-[#D4AF37] tracking-widest uppercase font-mono">
                <div className="flex text-[#D4AF37]">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span>Three Michelin Stars · Guide Michelin 2024</span>
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#FFFBF0] tracking-wide leading-[1.15]">
                Gastronomy Elevated <br />
                <span className="italic font-light text-[#D4AF37]">to Pure Artistry</span>
              </h2>

              <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#BDBDCF] font-light leading-relaxed">
                Where neoclassical French technique converges with heirloom Japanese terroir. An intimate ten-course
                sensory journey orchestrated for only fourteen patrons nightly.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono uppercase tracking-widest">
                <a
                  href="#odyssey"
                  className="px-6 py-3.5 rounded-full bg-[#D4AF37] text-black font-semibold hover:bg-[#F3E5AB] transition-all shadow-[0_0_30px_rgba(212,175,55,0.25)] flex items-center gap-2"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Explore Autumn Tasting</span>
                </a>
                <a
                  href="#reserve"
                  className="px-6 py-3.5 rounded-full border border-[#3A3A4C] bg-[#12121A]/60 hover:bg-[#1A1A26] text-[#E0E0EF] transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Inquire Private Salon</span>
                </a>
              </div>

              <div className="pt-8 border-t border-[#1C1C28] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#78788C]">Current Season</p>
                  <p className="text-sm font-serif text-[#FFF8E7] mt-1">Autumn Equinox X</p>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#78788C]">Nightly Seating</p>
                  <p className="text-sm font-serif text-[#FFF8E7] mt-1">Strictly 14 Covers</p>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#78788C]">Grand Cellar</p>
                  <p className="text-sm font-serif text-[#FFF8E7] mt-1">3,800 Rare Vintages</p>
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#78788C]">Executive Chef</p>
                  <p className="text-sm font-serif text-[#FFF8E7] mt-1">Kenzo Saint-Germain</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 1: INTERACTIVE 10-COURSE TASTING ODYSSEY */}
          <section id="odyssey" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 border-b border-[#1E1E28]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-[0.3em]">
                  Seasonal Tasting Experience
                </span>
                <h3 className="text-3xl sm:text-5xl font-serif text-[#FFF8E7]">
                  The Ten Metamorphoses
                </h3>
                <p className="text-sm text-[#A0A0B5] max-w-xl">
                  Each course represents an elemental transformation: ocean salinity, forest hearth, alpine cream, and
                  sub-zero crystallization.
                </p>
              </div>

              {/* Course Navigation Indicator */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      selectedCourseIndex: Math.max(0, s.selectedCourseIndex - 1),
                    }))
                  }
                  disabled={state.selectedCourseIndex === 0}
                  className="w-10 h-10 rounded-full border border-[#2E2E3E] bg-[#12121A] flex items-center justify-center text-[#E0E0EF] disabled:opacity-30 hover:border-[#D4AF37] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-[#D4AF37] px-3">
                  {state.selectedCourseIndex + 1} / {TASTING_COURSES.length}
                </span>
                <button
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      selectedCourseIndex: Math.min(TASTING_COURSES.length - 1, s.selectedCourseIndex + 1),
                    }))
                  }
                  disabled={state.selectedCourseIndex === TASTING_COURSES.length - 1}
                  className="w-10 h-10 rounded-full border border-[#2E2E3E] bg-[#12121A] flex items-center justify-center text-[#E0E0EF] disabled:opacity-30 hover:border-[#D4AF37] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Course Selector Track */}
            <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-thin scrollbar-thumb-[#2A2A38]">
              {TASTING_COURSES.map((course, idx) => {
                const isSelected = idx === state.selectedCourseIndex;
                const isBookmarked = state.bookmarkedCourses.includes(course.number);
                return (
                  <button
                    key={course.number}
                    onClick={() => setState((s) => ({ ...s, selectedCourseIndex: idx }))}
                    className={`flex-shrink-0 px-4 py-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#FFF8E7] shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                        : "bg-[#0E0E15] border-[#1E1E28] text-[#8A8A9E] hover:border-[#3A3A4C] hover:text-[#CCC]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-serif text-sm font-semibold">{course.roman}.</span>
                      {isBookmarked && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                    </div>
                    <p className="text-xs font-serif text-slate-200 truncate max-w-[130px] mt-0.5">{course.title}</p>
                    <span className="text-[10px] font-mono text-[#8C8C9E] uppercase tracking-wider">{course.category}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Course Presentation Hero Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0D0D14] rounded-2xl border border-[#222230] p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

              {/* Course Photography */}
              <div className="lg:col-span-5 relative group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#282838] bg-[#08080C] shadow-2xl relative">
                  <img
                    src={activeCourse.image}
                    alt={activeCourse.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-[#D4AF37]/40 text-[10px] font-mono uppercase text-[#D4AF37]">
                    Course {activeCourse.roman} · {activeCourse.category}
                  </div>
                  <button
                    onClick={() => toggleBookmark(activeCourse.number)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-black border border-[#3A3A4C] text-[#D4AF37] transition-all"
                    title="Bookmark course for your bespoke tasting request"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        state.bookmarkedCourses.includes(activeCourse.number) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#8C8C9E] px-1">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {activeCourse.terroir}
                  </span>
                  <span className="text-[11px] text-[#A0A0B5]">{activeCourse.temperature}</span>
                </div>
              </div>

              {/* Course Details & Sommelier Pairing */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {activeCourse.dietaryTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161622] text-[#B0B0C4] border border-[#2A2A3A]"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                      {activeCourse.region}
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-4xl font-serif text-[#FFF8E7]">
                    {activeCourse.title}
                  </h4>
                  <p className="text-sm sm:text-base font-serif italic text-[#D4AF37] mt-1">
                    {activeCourse.subTitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#C2C2D4] leading-relaxed font-light">
                  {activeCourse.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono py-2 border-y border-[#1C1C28]">
                  <div>
                    <span className="text-[#78788C] uppercase tracking-wider block text-[10px]">Culinary Technique</span>
                    <span className="text-[#E0E0EF] mt-0.5 block">{activeCourse.technique}</span>
                  </div>
                  <div>
                    <span className="text-[#78788C] uppercase tracking-wider block text-[10px]">Service Temperature</span>
                    <span className="text-[#E0E0EF] mt-0.5 block">{activeCourse.temperature}</span>
                  </div>
                </div>

                {/* Sommelier Pairing Highlight Box */}
                <div className="rounded-xl bg-[#12121C] border border-[#2D2D3E] p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
                      <Wine className="w-4 h-4" />
                      <span>Sommelier Vintage Pairing</span>
                    </div>
                    <span className="text-xs font-mono text-[#A0A0B5]">
                      Glass Supplement: ${activeCourse.winePairing.glassPrice}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-base font-serif text-[#FFF8E7] font-medium">
                      {activeCourse.winePairing.vintage} {activeCourse.winePairing.wine}
                    </p>
                    <p className="text-xs text-[#8C8C9E] font-mono">
                      {activeCourse.winePairing.producer} · {activeCourse.winePairing.region}
                    </p>
                  </div>

                  <p className="text-xs text-[#B5B5C8] italic leading-relaxed">
                    "{activeCourse.winePairing.notes}"
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: SOMMELIER'S GRAND CELLAR EXPLORER */}
          <section id="cellar" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 border-b border-[#1E1E28]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-[0.3em]">
                  Private Vault Allocations
                </span>
                <h3 className="text-3xl sm:text-5xl font-serif text-[#FFF8E7]">
                  The Grand Cellar
                </h3>
                <p className="text-sm text-[#A0A0B5] max-w-xl">
                  Curated by Head Sommelier Jean-Baptiste Laurent, featuring 3,800 hand-numbered bottles resting in 14th-century temperature-controlled stone vaults.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {["All", "Champagne", "Burgundy", "Bordeaux", "Rhone & Piedmont", "Rare Sake"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setState((s) => ({ ...s, selectedCellarCategory: cat }))}
                    className={`px-3 py-1.5 rounded-full border transition-all ${
                      state.selectedCellarCategory === cat
                        ? "bg-[#D4AF37] text-black font-semibold border-[#D4AF37]"
                        : "bg-[#101018] border-[#222232] text-[#8C8C9E] hover:border-[#3A3A4C]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBottles.map((bottle) => (
                <div
                  key={bottle.id}
                  className="rounded-xl bg-[#0D0D14] border border-[#20202E] hover:border-[#D4AF37]/50 p-5 space-y-4 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#050508] relative border border-[#1C1C26]">
                      <img
                        src={bottle.image}
                        alt={bottle.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                        {bottle.vintage}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                        {bottle.category} · {bottle.appellation}
                      </span>
                      <h4 className="text-base font-serif text-[#FFF8E7] mt-1 group-hover:text-[#F3E5AB] transition-colors leading-snug">
                        {bottle.name}
                      </h4>
                      <p className="text-xs text-[#8A8A9E] font-mono mt-0.5">{bottle.producer}</p>
                    </div>

                    <p className="text-xs text-[#B0B0C4] line-clamp-2 leading-relaxed">
                      {bottle.tastingNotes}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1C1C28] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#78788C]">Acclaimed Rating</span>
                      <span className="text-[#10B981] font-semibold">{bottle.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#78788C] block">Cellar Bottle</span>
                        <span className="text-base font-serif text-[#FFF8E7] font-semibold">
                          ${bottle.bottlePrice.toLocaleString()}
                        </span>
                      </div>
                      {bottle.glassPrice && (
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-[#78788C] block">By the Glass</span>
                          <span className="text-xs font-mono text-[#D4AF37]">${bottle.glassPrice}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] font-mono text-[#D4AF37]/80 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>{bottle.bottlesRemaining} allocated bottles in vault</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: CHEF MANIFESTO & TERROIR PROVENANCE */}
          <section id="manifesto" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 border-b border-[#1E1E28]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#2D2D3E] shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                    alt="Chef Kenzo Saint-Germain"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 space-y-1">
                    <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">Culinary Director</p>
                    <h4 className="text-2xl font-serif text-[#FFF8E7]">Kenzo Saint-Germain</h4>
                    <p className="text-xs text-[#A0A0B5]">Former Chef de Cuisine at 3-Star L'Arpège & Kikunoi Kyoto</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-[0.3em]">
                    The Culinary Philosophy
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-serif text-[#FFF8E7] leading-tight">
                    "Nature dictates the plate; fire and water are our only instruments."
                  </h3>
                </div>

                <div className="space-y-4 text-base text-[#C2C2D6] font-light leading-relaxed">
                  <p>
                    At Aurelia, luxury is defined not by excess, but by absolute purity of provenance. Every wild turbot
                    is line-caught off the granite cliffs of Brittany; our white truffles are unearthed in confidential
                    Alba groves by third-generation trifolau; and our binchotan charcoal is hand-kilned in Kishu from
                    century-old ubame oak.
                  </p>
                  <p>
                    We reject synthetic embellishments. We serve fourteen guests per evening because true hospitality
                    demands microscopic attention to temperature, cadence, and human connection.
                  </p>
                </div>

                {/* Terroir Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1C1C28]">
                  <div className="p-4 rounded-xl bg-[#0D0D14] border border-[#20202E]">
                    <MapPin className="w-4 h-4 text-[#D4AF37] mb-2" />
                    <h5 className="text-sm font-serif text-[#FFF8E7]">Roscoff & Saint-Brieuc</h5>
                    <p className="text-xs text-[#8C8C9E] mt-1 font-mono">Diver scallops & blue lobster caught within 18 hours of plating.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0D0D14] border border-[#20202E]">
                    <Compass className="w-4 h-4 text-[#D4AF37] mb-2" />
                    <h5 className="text-sm font-serif text-[#FFF8E7]">Miyazaki Kuroge Wagyu</h5>
                    <p className="text-xs text-[#8C8C9E] mt-1 font-mono">BMS 12 marble striploin aged over mineral salt slabs.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0D0D14] border border-[#20202E]">
                    <Sparkles className="w-4 h-4 text-[#D4AF37] mb-2" />
                    <h5 className="text-sm font-serif text-[#FFF8E7]">Saint-Cloud Greenhouse</h5>
                    <p className="text-xs text-[#8C8C9E] mt-1 font-mono">Heirloom micro-botanicals harvested at 6:00 AM daily.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: PRIVATE DINING SALONS */}
          <section id="salons" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 border-b border-[#1E1E28]">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-[0.3em]">
                Exclusive Enclaves
              </span>
              <h3 className="text-3xl sm:text-5xl font-serif text-[#FFF8E7]">
                Private Dining Salons
              </h3>
              <p className="text-sm text-[#A0A0B5]">
                Three architecturally secluded environments tailored for milestone celebrations, confidential diplomatic
                gatherings, and private cellar tastings.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PRIVATE_SALONS.map((salon) => (
                <div
                  key={salon.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                    state.selectedSalonId === salon.id
                      ? "bg-[#11111A] border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                      : "bg-[#0A0A10] border-[#1E1E2A] hover:border-[#38384C]"
                  }`}
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={salon.image} alt={salon.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-[#D4AF37]/30 text-[10px] font-mono text-[#D4AF37]">
                        {salon.capacity}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="text-xl font-serif text-[#FFF8E7]">{salon.name}</h4>
                        <p className="text-xs font-mono text-[#D4AF37] mt-1">
                          Minimum Gastronomic Spend: ${salon.minSpend.toLocaleString()}
                        </p>
                      </div>

                      <p className="text-xs text-[#B0B0C4] leading-relaxed font-light">
                        {salon.description}
                      </p>

                      <div className="space-y-1.5 pt-2">
                        {salon.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs font-mono text-[#8C8C9E]">
                            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => {
                        setState((s) => ({ ...s, selectedSalonId: salon.id }));
                        setFormSalonId(salon.id);
                        const el = document.getElementById("reserve");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`w-full py-2.5 rounded-lg text-xs font-mono uppercase tracking-widest transition-all ${
                        state.selectedSalonId === salon.id
                          ? "bg-[#D4AF37] text-black font-semibold"
                          : "border border-[#2C2C3C] bg-[#12121A] text-[#E0E0EF] hover:border-[#D4AF37]"
                      }`}
                    >
                      {state.selectedSalonId === salon.id ? "Selected for Reservation" : "Select This Salon"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: VIP PRIVATE RESERVATION CONCIERGE (FUNCTIONAL FORM) */}
          <section id="reserve" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-[0.3em]">
                White-Glove Service
              </span>
              <h3 className="text-3xl sm:text-5xl font-serif text-[#FFF8E7]">
                VIP Concierge Inquiries
              </h3>
              <p className="text-sm text-[#A0A0B5]">
                Reservations are reviewed and personally coordinated by Head Maitre d'hôtel Alexandre Valmont.
              </p>
            </div>

            {submittedReservation ? (
              <div className="rounded-2xl bg-[#0D0D16] border border-[#D4AF37] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                    Reservation Dossier Transmitted
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-serif text-[#FFF8E7]">
                    Thank you, {submittedReservation.guestName}
                  </h4>
                  <p className="text-sm text-[#A0A0B5] max-w-lg mx-auto">
                    Your VIP inquiry for <span className="text-[#FFF8E7] font-medium">{submittedReservation.salonName}</span> on{" "}
                    <span className="text-[#D4AF37] font-mono">{submittedReservation.date}</span> at{" "}
                    <span className="text-[#D4AF37] font-mono">{submittedReservation.timeSlot}</span> has been logged in our Concierge Registry.
                  </p>
                </div>

                <div className="max-w-md mx-auto p-4 rounded-xl bg-[#141420] border border-[#2A2A3A] text-left text-xs font-mono space-y-2">
                  <div className="flex justify-between text-[#8A8A9E]">
                    <span>Reference Dossier:</span>
                    <span className="text-[#D4AF37] font-semibold">{submittedReservation.id}</span>
                  </div>
                  <div className="flex justify-between text-[#8A8A9E]">
                    <span>Guest Headcount:</span>
                    <span className="text-slate-200">{submittedReservation.guestCount} Guests</span>
                  </div>
                  <div className="flex justify-between text-[#8A8A9E]">
                    <span>Tasting Tier:</span>
                    <span className="text-slate-200">{submittedReservation.experienceTier}</span>
                  </div>
                  <div className="flex justify-between text-[#8A8A9E]">
                    <span>Cellar Program:</span>
                    <span className="text-slate-200">{submittedReservation.wineTier}</span>
                  </div>
                  <div className="flex justify-between text-[#8A8A9E]">
                    <span>Registry Status:</span>
                    <span className="text-[#10B981] font-semibold">{submittedReservation.status}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setState((s) => ({ ...s, activeView: "concierge-operations" }))}
                    className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-[#F3E5AB] transition-colors"
                  >
                    View in Concierge Operations Desk
                  </button>
                  <button
                    onClick={() => setSubmittedReservation(null)}
                    className="px-6 py-2.5 rounded-full border border-[#3A3A4C] text-[#8C8C9E] hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleReservationSubmit}
                className="rounded-2xl bg-[#0D0D14] border border-[#242434] p-6 sm:p-10 space-y-8 shadow-xl"
              >
                {/* Salon & Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0B5] mb-2">
                      Selected Salon / Enclave
                    </label>
                    <select
                      value={formSalonId}
                      onChange={(e) => setFormSalonId(e.target.value)}
                      className="w-full bg-[#14141F] border border-[#2A2A3C] rounded-lg px-3.5 py-2.5 text-xs text-[#FFF8E7] focus:outline-none focus:border-[#D4AF37]"
                    >
                      {PRIVATE_SALONS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.capacity})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0B5] mb-2">
                      Reservation Date
                    </label>
                    <input
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full bg-[#14141F] border border-[#2A2A3C] rounded-lg px-3.5 py-2.5 text-xs text-[#FFF8E7] focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0B5] mb-2">
                      Service Seating Window
                    </label>
                    <select
                      value={formTimeSlot}
                      onChange={(e) => setFormTimeSlot(e.target.value)}
                      className="w-full bg-[#14141F] border border-[#2A2A3C] rounded-lg px-3.5 py-2.5 text-xs text-[#FFF8E7] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="19:00 (Sunset Seating)">19:00 (Sunset Seating)</option>
                      <option value="20:00 (Prime Dinner)">20:00 (Prime Dinner)</option>
                      <option value="21:15 (Late Service)">21:15 (Late Service)</option>
                    </select>
                  </div>
                </div>

                {/* Headcount & Experience Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-mono uppercase text-[#A0A0B5]">Guest Headcount</label>
                      <span className="text-xs font-mono text-[#D4AF37] font-semibold">{formGuestCount} Guests</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={12}
                      value={formGuestCount}
                      onChange={(e) => setFormGuestCount(Number(e.target.value))}
                      className="w-full accent-[#D4AF37]"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[#6A6A7C] mt-1">
                      <span>2 (Intimate)</span>
                      <span>6 (Chef Counter)</span>
                      <span>12 (Cellar Max)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0B5] mb-2">
                      Tasting Menu Tier
                    </label>
                    <select
                      value={formTier}
                      onChange={(e) => setFormTier(e.target.value as any)}
                      className="w-full bg-[#14141F] border border-[#2A2A3C] rounded-lg px-3.5 py-2.5 text-xs text-[#FFF8E7] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="The 10-Course Equinox">The 10-Course Equinox ($380 / cover)</option>
                      <option value="The Grand Imperial Reserve">The Grand Imperial Reserve ($540 / cover)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0B5] mb-2">
                      Wine Cellar Pairing Program
                    </label>
                    <select
                      value={formWineTier}
                      onChange={(e) => setFormWineTier(e.target.value as any)}
                      className="w-full bg-[#14141F] border border-[#2A2A3C] rounded-lg px-3.5 py-2.5 text-xs text-[#FFF8E7] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Prestige Cru">Prestige Cru Sommelier Selection (+$220)</option>
                      <option value="Rare Cellar Allocation">Rare Cellar Vintage Allocations (+$480)</option>
                      <option value="Botanical Non-Alcoholic">Botanical Elixirs & Cold Infusions (+$140)</option>
                    </select>
                  </div>
                </div>

                {/* Dietary & Allergy Customizer */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase text-[#A0A0B5]">
                    Patron Dietary Adaptations & Allergies
                  </label>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {[
                      "Shellfish Allergy",
                      "Tree Nuts / Peanut",
                      "Gluten-Free Required",
                      "Dairy-Free Emulsions",
                      "Pescatarian Adaptation",
                      "Halal Meat Certification",
                      "Vegetarian Gastronomy",
                    ].map((allergy) => {
                      const active = selectedAllergies.includes(allergy);
                      return (
                        <button
                          type="button"
                          key={allergy}
                          onClick={() => {
                            setSelectedAllergies((prev) =>
                              active ? prev.filter((a) => a !== allergy) : [...prev, allergy]
                            );
                          }}
                          className={`px-3 py-1.5 rounded-full border transition-colors ${
                            active
                              ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFF8E7]"
                              : "bg-[#14141F] border-[#2A2A38] text-[#8C8C9E] hover:text-[#CCC]"
                          }`}
                        >
                          {active ? `✓ ${allergy}` : `+ ${allergy}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Guest Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0B5] mb-1.5">Honorific / Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Ambassador, Baron, Dr."
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full bg-[#14141F] border border-[#2A2A3C] rounded-lg px-3 py-2 text-xs text-[#FFF8E7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0B5] mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Patron Name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-[#14141F] border border-[#2A2A3C] rounded-lg px-3 py-2 text-xs text-[#FFF8E7] focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0B5] mb-1.5">Direct Email *</label>
                    <input
                      type="email"
                      placeholder="vip@domain.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-[#14141F] border border-[#2A2A3C] rounded-lg px-3 py-2 text-xs text-[#FFF8E7] focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0B5] mb-1.5">Private Phone</label>
                    <input
                      type="tel"
                      placeholder="+33 6 ..."
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full bg-[#14141F] border border-[#2A2A3C] rounded-lg px-3 py-2 text-xs text-[#FFF8E7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0B5] mb-1.5">
                    Celebration Notes & Confidential Preferences
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Wedding anniversary, confidential diplomatic dinner, guest of honor prefers 2004 Bollinger upon arrival."
                    value={formCelebration}
                    onChange={(e) => setFormCelebration(e.target.value)}
                    className="w-full bg-[#14141F] border border-[#2A2A3C] rounded-lg px-3.5 py-2 text-xs text-[#FFF8E7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1E1E2C]">
                  <p className="text-[11px] font-mono text-[#8C8C9E] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Confidential VIP Protocol · Response within 4 hours by Maitre d'hôtel</span>
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-semibold text-xs font-mono uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Dossier...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Transmit Reservation Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* FOOTER */}
          <footer className="border-t border-[#1A1A24] bg-[#050508] py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-[#78788C]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-serif text-sm tracking-widest text-[#FFF8E7]">A U R E L I A</span>
                <span>· 18 Place Vendôme, 75001 Paris, France</span>
              </div>
              <div className="flex items-center gap-6">
                <span>Dinner Service: 19:00 — 23:30</span>
                <span>Strict Formal Dress Code</span>
                <span className="text-[#D4AF37]">Guide Michelin 2024</span>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* =================================================================== */}
      {/* CONCIERGE OPERATIONS / MANAGEMENT VIEW */}
      {/* =================================================================== */}
      {state.activeView === "concierge-operations" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222230]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                <Settings className="w-4 h-4" />
                <span>Maitre d'hôtel Operations & Floor Pacing</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#FFF8E7] mt-1">
                VIP Concierge & Cellar Allocations Desk
              </h2>
            </div>

            <button
              onClick={() => setState((s) => ({ ...s, activeView: "brand-experience" }))}
              className="px-4 py-2 rounded-lg border border-[#3A3A4C] bg-[#12121A] text-xs font-mono text-[#FFF8E7] hover:border-[#D4AF37] transition-all flex items-center gap-2 self-start sm:self-auto"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Return to Public Editorial Site</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#0D0D14] border border-[#222230]">
              <span className="text-[10px] font-mono text-[#8C8C9E] uppercase tracking-wider">Tonight's Seating</span>
              <p className="text-2xl font-serif text-[#FFF8E7] mt-1">14 / 14 Covers</p>
              <span className="text-[10px] text-[#10B981] font-mono mt-1 block">100% Capacity Max</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0D14] border border-[#222230]">
              <span className="text-[10px] font-mono text-[#8C8C9E] uppercase tracking-wider">Pending VIP Inquiries</span>
              <p className="text-2xl font-serif text-[#D4AF37] mt-1">{state.inquiries.length} Requests</p>
              <span className="text-[10px] text-[#A0A0B5] font-mono mt-1 block">Next Service in 3h 15m</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0D14] border border-[#222230]">
              <span className="text-[10px] font-mono text-[#8C8C9E] uppercase tracking-wider">Cellar Pre-Allocations</span>
              <p className="text-2xl font-serif text-[#FFF8E7] mt-1">18 Grand Crus</p>
              <span className="text-[10px] text-[#A0A0B5] font-mono mt-1 block">Sommelier Decanting Active</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0D14] border border-[#222230]">
              <span className="text-[10px] font-mono text-[#8C8C9E] uppercase tracking-wider">Average Cover Revenue</span>
              <p className="text-2xl font-serif text-[#FFF8E7] mt-1">$685.00</p>
              <span className="text-[10px] text-[#10B981] font-mono mt-1 block">+18% with Imperial Caviar</span>
            </div>
          </div>

          {/* Incoming VIP Inquiries Table */}
          <div className="rounded-xl bg-[#0D0D14] border border-[#222230] overflow-hidden">
            <div className="p-5 border-b border-[#20202C] flex items-center justify-between">
              <div>
                <h3 className="text-base font-serif text-[#FFF8E7]">VIP Salon Reservations & Inquiries</h3>
                <p className="text-xs text-[#8C8C9E]">Review, approve, and assign dedicated sommelier service</p>
              </div>
              <span className="text-xs font-mono text-[#D4AF37]">{state.inquiries.length} Active Dossiers</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#12121B] text-[#78788C] font-mono uppercase tracking-wider border-b border-[#20202C]">
                  <tr>
                    <th className="py-3 px-4">Dossier ID</th>
                    <th className="py-3 px-4">Patron & Title</th>
                    <th className="py-3 px-4">Salon / Enclave</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Covers & Menu</th>
                    <th className="py-3 px-4">Dietary Specifications</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A26] font-mono text-[#C0C0D4]">
                  {state.inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-[#14141F] transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[#D4AF37]">{inq.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-serif text-sm text-[#FFF8E7]">{inq.guestName}</div>
                        <div className="text-[10px] text-[#8C8C9E]">{inq.guestTitle}</div>
                        <div className="text-[10px] text-[#6E6E80]">{inq.guestEmail}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[#FFF8E7]">{inq.salonName}</td>
                      <td className="py-3.5 px-4">
                        <div>{inq.date}</div>
                        <div className="text-[10px] text-[#8C8C9E]">{inq.timeSlot}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#1C1C28] text-[#FFF8E7]">
                          {inq.guestCount} Covers
                        </span>
                        <div className="text-[10px] text-[#D4AF37] mt-1">{inq.experienceTier}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="space-y-0.5">
                          {inq.dietaryNotes.map((note, i) => (
                            <span key={i} className="inline-block text-[10px] text-[#A0A0B5] bg-[#161622] px-1.5 py-0.5 rounded mr-1">
                              {note}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] ${
                            inq.status === "Confirmed VIP"
                              ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"
                              : "bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30"
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {inq.status !== "Confirmed VIP" ? (
                          <button
                            onClick={() => {
                              setState((s) => ({
                                ...s,
                                inquiries: s.inquiries.map((item) =>
                                  item.id === inq.id ? { ...item, status: "Confirmed VIP" } : item
                                ),
                              }));
                            }}
                            className="px-2.5 py-1 rounded bg-[#D4AF37] text-black text-[10px] font-semibold hover:bg-[#F3E5AB] transition-colors"
                          >
                            Confirm VIP
                          </button>
                        ) : (
                          <span className="text-[10px] text-[#10B981]">Allocated</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
