"use client";

import { CustomerEstimate } from "./estimateStore";
import { Quotation } from "./quotationStore";

export function printEstimatePDF(estimate: CustomerEstimate): void {
  if (typeof window === "undefined") return;

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to download or print your official Estimate PDF.");
    return;
  }

  const formattedDate = new Date(estimate.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const formattedValidity = new Date(estimate.validUntil).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Official Project Estimate — ${estimate.estimateNumber} — STARX ALPHA LABS</title>
      <style>
        @page {
          size: A4;
          margin: 18mm 16mm 18mm 16mm;
        }
        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #0F172A;
          background: #FFFFFF;
          margin: 0;
          padding: 0;
          font-size: 11pt;
          line-height: 1.5;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #087BFF;
          padding-bottom: 16px;
          margin-bottom: 20px;
        }
        .brand-name {
          font-size: 20pt;
          font-weight: 900;
          letter-spacing: -0.5px;
          color: #030B24;
          text-transform: uppercase;
        }
        .brand-tagline {
          font-size: 9pt;
          font-weight: 700;
          color: #087BFF;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-top: 2px;
        }
        .company-contacts {
          font-size: 8.5pt;
          color: #475569;
          text-align: right;
          line-height: 1.4;
        }
        .doc-title-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #F1F5F9;
          border-left: 4px solid #00D9FF;
          padding: 10px 14px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        .doc-title {
          font-size: 13pt;
          font-weight: 800;
          color: #0F172A;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .doc-id {
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
          font-size: 11pt;
          font-weight: 800;
          color: #087BFF;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 22px;
        }
        .meta-card {
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 12px 14px;
          background: #F8FAFC;
        }
        .meta-label {
          font-size: 8pt;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748B;
          margin-bottom: 4px;
          letter-spacing: 0.5px;
        }
        .meta-value {
          font-size: 10.5pt;
          font-weight: 700;
          color: #0F172A;
        }
        .meta-sub {
          font-size: 8.5pt;
          color: #475569;
          margin-top: 2px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th {
          background: #030B24;
          color: #FFFFFF;
          font-size: 8.5pt;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 8px 12px;
          text-align: left;
        }
        th.text-right {
          text-align: right;
        }
        td {
          padding: 10px 12px;
          border-bottom: 1px solid #E2E8F0;
          font-size: 9.5pt;
          vertical-align: top;
        }
        td.text-right {
          text-align: right;
          font-family: "SFMono-Regular", Consolas, monospace;
          font-weight: 600;
        }
        .item-title {
          font-weight: 700;
          color: #0F172A;
        }
        .item-desc {
          font-size: 8pt;
          color: #64748B;
          margin-top: 2px;
        }
        .totals-container {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 24px;
        }
        .totals-box {
          width: 320px;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          overflow: hidden;
        }
        .totals-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 12px;
          font-size: 9pt;
          color: #334155;
          border-bottom: 1px solid #E2E8F0;
        }
        .totals-row.grand-total {
          background: #030B24;
          color: #FFFFFF;
          font-weight: 800;
          font-size: 11pt;
          border-bottom: none;
        }
        .grand-total span:last-child {
          color: #00D9FF;
          font-family: "SFMono-Regular", Consolas, monospace;
        }
        .disclaimer-box {
          border-left: 4px solid #E52BFF;
          background: #FDF4FF;
          padding: 10px 14px;
          border-radius: 4px;
          font-size: 8pt;
          color: #701A75;
          font-weight: 700;
          margin-bottom: 20px;
        }
        .terms-section {
          border-top: 1px dashed #CBD5E1;
          padding-top: 14px;
          font-size: 8pt;
          color: #475569;
          line-height: 1.5;
        }
        .terms-title {
          font-size: 8.5pt;
          font-weight: 800;
          color: #0F172A;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 8pt;
          color: #94A3B8;
          border-top: 1px solid #E2E8F0;
          padding-top: 10px;
        }
        @media print {
          .no-print {
            display: none !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="background: #030B24; color: #FFF; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <span style="font-size: 12px; font-weight: 600;">STARX ALPHA LABS — Official PDF Preview</span>
        <button onclick="window.print()" style="background: #00D9FF; color: #030B24; border: none; padding: 8px 18px; border-radius: 6px; font-weight: 800; cursor: pointer;">
          Print / Save as PDF
        </button>
      </div>

      <div class="header">
        <div>
          <div class="brand-name">STARX ALPHA LABS</div>
          <div class="brand-tagline">Build Smarter. Lead Tomorrow.</div>
          <div style="font-size: 8pt; color: #64748B; margin-top: 4px;">Complete Technology Company</div>
        </div>
        <div class="company-contacts">
          <div><strong>WhatsApp / Call:</strong> +91 9630937033</div>
          <div><strong>Web:</strong> https://www.starxalphalabs.online/</div>
          <div><strong>Email:</strong> team@starxalphalabs.online</div>
          <div>Corporate Engineering &amp; Client Solutions Hub</div>
        </div>
      </div>

      <div class="doc-title-bar">
        <div class="doc-title">Project Estimate Snapshot</div>
        <div class="doc-id">${estimate.estimateNumber}</div>
      </div>

      <div class="meta-grid">
        <div class="meta-card">
          <div class="meta-label">Client &amp; Organization</div>
          <div class="meta-value">${estimate.clientName}</div>
          <div class="meta-sub"><strong>Brand:</strong> ${estimate.clientBusiness || "Not Specified"}</div>
          <div class="meta-sub"><strong>Email:</strong> ${estimate.clientEmail}</div>
          <div class="meta-sub"><strong>Phone / WhatsApp:</strong> ${estimate.clientPhone}</div>
        </div>

        <div class="meta-card">
          <div class="meta-label">Estimate Details &amp; Status</div>
          <div class="meta-value">Status: ${estimate.status}</div>
          <div class="meta-sub"><strong>Generated:</strong> ${formattedDate}</div>
          <div class="meta-sub"><strong>Valid Until:</strong> ${formattedValidity} (30 Days)</div>
          <div class="meta-sub"><strong>Preferred Contact:</strong> ${estimate.preferredContact || "WhatsApp"}</div>
        </div>
      </div>

      <div class="disclaimer-box">
        PRELIMINARY PROJECT ESTIMATE — SUBJECT TO REQUIREMENT VERIFICATION AND FINAL APPROVAL.
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 55%;">Solution &amp; Scope Description</th>
            <th style="width: 20%;">Category</th>
            <th class="text-right" style="width: 25%;">Investment (INR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="item-title">Base Package: ${estimate.packageCode} — ${estimate.packageName}</div>
              <div class="item-desc">Division: ${estimate.division.toUpperCase()} | Full responsive frontend &amp; core architecture</div>
            </td>
            <td>Core Engineering</td>
            <td class="text-right">₹${estimate.basePrice.toLocaleString("en-IN")}</td>
          </tr>
          ${estimate.selectedAddons.map((addon) => `
            <tr>
              <td>
                <div class="item-title">${addon.name}</div>
                <div class="item-desc">Optional functional enhancement module</div>
              </td>
              <td>Add-on Module</td>
              <td class="text-right">+₹${addon.price.toLocaleString("en-IN")}</td>
            </tr>
          `).join("")}
          ${estimate.hostingCost > 0 ? `
            <tr>
              <td>
                <div class="item-title">Managed Cloud &amp; High-Availability Hosting</div>
                <div class="item-desc">Annual multi-region edge deployment with automated SSL</div>
              </td>
              <td>Cloud &amp; Hosting</td>
              <td class="text-right">+₹${estimate.hostingCost.toLocaleString("en-IN")}</td>
            </tr>
          ` : ""}
          ${estimate.maintenanceCost > 0 ? `
            <tr>
              <td>
                <div class="item-title">Maintenance &amp; Support Care SLA (Month 1)</div>
                <div class="item-desc">Uptime monitoring, vulnerability patching and ticket support</div>
              </td>
              <td>Maintenance SLA</td>
              <td class="text-right">+₹${estimate.maintenanceCost.toLocaleString("en-IN")}</td>
            </tr>
          ` : ""}
        </tbody>
      </table>

      <div class="totals-container">
        <div class="totals-box">
          <div class="totals-row">
            <span>Subtotal:</span>
            <strong>₹${estimate.subtotal.toLocaleString("en-IN")}</strong>
          </div>
          <div class="totals-row">
            <span>Applicable GST (18%):</span>
            <strong>₹${estimate.gstAmount.toLocaleString("en-IN")}</strong>
          </div>
          <div class="totals-row grand-total">
            <span>Total Investment:</span>
            <span>₹${estimate.grandTotal.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      <div class="terms-section">
        <div class="terms-title">Standard Terms &amp; Conditions</div>
        <ol style="margin: 0; padding-left: 18px;">
          <li>This estimate reflects a preliminary calculation based on client selections and is locked for 30 calendar days.</li>
          <li>Final project kickoff requires requirement verification, formal technical proposal signoff, and verified advance milestone clearance.</li>
          <li>100% intellectual property, repository access, and source code ownership transfer upon final project clearance.</li>
          <li>Includes 30 days post-launch hypercare and bug warranty for covered functional deliverables.</li>
        </ol>
      </div>

      <div class="footer">
        STARX ALPHA LABS • Complete Technology Company • Build Smarter. Lead Tomorrow. • WhatsApp: 9630937033
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

export function printProposalPDF(proposal: Quotation): void {
  if (typeof window === "undefined") return;

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to download or print your official Proposal PDF.");
    return;
  }

  const formattedDate = new Date(proposal.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Official Technical Proposal — ${proposal.proposalNumber} — STARX ALPHA LABS</title>
      <style>
        @page {
          size: A4;
          margin: 18mm 16mm 18mm 16mm;
        }
        * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #0F172A;
          margin: 0;
          font-size: 10.5pt;
          line-height: 1.5;
        }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #087BFF; padding-bottom: 14px; margin-bottom: 20px; }
        .brand-name { font-size: 20pt; font-weight: 900; color: #030B24; text-transform: uppercase; }
        .brand-tagline { font-size: 9pt; font-weight: 700; color: #087BFF; text-transform: uppercase; }
        .doc-title-bar { background: #030B24; color: #FFF; padding: 10px 14px; border-radius: 4px; display: flex; justify-content: space-between; margin-bottom: 20px; }
        .section-title { font-size: 11pt; font-weight: 800; text-transform: uppercase; color: #087BFF; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; margin-top: 18px; margin-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        th { background: #F1F5F9; color: #0F172A; font-size: 8.5pt; text-transform: uppercase; padding: 8px 10px; text-align: left; border: 1px solid #E2E8F0; }
        td { padding: 8px 10px; border: 1px solid #E2E8F0; font-size: 9pt; }
        .text-right { text-align: right; }
        .footer { margin-top: 30px; text-align: center; font-size: 8pt; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 10px; }
        @media print { .no-print { display: none !important; } }
      </style>
    </head>
    <body>
      <div class="no-print" style="background: #030B24; color: #FFF; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <span style="font-size: 12px; font-weight: 600;">STARX ALPHA LABS — Official Proposal ${proposal.proposalNumber} (${proposal.currentVersion})</span>
        <button onclick="window.print()" style="background: #00D9FF; color: #030B24; border: none; padding: 8px 18px; border-radius: 6px; font-weight: 800; cursor: pointer;">
          Print / Save as PDF
        </button>
      </div>

      <div class="header">
        <div>
          <div class="brand-name">STARX ALPHA LABS</div>
          <div class="brand-tagline">Build Smarter. Lead Tomorrow.</div>
        </div>
        <div style="font-size: 8.5pt; color: #475569; text-align: right;">
          <div><strong>WhatsApp:</strong> 9630937033</div>
          <div><strong>Website:</strong> https://www.starxalphalabs.online/</div>
        </div>
      </div>

      <div class="doc-title-bar">
        <div><strong>PROJECT PROPOSAL &amp; SCOPE SPECIFICATION</strong></div>
        <div style="color: #00D9FF;">${proposal.proposalNumber} (${proposal.currentVersion})</div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
        <div style="background: #F8FAFC; padding: 10px; border: 1px solid #E2E8F0; border-radius: 4px;">
          <div style="font-size: 8pt; font-weight: 700; color: #64748B;">CLIENT DETAILS</div>
          <div style="font-weight: 700;">${proposal.clientName}</div>
          <div style="font-size: 9pt;">${proposal.clientBusiness}</div>
          <div style="font-size: 9pt;">${proposal.clientEmail} | ${proposal.clientPhone}</div>
        </div>
        <div style="background: #F8FAFC; padding: 10px; border: 1px solid #E2E8F0; border-radius: 4px;">
          <div style="font-size: 8pt; font-weight: 700; color: #64748B;">PROJECT SPECIFICATION</div>
          <div style="font-weight: 700;">${proposal.projectTitle}</div>
          <div style="font-size: 9pt;"><strong>Timeline:</strong> ${proposal.deliveryTimeline}</div>
          <div style="font-size: 9pt;"><strong>Date:</strong> ${formattedDate}</div>
        </div>
      </div>

      <div class="section-title">1. Executive Overview</div>
      <p style="font-size: 9.5pt; color: #334155; margin: 4px 0 12px 0;">${proposal.projectOverview}</p>

      <div class="section-title">2. Scope &amp; Deliverables</div>
      <p style="font-size: 9pt; color: #334155;">${proposal.scopeDescription}</p>

      <div class="section-title">3. Itemized Investment Breakdown</div>
      <table>
        <thead>
          <tr>
            <th>Module / Service Item</th>
            <th>Category</th>
            <th class="text-right">Amount (INR)</th>
          </tr>
        </thead>
        <tbody>
          ${proposal.items.map((item) => `
            <tr>
              <td><strong>${item.title}</strong><br><span style="font-size: 8pt; color: #64748B;">${item.description}</span></td>
              <td>${item.category}</td>
              <td class="text-right">₹${item.amount.toLocaleString("en-IN")}</td>
            </tr>
          `).join("")}
          <tr>
            <td colspan="2" class="text-right"><strong>Subtotal:</strong></td>
            <td class="text-right"><strong>₹${proposal.subtotal.toLocaleString("en-IN")}</strong></td>
          </tr>
          <tr>
            <td colspan="2" class="text-right">Applicable GST (18%):</td>
            <td class="text-right">₹${proposal.taxAmount.toLocaleString("en-IN")}</td>
          </tr>
          <tr style="background: #030B24; color: #FFF;">
            <td colspan="2" class="text-right"><strong>Total Project Investment:</strong></td>
            <td class="text-right" style="color: #00D9FF; font-weight: 800; font-size: 11pt;">₹${proposal.totalAmount.toLocaleString("en-IN")}</td>
          </tr>
        </tbody>
      </table>

      <div class="section-title">4. Milestone Payment Schedule</div>
      <table>
        <thead>
          <tr>
            <th>Milestone</th>
            <th>Deliverables</th>
            <th>Timeline</th>
            <th class="text-right">Split</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${proposal.milestoneSchedules.map((m) => `
            <tr>
              <td><strong>${m.title}</strong></td>
              <td style="font-size: 8.5pt;">${m.deliverables.join(", ")}</td>
              <td>${m.duePeriod}</td>
              <td class="text-right">${m.percentage}%</td>
              <td class="text-right"><strong>₹${m.amount.toLocaleString("en-IN")}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="footer">
        STARX ALPHA LABS • Complete Technology Company • Build Smarter. Lead Tomorrow. • WhatsApp: 9630937033
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
