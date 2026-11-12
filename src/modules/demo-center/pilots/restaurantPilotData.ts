export type PilotScreenId =
  | "dashboard-overview"
  | "orders-management"
  | "order-details"
  | "menu-management"
  | "categories-management"
  | "table-management"
  | "reservations"
  | "customer-management"
  | "staff-management"
  | "inventory"
  | "sales-analytics"
  | "restaurant-settings";

export type OrderStatus = "New" | "Preparing" | "Ready" | "Served" | "Cancelled";
export type OrderChannel = "Dine-In" | "Takeaway" | "Delivery";
export type PaymentMethod = "Card" | "UPI" | "Cash" | "Split";
export type TableStatus = "Available" | "Occupied" | "Reserved" | "Cleaning";
export type ReservationStatus = "Confirmed" | "Seated" | "Completed" | "Cancelled" | "No-Show";

export interface PilotOrderItem {
  menuItemId: string;
  name: string;
  qty: number;
  unitPrice: number;
  notes?: string;
}

export interface PilotOrder {
  id: string;
  orderNumber: string;
  customerId: string | null;
  customerName: string;
  tableId: string | null;
  tableCode: string;
  channel: OrderChannel;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: "Paid" | "Pending" | "Refunded";
  items: PilotOrderItem[];
  specialInstructions: string;
  assignedStaff: string;
  createdAt: string;
  updatedAt: string;
}

export interface PilotCategory {
  id: string;
  name: string;
  description: string;
  displayOrder: number;
  status: "Active" | "Seasonal" | "Hidden";
  station: "Hot Line" | "Cold Garde" | "Pastry" | "Cellar & Bar";
}

export interface PilotMenuItem {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  costPrice: number;
  prepMinutes: number;
  dietary: "Veg" | "Non-Veg" | "Vegan" | "Signature";
  available: boolean;
  popular: boolean;
  description: string;
  allergens: string[];
}

export interface PilotTable {
  id: string;
  code: string;
  section: "Main Salon" | "Chef's Counter" | "Garden Terrace" | "Private Cellar";
  capacity: number;
  status: TableStatus;
  serverName: string;
  guestCount: number;
  seatedAt?: string;
}

export interface PilotReservation {
  id: string;
  guestName: string;
  customerId: string | null;
  phone: string;
  partySize: number;
  date: string;
  timeSlot: string;
  tableId: string | null;
  tableCode: string;
  status: ReservationStatus;
  occasion: string;
  notes: string;
}

export interface PilotCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: "VIP Patron" | "Regular" | "First Visit";
  dietaryNotes: string;
  favoriteDish: string;
  baseOrdersCount: number;
  baseLifetimeSpend: number;
  lastVisit: string;
}

export interface PilotStaffMember {
  id: string;
  name: string;
  role: "Executive Chef" | "Sous Chef" | "Maître D'" | "Senior Sommelier" | "Floor Captain" | "Mixologist";
  department: "Culinary" | "Floor Service" | "Beverage";
  shift: "Morning Prep" | "Evening Service" | "Split Shift";
  status: "On Duty" | "On Break" | "Off Duty";
  phone: string;
  assignedSection: string;
}

export interface PilotInventoryItem {
  id: string;
  name: string;
  category: "Produce" | "Proteins" | "Dairy & Truffle" | "Dry Pantry" | "Cellar";
  unit: string;
  stock: number;
  minPar: number;
  unitCost: number;
  supplier: string;
  lastRestocked: string;
}

export interface PilotRestaurantSettings {
  restaurantName: string;
  tagline: string;
  cuisineConcept: string;
  phone: string;
  email: string;
  address: string;
  gstRatePercent: number;
  serviceChargePercent: number;
  lowStockDefaultMultiplier: number;
  openHours: string;
  autoPrintKot: boolean;
  acceptingReservations: boolean;
  currencySymbol: string;
}

export interface PilotActivityLog {
  id: string;
  timestamp: string;
  actor: string;
  summary: string;
  module: "Orders" | "Kitchen" | "Tables" | "Reservations" | "Inventory" | "Settings";
}

export interface RestaurantPilotState extends Record<string, unknown> {
  orders: PilotOrder[];
  categories: PilotCategory[];
  menuItems: PilotMenuItem[];
  tables: PilotTable[];
  reservations: PilotReservation[];
  customers: PilotCustomer[];
  staff: PilotStaffMember[];
  inventory: PilotInventoryItem[];
  settings: PilotRestaurantSettings;
  activityLog: PilotActivityLog[];
}

export const STITCH_PILOT_REFERENCE = {
  projectId: "3910216210723829003",
  designSystemId: "assets/297f3d3dc06340d98cd232376b2fc9b5",
  designSystemName: "Haute Hospitality Executive OS",
  screenCount: 12,
};

export const PILOT_FORMAT_CURRENCY = (amount: number, symbol = "₹"): string =>
  `${symbol}${Math.round(amount).toLocaleString("en-IN")}`;

export const RESTAURANT_PILOT_SEED: RestaurantPilotState = {
  settings: {
    restaurantName: "Maison Ember",
    tagline: "Wood-Fired Contemporary Kitchen & Private Cellar",
    cuisineConcept: "Progressive Indian & European Hearth",
    phone: "+91 22 4890 7721",
    email: "concierge@maisonember.in",
    address: "14 Pali Hill Courtyard, Bandra West, Mumbai 400050",
    gstRatePercent: 5,
    serviceChargePercent: 10,
    lowStockDefaultMultiplier: 1.0,
    openHours: "12:00 PM – 11:30 PM",
    autoPrintKot: true,
    acceptingReservations: true,
    currencySymbol: "₹",
  },
  categories: [
    {
      id: "cat-small",
      name: "Hearth Small Plates",
      description: "Charcoal-kissed starters & tableside breads",
      displayOrder: 1,
      status: "Active",
      station: "Hot Line",
    },
    {
      id: "cat-mains",
      name: "Signature Mains",
      description: "Dry-aged cuts, coastal seafood & heirloom grains",
      displayOrder: 2,
      status: "Active",
      station: "Hot Line",
    },
    {
      id: "cat-raw",
      name: "Crudo & Garde Manger",
      description: "Chilled botanical salads & cured seasonal catch",
      displayOrder: 3,
      status: "Active",
      station: "Cold Garde",
    },
    {
      id: "cat-pastry",
      name: "Artisan Patisserie",
      description: "Warm plated desserts & house gelato",
      displayOrder: 4,
      status: "Active",
      station: "Pastry",
    },
    {
      id: "cat-cellar",
      name: "Cellar & Zero-Proof",
      description: "Botanical infusions, vintage pours & digestifs",
      displayOrder: 5,
      status: "Active",
      station: "Cellar & Bar",
    },
  ],
  menuItems: [
    {
      id: "dish-1",
      name: "Smoked Burrata & Heirloom Tomato Tartine",
      categoryId: "cat-small",
      price: 950,
      costPrice: 280,
      prepMinutes: 10,
      dietary: "Veg",
      available: true,
      popular: true,
      description: "Sourdough levain, Cold-smoked burrata, Basil oil & Aged balsamic",
      allergens: ["Dairy", "Gluten"],
    },
    {
      id: "dish-2",
      name: "Truffle Wild Mushroom Galouti",
      categoryId: "cat-small",
      price: 1180,
      costPrice: 340,
      prepMinutes: 14,
      dietary: "Signature",
      available: true,
      popular: true,
      description: "Morel & Maitake silk medallions on saffron ulte tawe ka paratha",
      allergens: ["Dairy", "Gluten", "Nuts"],
    },
    {
      id: "dish-3",
      name: "Charred Malabar Prawns & Curry Leaf Butter",
      categoryId: "cat-mains",
      price: 1850,
      costPrice: 640,
      prepMinutes: 16,
      dietary: "Non-Veg",
      available: true,
      popular: true,
      description: "Wild-caught tiger prawns, kokum glaze, toasted brioche crumb",
      allergens: ["Shellfish", "Dairy", "Gluten"],
    },
    {
      id: "dish-4",
      name: "48-Hour Braised Lamb Shank Nihari",
      categoryId: "cat-mains",
      price: 2250,
      costPrice: 780,
      prepMinutes: 18,
      dietary: "Signature",
      available: true,
      popular: true,
      description: "Bone-marrow jus, black cardamom, crispy shallots & bone-marrow naan",
      allergens: ["Gluten", "Dairy"],
    },
    {
      id: "dish-5",
      name: "Black Garlic & Quinoa Harvest Bowl",
      categoryId: "cat-raw",
      price: 890,
      costPrice: 220,
      prepMinutes: 9,
      dietary: "Vegan",
      available: true,
      popular: false,
      description: "Roasted baby carrots, fermented garlic dressing & toasted pepitas",
      allergens: ["Seeds"],
    },
    {
      id: "dish-6",
      name: "Hamachi Crudo & Yuzu Kosho",
      categoryId: "cat-raw",
      price: 1620,
      costPrice: 590,
      prepMinutes: 8,
      dietary: "Non-Veg",
      available: true,
      popular: false,
      description: "Sashimi-grade amberjack, white soy, crisp lotus root",
      allergens: ["Fish", "Soy"],
    },
    {
      id: "dish-7",
      name: "Saffron Pistachio Mille-Feuille",
      categoryId: "cat-pastry",
      price: 780,
      costPrice: 195,
      prepMinutes: 12,
      dietary: "Veg",
      available: true,
      popular: true,
      description: "Caramelized puff sheets, cardamom mascarpone & candied rose",
      allergens: ["Dairy", "Gluten", "Nuts"],
    },
    {
      id: "dish-8",
      name: "70% Single-Origin Dark Chocolate Marquise",
      categoryId: "cat-pastry",
      price: 820,
      costPrice: 230,
      prepMinutes: 10,
      dietary: "Veg",
      available: false,
      popular: false,
      description: "Idukki cacao, sea-salt caramel & smoked vanilla bean ice cream",
      allergens: ["Dairy", "Gluten"],
    },
    {
      id: "dish-9",
      name: "Smoked Rosemary & Blood Orange Negroni",
      categoryId: "cat-cellar",
      price: 960,
      costPrice: 260,
      prepMinutes: 5,
      dietary: "Signature",
      available: true,
      popular: false,
      description: "Small-batch botanical gin, charred orange peel & Campari",
      allergens: [],
    },
    {
      id: "dish-10",
      name: "Zero-Proof Darjeeling First Flush Spritz",
      categoryId: "cat-cellar",
      price: 540,
      costPrice: 110,
      prepMinutes: 4,
      dietary: "Vegan",
      available: true,
      popular: false,
      description: "Cold-steeped muscatel tea, white peach verjus & sparkling mineral",
      allergens: [],
    },
  ],
  tables: [
    { id: "tbl-1", code: "T-01", section: "Main Salon", capacity: 2, status: "Occupied", serverName: "Kabir Sen", guestCount: 2, seatedAt: "19:15" },
    { id: "tbl-2", code: "T-02", section: "Main Salon", capacity: 4, status: "Occupied", serverName: "Kabir Sen", guestCount: 4, seatedAt: "19:30" },
    { id: "tbl-3", code: "T-03", section: "Main Salon", capacity: 4, status: "Reserved", serverName: "Meera Nair", guestCount: 0 },
    { id: "tbl-4", code: "T-04", section: "Main Salon", capacity: 6, status: "Available", serverName: "Meera Nair", guestCount: 0 },
    { id: "tbl-5", code: "C-01", section: "Chef's Counter", capacity: 2, status: "Occupied", serverName: "Chef Aarav", guestCount: 2, seatedAt: "20:05" },
    { id: "tbl-6", code: "C-02", section: "Chef's Counter", capacity: 2, status: "Available", serverName: "Chef Aarav", guestCount: 0 },
    { id: "tbl-7", code: "G-01", section: "Garden Terrace", capacity: 4, status: "Occupied", serverName: "Rohan Mehta", guestCount: 3, seatedAt: "19:45" },
    { id: "tbl-8", code: "G-02", section: "Garden Terrace", capacity: 4, status: "Cleaning", serverName: "Rohan Mehta", guestCount: 0 },
    { id: "tbl-9", code: "P-01", section: "Private Cellar", capacity: 8, status: "Reserved", serverName: "Ananya Rao", guestCount: 0 },
    { id: "tbl-10", code: "P-02", section: "Private Cellar", capacity: 10, status: "Available", serverName: "Ananya Rao", guestCount: 0 },
  ],
  customers: [
    {
      id: "cust-1",
      name: "Vikramaditya Kapoor",
      email: "v.kapoor@kapoorholdings.in",
      phone: "+91 98201 44120",
      tier: "VIP Patron",
      dietaryNotes: "Prefers medium-rare; no cilantro",
      favoriteDish: "48-Hour Braised Lamb Shank Nihari",
      baseOrdersCount: 14,
      baseLifetimeSpend: 68400,
      lastVisit: "Today",
    },
    {
      id: "cust-2",
      name: "Nandini Deshmukh",
      email: "nandini@atelierdeshmukh.com",
      phone: "+91 98192 77315",
      tier: "VIP Patron",
      dietaryNotes: "Strictly vegetarian; nut allergy",
      favoriteDish: "Smoked Burrata & Heirloom Tomato Tartine",
      baseOrdersCount: 11,
      baseLifetimeSpend: 42900,
      lastVisit: "Today",
    },
    {
      id: "cust-3",
      name: "Siddharth Malhotra",
      email: "siddharth.m@verveventures.in",
      phone: "+91 99304 51098",
      tier: "Regular",
      dietaryNotes: "Low-sodium preference",
      favoriteDish: "Charred Malabar Prawns & Curry Leaf Butter",
      baseOrdersCount: 6,
      baseLifetimeSpend: 21500,
      lastVisit: "3 days ago",
    },
    {
      id: "cust-4",
      name: "Elena Rostova",
      email: "elena.rostova@galeriemumbai.org",
      phone: "+91 98210 66240",
      tier: "Regular",
      dietaryNotes: "Pescatarian",
      favoriteDish: "Hamachi Crudo & Yuzu Kosho",
      baseOrdersCount: 5,
      baseLifetimeSpend: 19200,
      lastVisit: "Today",
    },
    {
      id: "cust-5",
      name: "Raghavendra Iyer",
      email: "r.iyer@finbridge.co.in",
      phone: "+91 98450 31872",
      tier: "VIP Patron",
      dietaryNotes: "Host for corporate cellar tastings",
      favoriteDish: "Truffle Wild Mushroom Galouti",
      baseOrdersCount: 9,
      baseLifetimeSpend: 54100,
      lastVisit: "Yesterday",
    },
    {
      id: "cust-6",
      name: "Zoya Merchant",
      email: "zoya@studiomerchant.in",
      phone: "+91 97698 12450",
      tier: "First Visit",
      dietaryNotes: "Vegan tasting inquiry",
      favoriteDish: "Zero-Proof Darjeeling First Flush Spritz",
      baseOrdersCount: 1,
      baseLifetimeSpend: 3400,
      lastVisit: "Today",
    },
  ],
  orders: [
    {
      id: "ord-1042",
      orderNumber: "KOT-1042",
      customerId: "cust-1",
      customerName: "Vikramaditya Kapoor",
      tableId: "tbl-2",
      tableCode: "T-02",
      channel: "Dine-In",
      status: "Preparing",
      paymentMethod: "Card",
      paymentStatus: "Pending",
      items: [
        { menuItemId: "dish-4", name: "48-Hour Braised Lamb Shank Nihari", qty: 2, unitPrice: 2250, notes: "Extra bone-marrow naan" },
        { menuItemId: "dish-2", name: "Truffle Wild Mushroom Galouti", qty: 2, unitPrice: 1180 },
        { menuItemId: "dish-9", name: "Smoked Rosemary & Blood Orange Negroni", qty: 2, unitPrice: 960 },
      ],
      specialInstructions: "Serve starters before mains; VIP anniversary table.",
      assignedStaff: "Kabir Sen",
      createdAt: "19:34",
      updatedAt: "19:42",
    },
    {
      id: "ord-1041",
      orderNumber: "KOT-1041",
      customerId: "cust-2",
      customerName: "Nandini Deshmukh",
      tableId: "tbl-1",
      tableCode: "T-01",
      channel: "Dine-In",
      status: "Ready",
      paymentMethod: "UPI",
      paymentStatus: "Pending",
      items: [
        { menuItemId: "dish-1", name: "Smoked Burrata & Heirloom Tomato Tartine", qty: 1, unitPrice: 950 },
        { menuItemId: "dish-5", name: "Black Garlic & Quinoa Harvest Bowl", qty: 1, unitPrice: 890 },
        { menuItemId: "dish-10", name: "Zero-Proof Darjeeling First Flush Spritz", qty: 2, unitPrice: 540 },
      ],
      specialInstructions: "Strictly nut-free plating (allergen alert).",
      assignedStaff: "Kabir Sen",
      createdAt: "19:20",
      updatedAt: "19:38",
    },
    {
      id: "ord-1040",
      orderNumber: "KOT-1040",
      customerId: "cust-4",
      customerName: "Elena Rostova",
      tableId: "tbl-5",
      tableCode: "C-01",
      channel: "Dine-In",
      status: "New",
      paymentMethod: "Card",
      paymentStatus: "Pending",
      items: [
        { menuItemId: "dish-6", name: "Hamachi Crudo & Yuzu Kosho", qty: 2, unitPrice: 1620 },
        { menuItemId: "dish-3", name: "Charred Malabar Prawns & Curry Leaf Butter", qty: 1, unitPrice: 1850 },
      ],
      specialInstructions: "Chef's counter direct pass.",
      assignedStaff: "Chef Aarav",
      createdAt: "20:06",
      updatedAt: "20:06",
    },
    {
      id: "ord-1039",
      orderNumber: "KOT-1039",
      customerId: "cust-6",
      customerName: "Zoya Merchant",
      tableId: "tbl-7",
      tableCode: "G-01",
      channel: "Dine-In",
      status: "Served",
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      items: [
        { menuItemId: "dish-5", name: "Black Garlic & Quinoa Harvest Bowl", qty: 2, unitPrice: 890 },
        { menuItemId: "dish-7", name: "Saffron Pistachio Mille-Feuille", qty: 2, unitPrice: 780 },
        { menuItemId: "dish-10", name: "Zero-Proof Darjeeling First Flush Spritz", qty: 3, unitPrice: 540 },
      ],
      specialInstructions: "Outdoor heater requested on terrace.",
      assignedStaff: "Rohan Mehta",
      createdAt: "18:50",
      updatedAt: "19:45",
    },
    {
      id: "ord-1038",
      orderNumber: "KOT-1038",
      customerId: "cust-3",
      customerName: "Siddharth Malhotra",
      tableId: null,
      tableCode: "DLV-18",
      channel: "Delivery",
      status: "Served",
      paymentMethod: "Card",
      paymentStatus: "Paid",
      items: [
        { menuItemId: "dish-3", name: "Charred Malabar Prawns & Curry Leaf Butter", qty: 2, unitPrice: 1850 },
        { menuItemId: "dish-2", name: "Truffle Wild Mushroom Galouti", qty: 1, unitPrice: 1180 },
      ],
      specialInstructions: "Thermal insulated packaging.",
      assignedStaff: "Meera Nair",
      createdAt: "18:15",
      updatedAt: "18:55",
    },
    {
      id: "ord-1037",
      orderNumber: "KOT-1037",
      customerId: "cust-5",
      customerName: "Raghavendra Iyer",
      tableId: null,
      tableCode: "PKP-09",
      channel: "Takeaway",
      status: "Served",
      paymentMethod: "Split",
      paymentStatus: "Paid",
      items: [
        { menuItemId: "dish-4", name: "48-Hour Braised Lamb Shank Nihari", qty: 3, unitPrice: 2250 },
        { menuItemId: "dish-7", name: "Saffron Pistachio Mille-Feuille", qty: 3, unitPrice: 780 },
      ],
      specialInstructions: "Separate sauce containers.",
      assignedStaff: "Ananya Rao",
      createdAt: "17:40",
      updatedAt: "18:12",
    },
    {
      id: "ord-1036",
      orderNumber: "KOT-1036",
      customerId: "cust-1",
      customerName: "Vikramaditya Kapoor",
      tableId: null,
      tableCode: "DLV-14",
      channel: "Delivery",
      status: "Served",
      paymentMethod: "Card",
      paymentStatus: "Paid",
      items: [
        { menuItemId: "dish-1", name: "Smoked Burrata & Heirloom Tomato Tartine", qty: 2, unitPrice: 950 },
        { menuItemId: "dish-2", name: "Truffle Wild Mushroom Galouti", qty: 2, unitPrice: 1180 },
      ],
      specialInstructions: "Contactless concierge drop.",
      assignedStaff: "Meera Nair",
      createdAt: "13:20",
      updatedAt: "13:58",
    },
    {
      id: "ord-1035",
      orderNumber: "KOT-1035",
      customerId: "cust-3",
      customerName: "Siddharth Malhotra",
      tableId: "tbl-4",
      tableCode: "T-04",
      channel: "Dine-In",
      status: "Cancelled",
      paymentMethod: "Cash",
      paymentStatus: "Refunded",
      items: [
        { menuItemId: "dish-6", name: "Hamachi Crudo & Yuzu Kosho", qty: 1, unitPrice: 1620 },
      ],
      specialInstructions: "Guest rescheduled to tomorrow evening.",
      assignedStaff: "Meera Nair",
      createdAt: "12:45",
      updatedAt: "12:55",
    },
  ],
  reservations: [
    {
      id: "res-1",
      guestName: "Raghavendra Iyer",
      customerId: "cust-5",
      phone: "+91 98450 31872",
      partySize: 8,
      date: "2026-11-12",
      timeSlot: "20:30",
      tableId: "tbl-9",
      tableCode: "P-01",
      status: "Confirmed",
      occasion: "Board Dinner",
      notes: "Sommelier wine pairing pre-selected.",
    },
    {
      id: "res-2",
      guestName: "Aisha Kulkarni",
      customerId: null,
      phone: "+91 98204 88109",
      partySize: 4,
      date: "2026-11-12",
      timeSlot: "20:15",
      tableId: "tbl-3",
      tableCode: "T-03",
      status: "Confirmed",
      occasion: "Birthday",
      notes: "Bring candle with saffron mille-feuille.",
    },
    {
      id: "res-3",
      guestName: "Vikramaditya Kapoor",
      customerId: "cust-1",
      phone: "+91 98201 44120",
      partySize: 4,
      date: "2026-11-12",
      timeSlot: "19:30",
      tableId: "tbl-2",
      tableCode: "T-02",
      status: "Seated",
      occasion: "Anniversary",
      notes: "Complimentary rosewater amuse-bouche served.",
    },
    {
      id: "res-4",
      guestName: "Nandini Deshmukh",
      customerId: "cust-2",
      phone: "+91 98192 77315",
      partySize: 2,
      date: "2026-11-12",
      timeSlot: "19:15",
      tableId: "tbl-1",
      tableCode: "T-01",
      status: "Seated",
      occasion: "Client Lunch/Dinner",
      notes: "Window salon preferred.",
    },
    {
      id: "res-5",
      guestName: "Devansh Singhal",
      customerId: null,
      phone: "+91 99102 33490",
      partySize: 6,
      date: "2026-11-12",
      timeSlot: "21:15",
      tableId: "tbl-4",
      tableCode: "T-04",
      status: "Confirmed",
      occasion: "Family Reunion",
      notes: "Need high-chair for 1 child.",
    },
    {
      id: "res-6",
      guestName: "Mira Chatterjee",
      customerId: null,
      phone: "+91 98300 41200",
      partySize: 2,
      date: "2026-11-12",
      timeSlot: "18:30",
      tableId: "tbl-6",
      tableCode: "C-02",
      status: "Completed",
      occasion: "Tasting Menu",
      notes: "Completed 5-course menu.",
    },
  ],
  staff: [
    {
      id: "stf-1",
      name: "Chef Aarav Oberoi",
      role: "Executive Chef",
      department: "Culinary",
      shift: "Evening Service",
      status: "On Duty",
      phone: "+91 98200 11001",
      assignedSection: "Hearth & Pass",
    },
    {
      id: "stf-2",
      name: "Ananya Rao",
      role: "Maître D'",
      department: "Floor Service",
      shift: "Evening Service",
      status: "On Duty",
      phone: "+91 98200 11002",
      assignedSection: "Host Stand & Cellar",
    },
    {
      id: "stf-3",
      name: "Kabir Sen",
      role: "Floor Captain",
      department: "Floor Service",
      shift: "Evening Service",
      status: "On Duty",
      phone: "+91 98200 11003",
      assignedSection: "Main Salon",
    },
    {
      id: "stf-4",
      name: "Meera Nair",
      role: "Senior Sommelier",
      department: "Beverage",
      shift: "Evening Service",
      status: "On Duty",
      phone: "+91 98200 11004",
      assignedSection: "Private Cellar",
    },
    {
      id: "stf-5",
      name: "Rohan Mehta",
      role: "Mixologist",
      department: "Beverage",
      shift: "Split Shift",
      status: "On Break",
      phone: "+91 98200 11005",
      assignedSection: "Garden Terrace & Bar",
    },
    {
      id: "stf-6",
      name: "Farhan Qureshi",
      role: "Sous Chef",
      department: "Culinary",
      shift: "Morning Prep",
      status: "Off Duty",
      phone: "+91 98200 11006",
      assignedSection: "Butchery & Sauces",
    },
  ],
  inventory: [
    {
      id: "inv-1",
      name: "Kashmiri Mongra Saffron Threads",
      category: "Dry Pantry",
      unit: "grams",
      stock: 42,
      minPar: 50,
      unitCost: 420,
      supplier: "Pampore Estate Direct",
      lastRestocked: "2 days ago",
    },
    {
      id: "inv-2",
      name: "Artisanal Smoked Burrata (125g balls)",
      category: "Dairy & Truffle",
      unit: "pcs",
      stock: 6,
      minPar: 12,
      unitCost: 310,
      supplier: "Kodaikanal Creamery",
      lastRestocked: "Yesterday",
    },
    {
      id: "inv-3",
      name: "Wild Malabar Tiger Prawns (U-10)",
      category: "Proteins",
      unit: "kg",
      stock: 14.5,
      minPar: 8,
      unitCost: 1650,
      supplier: "Cochin Harbour Select",
      lastRestocked: "Today 09:00",
    },
    {
      id: "inv-4",
      name: "Braised Lamb Shanks (Prime Cut)",
      category: "Proteins",
      unit: "kg",
      stock: 22,
      minPar: 10,
      unitCost: 980,
      supplier: "Deccan Pastures Co.",
      lastRestocked: "Today 08:30",
    },
    {
      id: "inv-5",
      name: "Black Périgord Truffle Butter",
      category: "Dairy & Truffle",
      unit: "kg",
      stock: 2.2,
      minPar: 3,
      unitCost: 5400,
      supplier: "Maison Truffe Import",
      lastRestocked: "4 days ago",
    },
    {
      id: "inv-6",
      name: "Heirloom Cherry Tomatoes (Vine)",
      category: "Produce",
      unit: "kg",
      stock: 16,
      minPar: 8,
      unitCost: 260,
      supplier: "Sahyadri Hydroponics",
      lastRestocked: "Today 07:45",
    },
    {
      id: "inv-7",
      name: "Darjeeling First Flush Tea Leaves",
      category: "Cellar",
      unit: "kg",
      stock: 4.5,
      minPar: 2,
      unitCost: 2900,
      supplier: "Margaret's Hope Estate",
      lastRestocked: "5 days ago",
    },
    {
      id: "inv-8",
      name: "Single-Origin 70% Idukki Couverture",
      category: "Dry Pantry",
      unit: "kg",
      stock: 1.5,
      minPar: 4,
      unitCost: 1450,
      supplier: "Malabar Bean Roasters",
      lastRestocked: "6 days ago",
    },
  ],
  activityLog: [
    {
      id: "act-1",
      timestamp: "20:06",
      actor: "Chef Aarav",
      summary: "New KOT-1040 received for Chef's Counter (C-01) — Hamachi Crudo & Prawns",
      module: "Orders",
    },
    {
      id: "act-2",
      timestamp: "19:45",
      actor: "Rohan Mehta",
      summary: "Settled KOT-1039 for Zoya Merchant (G-01) via UPI",
      module: "Orders",
    },
    {
      id: "act-3",
      timestamp: "19:38",
      actor: "Hot Line",
      summary: "KOT-1041 plated and marked Ready for T-01 pickup",
      module: "Kitchen",
    },
    {
      id: "act-4",
      timestamp: "19:30",
      actor: "Ananya Rao",
      summary: "Seated VIP party Vikramaditya Kapoor at Table T-02",
      module: "Reservations",
    },
    {
      id: "act-5",
      timestamp: "18:40",
      actor: "Inventory Guard",
      summary: "Low stock alert triggered for Artisanal Smoked Burrata (6 / 12 par)",
      module: "Inventory",
    },
  ],
};

export interface ComputedPilotMetrics {
  grossRevenue: number;
  netRevenueExclTax: number;
  activeOrdersCount: number;
  servedOrdersCount: number;
  cancelledOrdersCount: number;
  averageTicket: number;
  occupiedTables: number;
  totalTables: number;
  occupancyPct: number;
  lowStockItems: PilotInventoryItem[];
  popularDishes: {
    menuItemId: string;
    name: string;
    categoryName: string;
    unitsSold: number;
    revenue: number;
  }[];
  revenueByCategory: {
    categoryId: string;
    categoryName: string;
    revenue: number;
    sharePct: number;
  }[];
  revenueByChannel: {
    channel: OrderChannel;
    orders: number;
    revenue: number;
  }[];
  revenueByPayment: {
    method: PaymentMethod;
    orders: number;
    revenue: number;
  }[];
  servicePeriods: {
    label: string;
    revenue: number;
    orders: number;
  }[];
}

export function getOrderTotals(
  order: Pick<PilotOrder, "items">,
  settings: Pick<PilotRestaurantSettings, "gstRatePercent" | "serviceChargePercent">
) {
  const subtotal = order.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const serviceCharge = Math.round((subtotal * settings.serviceChargePercent) / 100);
  const tax = Math.round(((subtotal + serviceCharge) * settings.gstRatePercent) / 100);
  const total = subtotal + serviceCharge + tax;
  return { subtotal, serviceCharge, tax, total };
}

export function computePilotMetrics(state: RestaurantPilotState): ComputedPilotMetrics {
  const billableOrders = state.orders.filter((o) => o.status !== "Cancelled");
  const activeOrders = state.orders.filter((o) => o.status !== "Served" && o.status !== "Cancelled");
  const servedOrders = state.orders.filter((o) => o.status === "Served");
  const cancelledOrders = state.orders.filter((o) => o.status === "Cancelled");

  let grossRevenue = 0;
  let netRevenueExclTax = 0;

  const dishStats = new Map<string, { name: string; unitsSold: number; revenue: number }>();
  const channelMap = new Map<OrderChannel, { orders: number; revenue: number }>([
    ["Dine-In", { orders: 0, revenue: 0 }],
    ["Takeaway", { orders: 0, revenue: 0 }],
    ["Delivery", { orders: 0, revenue: 0 }],
  ]);
  const paymentMap = new Map<PaymentMethod, { orders: number; revenue: number }>([
    ["Card", { orders: 0, revenue: 0 }],
    ["UPI", { orders: 0, revenue: 0 }],
    ["Cash", { orders: 0, revenue: 0 }],
    ["Split", { orders: 0, revenue: 0 }],
  ]);

  const catNameById = new Map(state.categories.map((c) => [c.id, c.name]));
  const dishCatById = new Map(state.menuItems.map((m) => [m.id, m.categoryId]));
  const categoryRevenueMap = new Map<string, number>();

  for (const ord of billableOrders) {
    const totals = getOrderTotals(ord, state.settings);
    grossRevenue += totals.total;
    netRevenueExclTax += totals.subtotal;

    const ch = channelMap.get(ord.channel);
    if (ch) {
      ch.orders += 1;
      ch.revenue += totals.total;
    }

    const pm = paymentMap.get(ord.paymentMethod);
    if (pm) {
      pm.orders += 1;
      pm.revenue += totals.total;
    }

    for (const item of ord.items) {
      const lineTotal = item.qty * item.unitPrice;
      const existingDish = dishStats.get(item.menuItemId) || {
        name: item.name,
        unitsSold: 0,
        revenue: 0,
      };
      existingDish.unitsSold += item.qty;
      existingDish.revenue += lineTotal;
      dishStats.set(item.menuItemId, existingDish);

      const catId = dishCatById.get(item.menuItemId) || "uncategorized";
      categoryRevenueMap.set(catId, (categoryRevenueMap.get(catId) || 0) + lineTotal);
    }
  }

  const popularDishes = Array.from(dishStats.entries())
    .map(([menuItemId, stat]) => ({
      menuItemId,
      name: stat.name,
      categoryName: catNameById.get(dishCatById.get(menuItemId) || "") || "Specials",
      unitsSold: stat.unitsSold,
      revenue: stat.revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const totalCategoryRev = Array.from(categoryRevenueMap.values()).reduce((s, v) => s + v, 0) || 1;
  const revenueByCategory = state.categories.map((cat) => {
    const rev = categoryRevenueMap.get(cat.id) || 0;
    return {
      categoryId: cat.id,
      categoryName: cat.name,
      revenue: rev,
      sharePct: Math.round((rev / totalCategoryRev) * 100),
    };
  });

  const occupiedTables = state.tables.filter((t) => t.status === "Occupied").length;
  const totalTables = state.tables.length || 1;

  const multiplier = state.settings.lowStockDefaultMultiplier || 1;
  const lowStockItems = state.inventory.filter((item) => item.stock <= item.minPar * multiplier);

  // Derive intra-day service buckets cleanly from order timestamps
  const bucketDefs = [
    { label: "Lunch (12–15)", match: (t: string) => parseInt(t.slice(0, 2), 10) < 16 },
    { label: "Twilight (16–18)", match: (t: string) => { const h = parseInt(t.slice(0, 2), 10); return h >= 16 && h < 19; } },
    { label: "Early Dinner (19)", match: (t: string) => t.startsWith("19") },
    { label: "Peak Dinner (20+)", match: (t: string) => parseInt(t.slice(0, 2), 10) >= 20 },
  ];

  const servicePeriods = bucketDefs.map((b) => {
    const matched = billableOrders.filter((o) => b.match(o.createdAt));
    return {
      label: b.label,
      orders: matched.length,
      revenue: matched.reduce((sum, o) => sum + getOrderTotals(o, state.settings).total, 0),
    };
  });

  return {
    grossRevenue,
    netRevenueExclTax,
    activeOrdersCount: activeOrders.length,
    servedOrdersCount: servedOrders.length,
    cancelledOrdersCount: cancelledOrders.length,
    averageTicket: billableOrders.length ? Math.round(grossRevenue / billableOrders.length) : 0,
    occupiedTables,
    totalTables: state.tables.length,
    occupancyPct: Math.round((occupiedTables / totalTables) * 100),
    lowStockItems,
    popularDishes,
    revenueByCategory,
    revenueByChannel: Array.from(channelMap.entries()).map(([channel, d]) => ({ channel, ...d })),
    revenueByPayment: Array.from(paymentMap.entries()).map(([method, d]) => ({ method, ...d })),
    servicePeriods,
  };
}
