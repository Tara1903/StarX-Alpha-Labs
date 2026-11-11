# PHASE 10 FINANCIAL PERMISSION MATRIX
## STARX ALPHA LABS — ROLE-BASED ACCESS CONTROL FOR COMMERCIAL OPERATIONS
**Date:** November 11, 2026

---

### 1. Role Definitions
- **Platform Owner (`owner`)**: Full authority over company commercial settings, bank account coordinates, tax configuration, write-offs, financial logs, and member provisioning.
- **Administrator (`admin`)**: Can create quotations, issue invoices, record payments, verify offline transfers, approve expenses, and generate reports. Cannot modify master bank settings.
- **Editor (`editor`)**: Read-only visibility into operational overview, client proposals, and invoices. Cannot issue invoices, verify payments, or alter financial data.
- **Client Organization Owner/Member (`client`)**: Authenticated client workspace access. Can only view financial records belonging to their assigned `organization_id`. Can accept/reject quotes and submit payment reference UTRs.
- **Public / Unauthenticated**: Zero access to any financial records, invoices, or quotes.

---

### 2. Permissions Matrix

| Commercial Capability | Platform Owner | Admin | Editor | Client Org Member | Public / Unauth |
|---|:---:|:---:|:---:|:---:|:---:|
| **View Financial Dashboard & KPIs** | Full | Full | Read-only | None | None |
| **Create & Revise Quotations** | Yes | Yes | No | No | No |
| **Accept / Reject Quotation** | No (Internal) | No (Internal) | No | Yes (Own Org) | No |
| **Issue Sequential Tax Invoices** | Yes | Yes | No | No | No |
| **View Invoices & Print PDF** | Yes | Yes | Read-only | Yes (Own Org) | No |
| **Record Manual Payments** | Yes | Yes | No | No | No |
| **Submit Offline UTR / Ref Number** | Yes | Yes | No | Yes (Own Org) | No |
| **Verify Bank Payment Records** | Yes | Yes | No | No | No |
| **Issue Credit Notes & Adjustments** | Yes | Yes | No | No | No |
| **Log Operational Expenses** | Yes | Yes | No | No | No |
| **Approve Operational Expenses** | Yes | Yes | No | No | No |
| **Export Financial CSV Reports** | Yes | Yes | No | No | No |
| **Edit Bank Instructions & GSTIN** | Yes | No | No | No | No |
| **Inspect Immutable Audit Logs** | Yes | Read-only | No | None | None |

---

### 3. Database Row-Level Security (RLS) Enforcement

- **`finance_settings`**:
  - `SELECT`: `auth.role() = 'service_role' OR public.is_admin() OR auth.uid() IN (SELECT user_id FROM client_members)`
  - `UPDATE`: `auth.role() = 'service_role' OR public.is_owner()`
- **`invoices` & `quotations`**:
  - `ALL (Admin)`: `auth.role() = 'service_role' OR public.is_admin()`
  - `SELECT (Client)`: `public.is_client_member_of_org(organization_id)`
- **`payment_records`**:
  - `ALL (Admin)`: `auth.role() = 'service_role' OR public.is_admin()`
  - `SELECT (Client)`: `public.is_client_member_of_org(organization_id)`
  - `INSERT (Client UTR Notice)`: `public.is_client_member_of_org(organization_id) AND verification_status = 'pending'`
- **`expenses` & `finance_audit_logs`**:
  - `ALL (Admin)`: `auth.role() = 'service_role' OR public.is_admin()`
  - `Client`: Zero access (`USING (false)`).
