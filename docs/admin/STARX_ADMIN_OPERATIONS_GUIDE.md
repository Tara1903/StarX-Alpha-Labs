# STARX ALPHA LABS — ADMIN OPERATIONS GUIDE

**Project:** StarX Alpha Labs  
**Website:** https://www.starxalphalabs.online/  
**Tagline:** Build Smarter. Lead Tomorrow.  
**Audience:** Internal Operations, Technical Leads, Account Executives, System Administrators  
**Date:** 18 November 2026

---

## 1. Introduction & Operational Philosophy

The StarX Alpha Labs Admin Centre is the commercial and engineering bridge between prospective clients and our software delivery squads. Every customer enquiry represents a verified requirement initiated through our interactive discovery tools or Google Stitch AI generation engine.

### Core Rules of Engagement:
1. **First Response SLA:** Contact new inbound enquiries within **2 business hours** of submission.
2. **Mandatory Outcome Logging:** Never assume a lead is contacted because a dialer or chat was opened. Every interaction must be logged with a concrete business outcome.
3. **Engineering Integrity:** Never alter the client's stated requirements. Record feasibility observations, architectural choices, and risks exclusively in the **Technical Assessment** workspace.
4. **Commercial Rigor:** Zero automatic client charging. All quotations require internal review and explicit customer sign-off.

---

## 2. Standard Operating Procedures (SOPs)

### SOP 01: Inbound Enquiry Triage & Assignment
1. Open the Admin Centre at `/admin`.
2. Inspect the **Executive Dashboard** (Module 1) for new alerts.
3. Navigate to **CRM & Enquiries** (Module 2).
4. Review leads tagged with the **New** status badge.
5. In the quick-action row or workspace modal, assign the lead to the designated account lead by entering their staff email.
6. The status advances to **Assigned**.

### SOP 02: Executing Direct Client Outreach
1. Open the assigned enquiry modal and click the **Direct Contact & Outcomes** tab.
2. Review the customer's stated contact preference (*Phone Call, WhatsApp, Email*) and **Best Time to Reach**.
3. Execute the interaction using the quick action buttons:
   - **Phone Call:** Tap `Call` or dial the formatted number (`tel:` protocol).
   - **WhatsApp:** Click `WhatsApp` to open a pre-addressed chat session.
   - **Email:** Click `Email` to draft an email with the enquiry reference code pre-filled.
   - **Copy Dossier:** Tap the copy button to paste the complete client profile into internal chat or CRM channels.
4. **IMPORTANT:** Do NOT close the workspace after making the call.

### SOP 03: Logging Mandatory Contact Outcomes
1. Conclude the customer communication.
2. In the **Record Contact Outcome** form, select the appropriate communication channel.
3. Select the exact conversation outcome:
   - *Successfully contacted — client interested:* Client confirmed scope and is awaiting quotation.
   - *Successfully contacted — callback requested:* Client requested discussion at a later time.
   - *Successfully contacted — requirements changed:* Client modified budget, scope, or platform expectations.
   - *No answer — left voicemail / SMS:* Customer did not answer call; follow-up scheduled.
   - *WhatsApp message sent — waiting response:* Initial outreach dispatched via WhatsApp.
   - *Email sent — awaiting reply:* Formal introduction sent via email.
   - *Client unresponsive:* 3+ unsuccessful contact attempts.
   - *Client not interested / timing wrong:* Lead postponed or disqualified.
4. Type a concise summary of the conversation in the notes box.
5. Set the **Next Follow-up Date** (defaults to 24–48 hours).
6. Click **Log Outcome & Update Status**.

### SOP 04: Pre-Sales Technical Assessment
1. For interested clients, switch to the **Technical Assessment** tab (Tab 5).
2. Select the **Technical Feasibility Rating** (High, Medium, Complex, Custom R&D).
3. Input the recommended architectural design (e.g., `Next.js 15 App Router + Edge SSR + Supabase PostgreSQL`).
4. Specify recommended technology stack tags (e.g., `Next.js, TypeScript, Supabase, Tailwind CSS, Vercel Edge`).
5. Estimate delivery timeframe in weeks.
6. Record internal delivery risks or third-party API dependencies.
7. Click **Save Technical Assessment**. Status advances to **Assessment Complete**.

### SOP 05: Quotations & Commercial Handoff
1. From the Enquiry Workspace, click **Generate Quotation** (or navigate to Module 11: Formal Quotations Hub).
2. Select the client's recommended plan tier (Prototype, MVP, Production, Enterprise).
3. Confirm the 50/30/20 milestone schedule:
   - 50% Advance on Kickoff.
   - 30% on Staging Verification & Sign-off.
   - 20% on Production Handover & Source Ownership.
4. Issue the quotation link to the client via email and WhatsApp.
5. Upon client commercial acceptance and advance payment confirmation, advance the lead status to **Won / Approved** and provision the project in Module 12.

---

## 3. Stitch AI Generation Worker Management (Module 5)

1. Navigate to **Personalized Demos** -> **Generation Worker Jobs**.
2. Monitor background job progression (Progress percentage, model ID, provider screen ID).
3. If a job fails due to network or upstream API timeout:
   - Click the red **Retry Job** button.
   - The worker re-queues the generation with exponential backoff.
4. Verify the generated HTML artifact download link before client presentations.
