"use client";

import React, { useState } from "react";
import { VideoItem } from "@/data/videos";
import {
  Tv,
  Plus,
  Play,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface VideoStationModuleProps {
  videos: VideoItem[];
  onSaveVideo: (video: VideoItem) => void;
  onDeleteVideo: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export function VideoStationModule({
  videos,
  onSaveVideo,
  onDeleteVideo,
  onShowToast,
}: VideoStationModuleProps) {
  const [videoList, setVideoList] = useState<VideoItem[]>(videos);
  const [editModal, setEditModal] = useState<VideoItem | null>(null);
  const [previewVideo, setPreviewVideo] = useState<VideoItem | null>(null);

  const handleCreateNew = () => {
    const newVideo: VideoItem = {
      id: `vid-${Date.now().toString().slice(-4)}`,
      slug: `custom-solution-video-${Date.now().toString().slice(-4)}`,
      title: "New Video Showcase",
      categoryId: "restaurants-cafes",
      categoryTitle: "Restaurants & Cafes",
      durationSeconds: 255,
      durationText: "04:15",
      language: "English / Hindi",
      videoType: "youtube",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "/brand/starx-alpha-logo.webp",
      description: "Comprehensive walkthrough of digital ordering, POS synchronization, and automated intake.",
      published: true,
      viewCount: 0,
      features: ["Next.js 16 Turbo Storefront", "Shared PostgreSQL Database", "WhatsApp Webhook Dispatch"],
      tags: ["Digital Ordering", "Restaurant Tech"],
      featured: false,
    };
    setEditModal(newVideo);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModal) return;

    onSaveVideo(editModal);
    setVideoList((prev) => {
      const idx = prev.findIndex((v) => v.id === editModal.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = editModal;
        return copy;
      }
      return [editModal, ...prev];
    });

    onShowToast(`Saved Video: ${editModal.title}`);
    setEditModal(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Permanently remove "${title}" from Video Station?`)) {
      onDeleteVideo(id);
      setVideoList((prev) => prev.filter((v) => v.id !== id));
      onShowToast(`Deleted Video: ${title}`);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* 1. Header & Add Video */}
      <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white">Video Station Library ({videoList.length})</h2>
          <p className="text-[11px] text-slate-400">Manage 16:9 responsive video walkthroughs across 12 industries</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold shadow-md shadow-[#087BFF]/30 flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Video</span>
        </button>
      </div>

      {/* 2. Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoList.map((vid) => (
          <div
            key={vid.id}
            className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-3 flex flex-col justify-between hover:border-[#E52BFF]/40 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#00D9FF] uppercase tracking-wider">
                  {vid.categoryTitle}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {vid.durationText}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white line-clamp-1">{vid.title}</h3>
              <p className="text-xs text-slate-300 line-clamp-2 font-light leading-relaxed">
                {vid.description}
              </p>

              <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-white/5">{vid.language}</span>
                {vid.featured && (
                  <span className="px-2 py-0.5 rounded bg-[#E52BFF]/10 text-[#E52BFF] border border-[#E52BFF]/30 font-bold">
                    Featured
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setPreviewVideo(vid)}
                className="px-3 py-1.5 rounded-xl bg-[#08183A] hover:bg-[#00D9FF] hover:text-[#030B24] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3 h-3 text-[#00D9FF]" />
                <span>Play</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditModal(vid)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                  title="Edit video"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(vid.id, vid.title)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 cursor-pointer"
                  title="Delete video"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Playback Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#071638] border border-[#00D9FF]/40 rounded-3xl w-full max-w-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">{previewVideo.title}</h3>
              <button
                onClick={() => setPreviewVideo(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl bg-black overflow-hidden relative">
              <iframe
                src={previewVideo.videoUrl.replace("watch?v=", "embed/")}
                title={previewVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="text-xs text-slate-300 leading-relaxed">
              {previewVideo.description}
            </div>
          </div>
        </div>
      )}

      {/* 4. Edit Video Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-[#071638] border border-[#00D9FF]/40 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Edit Video Showcase</h3>
              <button
                type="button"
                onClick={() => setEditModal(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Title</label>
              <input
                type="text"
                required
                value={editModal.title}
                onChange={(e) => setEditModal({ ...editModal, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Industry / Category</label>
                <input
                  type="text"
                  required
                  value={editModal.categoryTitle}
                  onChange={(e) => setEditModal({ ...editModal, categoryTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Duration (e.g. 04:15)</label>
                <input
                  type="text"
                  value={editModal.durationText}
                  onChange={(e) => setEditModal({ ...editModal, durationText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Video URL (YouTube/Vimeo/MP4)</label>
              <input
                type="url"
                required
                value={editModal.videoUrl}
                onChange={(e) => setEditModal({ ...editModal, videoUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
              <textarea
                rows={3}
                value={editModal.description}
                onChange={(e) => setEditModal({ ...editModal, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={editModal.featured}
                onChange={(e) => setEditModal({ ...editModal, featured: e.target.checked })}
                className="rounded border-white/20"
              />
              <label htmlFor="featured" className="text-xs text-white">
                Pin to Homepage &amp; Video Station Featured Carousel
              </label>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditModal(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#00D9FF] text-[#030B24] text-xs font-bold"
              >
                Save Video
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
