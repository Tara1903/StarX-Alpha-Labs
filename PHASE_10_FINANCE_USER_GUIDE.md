# PHASE 10 FINANCE USER GUIDE
## STARX ALPHA LABS — COMMERCIAL WORKFLOW & DESK OPERATIONS MANUAL
**Date:** November 11, 2026

---

### 1. Overview
The StarX Alpha Labs Finance Desk manages formal customer commercial interactions from lead conversion through quotation, invoicing, manual payment verification, and project closure.

---

### 2. Administrator Workflows (`/admin`)

#### Workflow 1: Creating & Issuing a Formal Quotation
1. Navigate to `/admin` and click **Commercial -> Quotations** in the sidebar.
2. Click **Create Quotation**.
3. Select an existing client organization or enter custom client business details.
4. Choose the division (`StarX Systems`, `StarX Digital`, `StarX AI Solutions`).
5. Add scope line items (e.g., *Frontend Web Architecture*, *Backend API & Database*, *Cloud Deployment*).
6. Set any applicable discount and validity window (default 30 days).
7. Click **Save Quotation**. The quotation is assigned a sequential tracking number (`QTN-2026-XXXX`).
8. When ready, click **Approve & Send** to publish the proposal to the client's Customer Portal.

#### Workflow 2: Issuing a Sequential Tax Invoice
1. In `/admin`, click **Invoices**.
2. Click **New Invoice**.
3. Select the client organization and linked project/quotation.
4. Specify invoice line items, issue date, and payment due date.
5. Click **Issue Invoice**. The system reserves a gapless identifier via `get_next_invoice_number()` (`INV-2026-XXXX`) and applies 18% GST.
6. The invoice immediately appears in the client's Customer Portal with full payment instructions.

#### Workflow 3: Verifying an Offline Payment (Bank UTR)
1. When a client transfers funds and enters a UTR number, a notification appears under **Payments Desk**.
2. Open **Commercial -> Payments Desk**.
3. Review the pending payment:
   - Check the Client Name, Invoice Number, Amount Paid, and the UTR Reference Number.
4. Verify the credit entry in StarX Alpha Labs' bank account ledger.
5. Click **Verify Payment**:
   - The payment record status transitions to `verified`.
   - The PostgreSQL trigger automatically deducts the payment from `outstanding_balance` on the invoice.
   - If the balance reaches zero, the invoice status changes to `paid`.

#### Workflow 4: Recording Operational Expenses
1. In `/admin`, select **Commercial -> Expenses**.
2. Click **Record Expense**.
3. Select the category (e.g. `cloud_infra`, `software_license`, `domain_ssl`), amount, vendor, and link to an active client project.
4. Mark as approved to update net project margin calculations.

---

### 3. Client Portal Workflows (`/customer`)

#### Workflow 1: Reviewing & Accepting a Proposal
1. Log in to the Client Portal (`/customer/login`).
2. Click **Invoices & Quotes** in the sidebar, and switch to the **Quotations** tab.
3. Review the itemized scope breakdown, timeline, and commercial terms.
4. Click **Accept Quotation** to digitally execute the agreement, or **Request Revision** to ask for adjustments.

#### Workflow 2: Paying an Invoice via Direct Bank Transfer
1. Open the **Invoices** tab in `/customer`.
2. Locate the outstanding invoice and click the **Eye icon** to view the printable tax invoice with StarX Alpha Labs GSTIN and bank coordinates.
3. Switch to the **Bank Payment Details** tab and copy StarX Alpha Labs' Account Number and IFSC.
4. Execute the transfer via corporate NetBanking or UPI.
5. Return to the invoice row and click **Submit UTR**. Enter the UTR/transaction reference and date.
6. Once the StarX finance desk verifies the deposit, your invoice reflects **Paid** status.
