"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { toast } from "sonner";
import postService from "@/services/post.service";
import useEditPost from "@/hooks/useEditPost.js";

export default function PostEdit() {
  const { postId } = useParams();
  const router = useRouter();
  const { updatePost, isLoading } = useEditPost();

  const [open, setOpen] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    externalUrl: "",
    portfolioType: "link",
    mediaUrls: [],
  });

  /* ── Fetch post data on mount ── */
  useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        const data = await postService.getPost(postId);
        const post = data?.data ?? data;
        setForm({
          title: post.title ?? "",
          description: post.description ?? "",
          externalUrl: post.externalUrl ?? "",
          portfolioType: post.portfolioType ?? "link",
          mediaUrls: post.mediaUrls ?? [],
        });
      } catch(err) {
        toast.error("Gagal memuat post.");
        console.error("ERROR", err);
        handleClose();
      } finally {
        setIsFetching(false);
      }
    })();
  }, [postId]);

  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error("Title tidak boleh kosong.");
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      portfolioType: form.portfolioType,
      mediaUrls: form.mediaUrls,
      externalUrl: form.externalUrl,
    };

    const result = await updatePost(postId, payload);
    if (result.success) {
      toast.success("Post berhasil diperbarui.", { position: "top-right" });
      handleClose();
    } else {
      toast.error(result.message, { position: "top-right"});
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Panel wrapper */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-3xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <DialogTitle className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
              Edit Post
            </DialogTitle>
            <button
              type="button"
              onClick={handleClose}
              className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <i className="bx bx-x text-lg" />
            </button>
          </div>

          {/* ── Body ── */}
          {isFetching ? (
            <div className="flex items-center justify-center py-16">
              <i className="bx bx-loader-alt animate-spin text-2xl text-indigo-500" />
            </div>
          ) : (
            <div className="px-6 pb-6 pt-4 flex flex-col gap-5">
              {/* Form card */}
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4 flex flex-col gap-4">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition"
                  />
                </div>

                {/* Link Project */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Link Project
                  </label>
                  <input
                    type="url"
                    name="externalUrl"
                    value={form.externalUrl}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Descriptions
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Deskripsi"
                    rows={4}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition resize-none"
                  />
                </div>
              </div>

              {/* ── Media note — read-only info ── */}
              {form.mediaUrls.length > 0 && (
                <div className="flex items-start gap-2.5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl px-4 py-3">
                  <i className="bx bx-image text-indigo-400 text-lg mt-0.5 shrink-0" />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {form.mediaUrls.length} foto terlampir
                    </p>
                    <p className="text-[11px] text-indigo-400 dark:text-indigo-500 leading-relaxed">
                      Foto tidak dapat diubah melalui halaman ini.
                    </p>
                  </div>
                </div>
              )}

              {/* ── Footer actions ── */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 cursor-default select-none"
                >
                  <i className="bx bx-folder text-sm" />
                  Upload files & image
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#6A60E3" }}
                >
                  {isLoading && (
                    <i className="bx bx-loader-alt animate-spin text-sm" />
                  )}
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
