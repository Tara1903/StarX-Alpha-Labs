"use client";

import React, { useState } from "react";
import { ClientDocumentItem, DocumentCategory } from "@/types/customerPortal";
import { 
  FileText, 
  Download, 
  Upload, 
  FileCode, 
  Image as ImageIcon, 
  FolderArchive, 
  CheckCircle2, 
  X,
  Plus
} from "lucide-react";

interface DocumentsModuleProps {
  documents: ClientDocumentItem[];
  onUploadDocument: (fileData: { fileName: string; fileUrl: string; fileType: string; documentCategory: DocumentCategory }) => void;
}

export function DocumentsModule({
  documents,
  onUploadDocument,
}: DocumentsModuleProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [uploadModal, setUploadModal] = useState(false);
  const [newFileForm, setNewFileForm] = useState({
    fileName: "",
    fileUrl: "",
    documentCategory: "client_upload" as DocumentCategory,
  });

  const categories: { id: string; label: string }[] = [
    { id: "all", label: "All Files" },
    { id: "deliverable", label: "Production Deliverables" },
    { id: "ui_ux_design", label: "UI/UX & Wireframes" },
    { id: "brief", label: "Project Briefs & Specs" },
    { id: "client_upload", label: "Client Uploaded Assets" },
  ];

  const filteredDocs = documents.filter((d) => {
    if (activeCategory === "all") return true;
    return d.documentCategory === activeCategory;
  });

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <ImageIcon className="w-5 h-5 text-[#E52BFF]" />;
    if (type.includes("zip") || type.includes("archive")) return <FolderArchive className="w-5 h-5 text-amber-400" />;
    if (type.includes("json") || type.includes("code")) return <FileCode className="w-5 h-5 text-[#00D9FF]" />;
    return <FileText className="w-5 h-5 text-[#087BFF]" />;
  };

  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileForm.fileName || !newFileForm.fileUrl) return;

    onUploadDocument({
      fileName: newFileForm.fileName,
      fileUrl: newFileForm.fileUrl,
      fileType: "application/pdf",
      documentCategory: newFileForm.documentCategory,
    });

    setUploadModal(false);
    setNewFileForm({ fileName: "", fileUrl: "", documentCategory: "client_upload" });
  };

  return (
    <div className="space-y-6 text-left">
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Project Deliverables &amp; Shared Documents ({documents.length})</h2>
          <p className="text-xs text-slate-400">Authenticated repository for engineering deliverables, design files, and shared assets</p>
        </div>

        <button
          onClick={() => setUploadModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] hover:brightness-110 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors cursor-pointer shrink-0 ${
              activeCategory === c.id
                ? "bg-[#087BFF] text-white font-bold shadow-md"
                : "bg-[#071638] text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="col-span-full p-12 rounded-3xl bg-[#071638] border border-white/10 text-center space-y-2">
            <FileText className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Documents in this Category</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto font-light">
              Engineering briefs, UI wireframes, and production deliverables will appear here once published by your team.
            </p>
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-[#071638] border border-white/10 hover:border-[#00D9FF]/40 transition-colors flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 rounded-xl bg-[#08183A] border border-white/5">
                    {getFileIcon(doc.fileType)}
                  </div>
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400">
                    {doc.version || "v1.0"}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{doc.fileName}</h4>
                  <div className="text-[10px] font-mono text-slate-400 pt-0.5">
                    {doc.documentCategory.replace("_", " ").toUpperCase()} • {new Date(doc.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  {doc.uploadedByType === "client" ? "Uploaded by You" : "StarX Engineering"}
                </span>

                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#08183A] hover:bg-[#00D9FF] hover:text-[#030B24] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {uploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmitUpload}
            className="bg-[#071638] border border-[#00D9FF]/40 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Upload Requested Document</h3>
              <button
                type="button"
                onClick={() => setUploadModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Document Title / File Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Brand Guidelines & Vector Logos"
                value={newFileForm.fileName}
                onChange={(e) => setNewFileForm({ ...newFileForm, fileName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">File Storage URL or Cloud Drive Link *</label>
              <input
                type="url"
                required
                placeholder="https://drive.google.com/... or secure storage link"
                value={newFileForm.fileUrl}
                onChange={(e) => setNewFileForm({ ...newFileForm, fileUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
              <select
                value={newFileForm.documentCategory}
                onChange={(e) => setNewFileForm({ ...newFileForm, documentCategory: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              >
                <option value="client_upload">Client Uploaded Assets</option>
                <option value="brief">Requirements & Brief</option>
                <option value="report">Feedback & Testing Report</option>
              </select>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setUploadModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold"
              >
                Register File
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
