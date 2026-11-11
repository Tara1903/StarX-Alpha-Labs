# PHASE 11G — CUSTOMER PORTAL REPORT
## Client Online Payment Experience
**Route:** `/customer` -> `Invoices & Quotes`  
**Date:** November 11, 2026

---

### 1. Client Payment Workflow
Clients accessing their invoice list in `/customer` have an intuitive, streamlined online payment option:

1. **Direct Initiation:**
   - On any invoice with an outstanding balance, a prominent **"Pay via UPI"** button is displayed.
2. **Server-Validated Session:**
   - Clicking the button calls `POST /api/customer/payments/initiate`.
   - The backend validates the client's membership in the invoice's organization and creates a gateway order for the exact outstanding balance.
3. **Dynamic Payment Modal:**
   - Displays invoice number, client organization, and amount payable.
   - Shows dynamic UPI QR code rendered on-the-fly.
   - **Mobile Deep-Link:** "Open in UPI Mobile App" button immediately triggers installed UPI applications (Google Pay, PhonePe, Paytm, CRED, BHIM) via `upi://pay` URI intent.
   - **Hosted Gateway Link:** Direct link to open the hosted checkout page.
   - **Status Check:** "I have paid" button allowing client to check real-time settlement status.

---

### 2. Multi-Tenant Protection
- Clients can only initiate payments for invoices belonging to their own organization.
- Cross-organization invoice lookups return HTTP 403 Forbidden.
- Invoices cannot be marked paid by frontend redirects or client-supplied status parameters.
