"use client";

import React, { useState } from "react";
import { DemoModel } from "@/types/demo";
import { useLanguage } from "@/context/LanguageContext";
import { saveEnquiry } from "@/lib/leadStore";
import { X, Send, CheckCircle2, Sparkles, Building, Mail, Phone, Calendar, DollarSign, MessageSquare } from "lucide-react";

interface CustomizationModalProps {
  demo: DemoModel | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomizationModal({ demo, isOpen, onClose }: CustomizationModalProps) {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    industry: demo?.categoryName || "",
    selectedFeatures: [] as string[],
    projectDescription: "",
    estimatedBudget: "₹50,000 - ₹1,00,000",
    expectedDeliveryDate: "Within 3-4 Weeks",
    preferredContactMethod: "WhatsApp" as "Email" | "Phone" | "WhatsApp"
  });

  if (!isOpen || !demo) return null;

  const toggleFeature = (feat: string) => {
    setFormData((prev) => {
      const exists = prev.selectedFeatures.includes(feat);
      return {
        ...prev,
        selectedFeatures: exists
          ? prev.selectedFeatures.filter((f) => f !== feat)
          : [...prev.selectedFeatures, feat]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveEnquiry({
      name: formData.name,
      businessName: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      industry: demo.categoryName,
      selectedDemoId: demo.id,
      selectedDemoName: demo.name,
      requiredFeatures: formData.selectedFeatures.length > 0 ? formData.selectedFeatures : demo.mainFeatures.slice(0, 3),
      projectDescription: formData.projectDescription || `Customization request for ${demo.name}`,
      estimatedBudget: formData.estimatedBudget,
      expectedDeliveryDate: formData.expectedDeliveryDate,
      preferredContactMethod: formData.preferredContactMethod
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#091527] border border-[#1E4373] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-[#143054] flex items-center justify-between bg-gradient-to-r from-[#0C1E38] to-[#091527]">
          <div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#32A9E8] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#32A9E8]" />
              Tailored Architecture Intake
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              Request Customization: <span className="text-[#73D8FF]">{demo.name}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#132B4C] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Enquiry Logged in CRM!</h3>
              <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                Thank you! Your custom architecture request for <strong>{demo.name}</strong> has been transmitted to our engineering desk. A solutions architect will reach out via {formData.preferredContactMethod}.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#1769AA] text-white font-semibold text-sm hover:bg-[#1F7ECB]"
                >
                  Done & Back to Catalogue
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-300">
                Specify your exact requirements, modules to add/remove, and target timeline. Every request is reviewed directly by our engineering leads.
              </p>

              {/* Grid 1: Name & Business */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full px-3.5 py-2.5 bg-[#050D1A] border border-[#1A3D68] rounded-xl text-sm text-white focus:outline-none focus:border-[#32A9E8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Business / Company Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Apex Enterprises"
                    className="w-full px-3.5 py-2.5 bg-[#050D1A] border border-[#1A3D68] rounded-xl text-sm text-white focus:outline-none focus:border-[#32A9E8]"
                  />
                </div>
              </div>

              {/* Grid 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Work Email Address *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vikram@company.com"
                    className="w-full px-3.5 py-2.5 bg-[#050D1A] border border-[#1A3D68] rounded-xl text-sm text-white focus:outline-none focus:border-[#32A9E8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number (with WhatsApp) *</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-[#050D1A] border border-[#1A3D68] rounded-xl text-sm text-white focus:outline-none focus:border-[#32A9E8]"
                  />
                </div>
              </div>

              {/* Module Customization Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Select Features Required for Customization:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-2 bg-[#050D1A] border border-[#143054] rounded-xl">
                  {demo.mainFeatures.map((feat, i) => {
                    const checked = formData.selectedFeatures.includes(feat);
                    return (
                      <button
                        type="button"
                        key={i}
                        onClick={() => toggleFeature(feat)}
                        className={`text-left text-xs p-2 rounded-lg border flex items-center justify-between transition-all ${
                          checked
                            ? "bg-[#1769AA]/40 text-white border-[#32A9E8]"
                            : "bg-[#091527] text-slate-400 border-[#143054] hover:text-slate-200"
                        }`}
                      >
                        <span className="truncate pr-2">{feat}</span>
                        {checked && <CheckCircle2 className="w-3.5 h-3.5 text-[#73D8FF] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Scope Description */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Custom Scope / Specific Requirements</label>
                <textarea
                  rows={3}
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Describe your workflows, existing software stack to integrate, number of users, etc."
                  className="w-full px-3.5 py-2 bg-[#050D1A] border border-[#1A3D68] rounded-xl text-sm text-white focus:outline-none focus:border-[#32A9E8]"
                />
              </div>

              {/* Budget & Target Delivery */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Estimated Budget</label>
                  <select
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050D1A] border border-[#1A3D68] rounded-xl text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="Under ₹35,000">Under ₹35,000</option>
                    <option value="₹35,000 - ₹75,000">₹35,000 - ₹75,000</option>
                    <option value="₹75,000 - ₹1,50,000">₹75,000 - ₹1,50,000</option>
                    <option value="₹1,50,000 - ₹3,00,000+">₹1,50,000 - ₹3,00,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Launch</label>
                  <select
                    value={formData.expectedDeliveryDate}
                    onChange={(e) => setFormData({ ...formData, expectedDeliveryDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050D1A] border border-[#1A3D68] rounded-xl text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="Urgent (1-2 Weeks)">Urgent (1-2 Weeks)</option>
                    <option value="Standard (3-4 Weeks)">Standard (3-4 Weeks)</option>
                    <option value="Flexible (1-2 Months)">Flexible (1-2 Months)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Contact</label>
                  <select
                    value={formData.preferredContactMethod}
                    onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#050D1A] border border-[#1A3D68] rounded-xl text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="WhatsApp">WhatsApp Message</option>
                    <option value="Email">Email Proposal</option>
                    <option value="Phone">Direct Phone Call</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#1769AA] to-[#1F7ECB] hover:from-[#1E7ECA] hover:to-[#32A9E8] text-white font-bold rounded-xl shadow-lg shadow-[#1769AA]/40 flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Architecture & Quotation Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
