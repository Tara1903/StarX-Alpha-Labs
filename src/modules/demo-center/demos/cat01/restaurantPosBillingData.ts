export interface PosMenuTile {
  id: string;
  name: string;
  category: "Signature Plates" | "Woodfired Pizza" | "Dim Sum" | "Craft Mocktails" | "Desserts";
  price: number;
  veg: boolean;
  code: string;
  inStock: boolean;
}

export interface PosOrderItem {
  itemId: string;
  name: string;
  price: number;
  qty: number;
  modifier?: string;
}

export interface PosOpenOrder {
  id: string;
  label: string;
  channel: "Dine-In" | "Bar" | "Takeaway";
  guestCount: number;
  course: "Course 1" | "Course 2" | "All At Once";
  discountPct: number;
  serviceChargePct: number;
  held: boolean;
  items: PosOrderItem[];
}

export interface PosSettledReceipt {
  id: string;
  invoiceNo: string;
  tableLabel: string;
  tender: "UPI" | "Card" | "Cash" | "Split";
  total: number;
  gstAmount: number;
  settledAt: string;
}

export interface RestaurantPosState {
  shiftCode: string;
  cashierName: string;
  openingFloat: number;
  menu: PosMenuTile[];
  openChecks: PosOpenOrder[];
  activeCheckId: string;
  settledReceipts: PosSettledReceipt[];
}

export const KWICKBILL_POS_SEED: RestaurantPosState = {
  shiftCode: "REG-01 • SHIFT B",
  cashierName: "Aarav Mehta",
  openingFloat: 5000,
  activeCheckId: "pos-t04",
  menu: [
    { id: "pm-1", name: "Butter Garlic Prawns", category: "Signature Plates", price: 680, veg: false, code: "SIG-01", inStock: true },
    { id: "pm-2", name: "Charred Paneer Tikka", category: "Signature Plates", price: 460, veg: true, code: "SIG-02", inStock: true },
    { id: "pm-3", name: "Truffle Mushroom Pizza", category: "Woodfired Pizza", price: 740, veg: true, code: "PIZ-01", inStock: true },
    { id: "pm-4", name: "Pepperoni Burrata 12\"", category: "Woodfired Pizza", price: 890, veg: false, code: "PIZ-02", inStock: true },
    { id: "pm-5", name: "Crystal Jade Dumplings", category: "Dim Sum", price: 420, veg: true, code: "DIM-01", inStock: true },
    { id: "pm-6", name: "Prawn Hargow (4pc)", category: "Dim Sum", price: 540, veg: false, code: "DIM-02", inStock: true },
    { id: "pm-7", name: "Yuzu Basil Spritz", category: "Craft Mocktails", price: 290, veg: true, code: "BEV-01", inStock: true },
    { id: "pm-8", name: "Cold Brew Tonic", category: "Craft Mocktails", price: 260, veg: true, code: "BEV-02", inStock: true },
    { id: "pm-9", name: "Warm Hazelnut Tart", category: "Desserts", price: 380, veg: true, code: "DES-01", inStock: true },
    { id: "pm-10", name: "Saffron Pistachio Kulfi", category: "Desserts", price: 310, veg: true, code: "DES-02", inStock: true },
  ],
  openChecks: [
    {
      id: "pos-t04",
      label: "Table T-04",
      channel: "Dine-In",
      guestCount: 4,
      course: "Course 2",
      discountPct: 0,
      serviceChargePct: 5,
      held: false,
      items: [
        { itemId: "pm-3", name: "Truffle Mushroom Pizza", price: 740, qty: 1, modifier: "Extra arugula" },
        { itemId: "pm-1", name: "Butter Garlic Prawns", price: 680, qty: 2 },
        { itemId: "pm-7", name: "Yuzu Basil Spritz", price: 290, qty: 2 },
      ],
    },
    {
      id: "pos-b02",
      label: "Bar Stool B-02",
      channel: "Bar",
      guestCount: 2,
      course: "All At Once",
      discountPct: 10,
      serviceChargePct: 0,
      held: false,
      items: [
        { itemId: "pm-6", name: "Prawn Hargow (4pc)", price: 540, qty: 1 },
        { itemId: "pm-8", name: "Cold Brew Tonic", price: 260, qty: 2 },
      ],
    },
    {
      id: "pos-tw18",
      label: "Counter #18",
      channel: "Takeaway",
      guestCount: 1,
      course: "All At Once",
      discountPct: 0,
      serviceChargePct: 0,
      held: true,
      items: [
        { itemId: "pm-2", name: "Charred Paneer Tikka", price: 460, qty: 1, modifier: "Mint chutney extra" },
      ],
    },
  ],
  settledReceipts: [
    { id: "rcp-1", invoiceNo: "INV-8841", tableLabel: "Table T-01", tender: "UPI", total: 2480, gstAmount: 118, settledAt: "19:14" },
    { id: "rcp-2", invoiceNo: "INV-8842", tableLabel: "Counter #14", tender: "Cash", total: 960, gstAmount: 46, settledAt: "19:38" },
    { id: "rcp-3", invoiceNo: "INV-8843", tableLabel: "Table T-06", tender: "Card", total: 4190, gstAmount: 200, settledAt: "20:05" },
  ],
};

export function calcPosReceiptTotals(check: PosOpenOrder | undefined) {
  if (!check) return { subtotal: 0, discount: 0, serviceCharge: 0, gst: 0, total: 0 };
  const subtotal = check.items.reduce((s, it) => s + it.price * it.qty, 0);
  const discount = Math.round((subtotal * (check.discountPct || 0)) / 100);
  const afterDiscount = Math.max(0, subtotal - discount);
  const serviceCharge = Math.round((afterDiscount * (check.serviceChargePct || 0)) / 100);
  const gst = Math.round(afterDiscount * 0.05);
  const total = afterDiscount + serviceCharge + gst;
  return { subtotal, discount, serviceCharge, gst, total };
}
