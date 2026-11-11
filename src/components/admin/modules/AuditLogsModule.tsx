"use client";

import React, { useState } from "react";
import {
  Activity,
  Search,
  Filter,
  ShieldCheck,
  Clock,
  User,
  Database,
  Download,
} from "lucide-react";

interface AuditLogEntry {
  id: string;
  adminEmail: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  timestamp: string;
}

interface AuditLogsModuleProps {
  onShowToast: (msg: string) => void;
}

export function AuditLogsModule({ onShowToast }: AuditLogsModuleProps) {
  const [logs, setLogs] = useState<AuditLogEntry[]>([
    {
      id: "log-1",
      adminEmail: "hari.singh@starx-alpha-labs.com",
      action: "phase_7_launch_hardening_verified",
      resourceType: "system_security",
      metadata: { hsts: "enforced", csp: "active", ssl: "valid" },
      ipAddress: "103.21.244.18",
      timestamp: "2026-11-11 14:46:22",
    },
    {
      id: "log-2",
      adminEmail: "architect@starx-alpha-labs.com",
      action: "ecosystem_target_url_updated",
      resourceType: "ecosystem_linkage",
      metadata: { newUrl: "https://starx-flow.runs-on.dev/" },
      ipAddress: "103.21.244.18",
      timestamp: "2026-11-11 14:50:35",
    },
    {
      id: "log-3",
      adminEmail: "hari.singh@starx-alpha-labs.com",
      action: "demo_request_reviewed",
      resourceType: "demo_pipeline",
      resourceId: "DEMO-73921",
      metadata: { client: "Malhotra Ortho & Dental Care", status: "under_review" },
      ipAddress: "103.21.244.18",
      timestamp: "2026-11-11 15:02:10",
    },
    {
      id: "log-4",
      adminEmail: "architect@starx-alpha-labs.com",
      action: "quotation_generated",
      resourceType: "quotations",
      resourceId: "SX-2026-084",
      metadata: { amount: 59999, client: "Apex Logistics" },
      ipAddress: "103.21.244.18",
      timestamp: "2026-11-11 15:04:45",
    },
    {
      id: "log-5",
      adminEmail: "editorial@starx-alpha-labs.com",
      action: "video_showcase_added",
      resourceType: "video_station",
      resourceId: "vid-8812",
      metadata: { title: "Modern Local Business AI OS" },
      ipAddress: "103.21.244.18",
      timestamp: "2026-11-11 15:05:30",
    },
  ]);

  const [search, setSearch] = useState("");
  const [resourceFilter, setResourceFilter] = useState("all");

  const filtered = logs.filter((l) => {
    const matchesSearch =
      !search.trim() ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.adminEmail.toLowerCase().includes(search.toLowerCase()) ||
      (l.resourceId && l.resourceId.toLowerCase().includes(search.toLowerCase()));

    const matchesRes = resourceFilter === "all" || l.resourceType === resourceFilter;

    return matchesSearch && matchesRes;
  });

  const handleExportCSV = () => {
    const headers = ["Timestamp", "AdminEmail", "Action", "ResourceType", "ResourceID", "IPAddress"];
    const rows = filtered.map((l) => [
      `"${l.timestamp}"`,
      `"${l.adminEmail}"`,
      `"${l.action}"`,
      `"${l.resourceType}"`,
      `"${l.resourceId || ''}"`,
      `"${l.ipAddress || ''}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `starx_audit_trail_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`Exported ${filtered.length} audit logs to CSV`);
  };

  return (
    <div className="space-y-6 text-left">
      {/* 1. Filter Bar */}
      <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative min-w-[200px] flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by action, admin, resource..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00D9FF]"
            />
          </div>

          <select
            value={resourceFilter}
            onChange={(e) => setResourceFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
          >
            <option value="all">All Resource Types</option>
            <option value="system_security">System Security</option>
            <option value="ecosystem_linkage">Ecosystem Linkage</option>
            <option value="demo_pipeline">Demo Pipeline</option>
            <option value="quotations">Quotations</option>
            <option value="video_station">Video Station</option>
          </select>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl bg-[#08183A] hover:bg-[#0E2248] border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#00D9FF]" />
          <span>Export Audit Trail</span>
        </button>
      </div>

      {/* 2. Audit Trail Table */}
      <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Operator Email</th>
              <th className="py-3 px-4">Action Event</th>
              <th className="py-3 px-4">Target Resource</th>
              <th className="py-3 px-4">Context Metadata</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-[#0E2248]/50 transition-colors">
                <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                  {log.timestamp}
                </td>
                <td className="py-3.5 px-4 font-bold text-white">
                  {log.adminEmail}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-[#00D9FF]/10 text-[#00D9FF] font-mono text-[10px] font-bold">
                    {log.action}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                  {log.resourceType} {log.resourceId && `(#${log.resourceId})`}
                </td>
                <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400 max-w-xs truncate">
                  {log.metadata ? JSON.stringify(log.metadata) : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
