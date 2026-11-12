export type DiningZone = "Main Dining" | "Chef's Counter" | "Atrium Patio";
export type TableStateStatus = "Available" | "Seated" | "Entrée Fired" | "Check Dropped" | "Cleaning";
export type KitchenStation = "Grill" | "Sauté" | "Cold Bar" | "Pastry";

export interface VesperaTable {
  id: string;
  code: string;
  zone: DiningZone;
  seats: number;
  status: TableStateStatus;
  guestName?: string;
  partySize?: number;
  serverName?: string;
  elapsedMinutes: number;
  activeCheckId?: string;
}

export interface VesperaMenuItem {
  id: string;
  name: string;
  category: "Starters" | "Woodfire Mains" | "Sides & Pasta" | "Desserts" | "Cellar & Cocktails";
  station: KitchenStation;
  price: number;
  recipeCost: number;
  prepMinutes: number;
  inStock: boolean;
  tags: string[];
}

export interface VesperaOrderLine {
  itemId: string;
  name: string;
  station: KitchenStation;
  qty: number;
  unitPrice: number;
  note?: string;
  bumped?: boolean;
}

export interface VesperaCheck {
  id: string;
  ticketNumber: string;
  tableId: string;
  tableCode: string;
  guestName: string;
  serverName: string;
  status: "Open" | "Firing" | "Ready" | "Settled" | "Void";
  paymentMethod?: "Card" | "UPI" | "Cash";
  discountPct: number;
  createdAt: string;
  elapsedLabel: string;
  courseLabel: string;
  lines: VesperaOrderLine[];
}

export interface VesperaPantryItem {
  id: string;
  name: string;
  unit: string;
  onHand: number;
  parLevel: number;
  unitCost: number;
  supplier: string;
  is86Risk: boolean;
}

export interface VesperaStaffMember {
  id: string;
  name: string;
  role: string;
  department: "Front of House" | "Kitchen Brigade" | "Bar & Cellar";
  zoneOrStation: string;
  shift: string;
  onDuty: boolean;
}

export interface VesperaBistroState {
  restaurantName: string;
  serviceName: string;
  tables: VesperaTable[];
  menuItems: VesperaMenuItem[];
  checks: VesperaCheck[];
  pantry: VesperaPantryItem[];
  staff: VesperaStaffMember[];
}

export const VESPERA_BISTRO_SEED: VesperaBistroState = {
  restaurantName: "Vespera Bistro",
  serviceName: "Dinner Service S2",
  tables: [
    { id: "vt-1", code: "T01", zone: "Main Dining", seats: 4, status: "Entrée Fired", guestName: "Moretti Party", partySize: 4, serverName: "Marco V.", elapsedMinutes: 38, activeCheckId: "chk-1042" },
    { id: "vt-2", code: "T02", zone: "Main Dining", seats: 4, status: "Available", elapsedMinutes: 6 },
    { id: "vt-3", code: "T03", zone: "Main Dining", seats: 2, status: "Check Dropped", guestName: "Chen & Guest", partySize: 2, serverName: "Chloe T.", elapsedMinutes: 54, activeCheckId: "chk-1038" },
    { id: "vt-4", code: "T04", zone: "Main Dining", seats: 6, status: "Check Dropped", guestName: "Vance VIP Party", partySize: 6, serverName: "Elena V.", elapsedMinutes: 78, activeCheckId: "chk-1039" },
    { id: "vt-5", code: "B01", zone: "Chef's Counter", seats: 2, status: "Seated", guestName: "Kulkarni Flight", partySize: 2, serverName: "Liam S.", elapsedMinutes: 22, activeCheckId: "chk-1045" },
    { id: "vt-6", code: "B02", zone: "Chef's Counter", seats: 2, status: "Available", elapsedMinutes: 0 },
    { id: "vt-7", code: "B03", zone: "Chef's Counter", seats: 2, status: "Entrée Fired", guestName: "Mehta Tasting", partySize: 2, serverName: "Liam S.", elapsedMinutes: 31, activeCheckId: "chk-1046" },
    { id: "vt-8", code: "B04", zone: "Chef's Counter", seats: 2, status: "Cleaning", elapsedMinutes: 5 },
    { id: "vt-9", code: "P01", zone: "Atrium Patio", seats: 4, status: "Entrée Fired", guestName: "Avery & Co.", partySize: 3, serverName: "Chloe T.", elapsedMinutes: 19, activeCheckId: "chk-1047" },
    { id: "vt-10", code: "P02", zone: "Atrium Patio", seats: 2, status: "Available", elapsedMinutes: 0 },
    { id: "vt-11", code: "P03", zone: "Atrium Patio", seats: 4, status: "Seated", guestName: "Delgado Party", partySize: 4, serverName: "Marco V.", elapsedMinutes: 14, activeCheckId: "chk-1048" },
    { id: "vt-12", code: "P04", zone: "Atrium Patio", seats: 6, status: "Available", elapsedMinutes: 0 },
  ],
  menuItems: [
    { id: "vm-1", name: "Dry-Aged Duck Breast", category: "Woodfire Mains", station: "Grill", price: 1450, recipeCost: 420, prepMinutes: 18, inStock: true, tags: ["Signature", "GF"] },
    { id: "vm-2", name: "Woodfired Black Cod", category: "Woodfire Mains", station: "Grill", price: 1680, recipeCost: 510, prepMinutes: 16, inStock: true, tags: ["Coastal"] },
    { id: "vm-3", name: "Black Truffle Agnolotti", category: "Sides & Pasta", station: "Sauté", price: 980, recipeCost: 230, prepMinutes: 11, inStock: true, tags: ["Vegetarian"] },
    { id: "vm-4", name: "Oysters Mignonette (6pc)", category: "Starters", station: "Cold Bar", price: 1120, recipeCost: 390, prepMinutes: 6, inStock: true, tags: ["Raw Bar"] },
    { id: "vm-5", name: "Prime Beef Tartare", category: "Starters", station: "Cold Bar", price: 940, recipeCost: 280, prepMinutes: 8, inStock: true, tags: ["GF"] },
    { id: "vm-6", name: "Soufflé aux Morilles", category: "Desserts", station: "Pastry", price: 690, recipeCost: 145, prepMinutes: 15, inStock: true, tags: ["Sweet"] },
    { id: "vm-7", name: "Hamachi Crudo & Yuzu", category: "Starters", station: "Cold Bar", price: 1050, recipeCost: 350, prepMinutes: 7, inStock: false, tags: ["86'd Tonight"] },
    { id: "vm-8", name: "Barolo Riserva 2018 (Glass)", category: "Cellar & Cocktails", station: "Cold Bar", price: 1250, recipeCost: 410, prepMinutes: 2, inStock: true, tags: ["Reserve"] },
  ],
  checks: [
    {
      id: "chk-1042",
      ticketNumber: "#1042",
      tableId: "vt-1",
      tableCode: "T01",
      guestName: "Moretti Party",
      serverName: "Marco V.",
      status: "Firing",
      discountPct: 0,
      createdAt: "19:42",
      elapsedLabel: "14:20",
      courseLabel: "Mains Firing",
      lines: [
        { itemId: "vm-1", name: "Dry-Aged Duck Breast", station: "Grill", qty: 2, unitPrice: 1450, note: "Med-Rare, sub cherry jus", bumped: false },
        { itemId: "vm-2", name: "Woodfired Black Cod", station: "Grill", qty: 1, unitPrice: 1680, bumped: true },
        { itemId: "vm-3", name: "Black Truffle Agnolotti", station: "Sauté", qty: 1, unitPrice: 980, bumped: false },
      ],
    },
    {
      id: "chk-1045",
      ticketNumber: "#1045",
      tableId: "vt-5",
      tableCode: "B01",
      guestName: "Kulkarni Flight",
      serverName: "Liam S.",
      status: "Open",
      discountPct: 0,
      createdAt: "20:02",
      elapsedLabel: "04:15",
      courseLabel: "Course 1 Cold",
      lines: [
        { itemId: "vm-4", name: "Oysters Mignonette (6pc)", station: "Cold Bar", qty: 1, unitPrice: 1120, note: "Extra shallot vinegar", bumped: false },
        { itemId: "vm-5", name: "Prime Beef Tartare", station: "Cold Bar", qty: 1, unitPrice: 940, bumped: false },
      ],
    },
    {
      id: "chk-1039",
      ticketNumber: "#1039",
      tableId: "vt-4",
      tableCode: "T04",
      guestName: "Vance VIP Party",
      serverName: "Elena V.",
      status: "Firing",
      discountPct: 0,
      createdAt: "19:18",
      elapsedLabel: "22:40",
      courseLabel: "Dessert Hold",
      lines: [
        { itemId: "vm-6", name: "Soufflé aux Morilles", station: "Pastry", qty: 2, unitPrice: 690, note: "Bake +18m", bumped: false },
        { itemId: "vm-8", name: "Barolo Riserva 2018 (Glass)", station: "Cold Bar", qty: 4, unitPrice: 1250, bumped: true },
      ],
    },
    {
      id: "chk-1038",
      ticketNumber: "#1038",
      tableId: "vt-3",
      tableCode: "T03",
      guestName: "Chen & Guest",
      serverName: "Chloe T.",
      status: "Ready",
      discountPct: 0,
      createdAt: "19:10",
      elapsedLabel: "09:10",
      courseLabel: "Check Dropped",
      lines: [
        { itemId: "vm-2", name: "Woodfired Black Cod", station: "Grill", qty: 2, unitPrice: 1680, bumped: true },
        { itemId: "vm-8", name: "Barolo Riserva 2018 (Glass)", station: "Cold Bar", qty: 2, unitPrice: 1250, bumped: true },
      ],
    },
    {
      id: "chk-1046",
      ticketNumber: "#1046",
      tableId: "vt-7",
      tableCode: "B03",
      guestName: "Mehta Tasting",
      serverName: "Liam S.",
      status: "Firing",
      discountPct: 0,
      createdAt: "19:50",
      elapsedLabel: "11:05",
      courseLabel: "Course 2 Warm",
      lines: [
        { itemId: "vm-3", name: "Black Truffle Agnolotti", station: "Sauté", qty: 2, unitPrice: 980, bumped: false },
      ],
    },
    {
      id: "chk-1047",
      ticketNumber: "#1047",
      tableId: "vt-9",
      tableCode: "P01",
      guestName: "Avery & Co.",
      serverName: "Chloe T.",
      status: "Settled",
      paymentMethod: "Card",
      discountPct: 0,
      createdAt: "18:35",
      elapsedLabel: "Settled",
      courseLabel: "Completed",
      lines: [
        { itemId: "vm-1", name: "Dry-Aged Duck Breast", station: "Grill", qty: 2, unitPrice: 1450, bumped: true },
        { itemId: "vm-6", name: "Soufflé aux Morilles", station: "Pastry", qty: 2, unitPrice: 690, bumped: true },
      ],
    },
    {
      id: "chk-1048",
      ticketNumber: "#1048",
      tableId: "vt-11",
      tableCode: "P03",
      guestName: "Delgado Party",
      serverName: "Marco V.",
      status: "Open",
      discountPct: 0,
      createdAt: "20:08",
      elapsedLabel: "03:45",
      courseLabel: "Starters",
      lines: [
        { itemId: "vm-4", name: "Oysters Mignonette (6pc)", station: "Cold Bar", qty: 2, unitPrice: 1120, bumped: false },
      ],
    },
  ],
  pantry: [
    { id: "vp-1", name: "Dry-Aged Duck Breast", unit: "portions", onHand: 4, parLevel: 18, unitCost: 340, supplier: "Heritage Farms", is86Risk: true },
    { id: "vp-2", name: "Fresh Hamachi Loin", unit: "kg", onHand: 0, parLevel: 5, unitCost: 1950, supplier: "Kuroshio Imports", is86Risk: true },
    { id: "vp-3", name: "Barolo Riserva 2018", unit: "bottles", onHand: 3, parLevel: 12, unitCost: 4200, supplier: "Vino Classico", is86Risk: true },
    { id: "vp-4", name: "Black Perigord Truffle", unit: "grams", onHand: 190, parLevel: 250, unitCost: 48, supplier: "Lyon Truffles", is86Risk: false },
    { id: "vp-5", name: "Cultured Normandy Butter", unit: "kg", onHand: 11, parLevel: 10, unitCost: 780, supplier: "Dairy Craft", is86Risk: false },
  ],
  staff: [
    { id: "vs-1", name: "Elena Vance", role: "Sommelier & Floor Lead", department: "Front of House", zoneOrStation: "Main Dining + VIP", shift: "17:00 – 00:00", onDuty: true },
    { id: "vs-2", name: "Chef Kabir Oberoi", role: "Executive Sous Chef", department: "Kitchen Brigade", zoneOrStation: "Grill & Pass", shift: "15:00 – 23:30", onDuty: true },
    { id: "vs-3", name: "Marco Visconti", role: "Senior Captain", department: "Front of House", zoneOrStation: "Main Dining", shift: "17:30 – 23:30", onDuty: true },
    { id: "vs-4", name: "Chloe Tan", role: "Patio Lead Server", department: "Front of House", zoneOrStation: "Atrium Patio", shift: "18:00 – 00:00", onDuty: true },
    { id: "vs-5", name: "Liam Singh", role: "Chef's Counter Lead", department: "Bar & Cellar", zoneOrStation: "Cold Bar / Tasting", shift: "17:30 – 00:00", onDuty: true },
    { id: "vs-6", name: "Ananya Deshmukh", role: "Head Pastry Chef", department: "Kitchen Brigade", zoneOrStation: "Pastry Station", shift: "14:00 – 22:30", onDuty: true },
  ],
};

export function calcCheckFinancials(check: VesperaCheck) {
  const subtotal = check.lines.reduce((acc, l) => acc + l.unitPrice * l.qty, 0);
  const discount = Math.round((subtotal * (check.discountPct || 0)) / 100);
  const discounted = Math.max(0, subtotal - discount);
  const gst = Math.round(discounted * 0.05);
  const total = discounted + gst;
  return { subtotal, discount, gst, total };
}
