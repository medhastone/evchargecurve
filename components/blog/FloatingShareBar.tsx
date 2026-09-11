'use client';

import React, { useState, useEffect } from 'react';
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Link2, 
  Check, 
  Share2, 
  Eye, 
  X as CloseIcon,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';

interface FloatingShareBarProps {
  url?: string;
  title?: string;
  description?: string;
  ogImage?: string;
  ogSvg?: React.ReactNode;
}

export default function FloatingShareBar({
  url = 'https://evchargecurve.com/blog/How-Long-to-Charge-an-Electric-Car',
  title = 'How Long Does It Take to Charge an Electric Car? (Real-World Guide & Charging Curves)',
  description = 'Real-world charging speeds for Level 1, 2, and 3 DC fast charging, plus the 80% charging curve taper and cold-gate thermal limits.',
  ogImage = '/images/og-how-long-to-charge.png',
  ogSvg
}: FloatingShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState(url);

  // Sync actual window URL if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    setActivePlatform(platform);
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);
    let shareLink = '';

    if (platform === 'twitter') {
      const tweetText = encodeURIComponent(
        `How Long Does It Take to Charge an Electric Car? Real-world speeds, 80% taper cliffs, and DC fast-charge curve benchmarks:`
      );
      shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${tweetText}&hashtags=EV,ElectricVehicles,CleanTech`;
    } else if (platform === 'linkedin') {
      shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    } else if (platform === 'facebook') {
      shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    }

    if (typeof window !== 'undefined' && shareLink) {
      window.open(shareLink, '_blank', 'noopener,noreferrer,width=640,height=560,resizable=yes');
    }
  };

  return (
    <>
      {/* ========================================================= */}
      {/* DESKTOP FLOATING BAR (Sticky left margin alongside text)  */}
      {/* ========================================================= */}
      <aside 
        id="desktop-floating-share-bar"
        aria-label="Social sharing options"
        className="hidden xl:flex flex-col items-center fixed left-6 top-1/3 -translate-y-12 z-30 pointer-events-auto select-none"
      >
        <div className="flex flex-col items-center bg-[#131B2A]/90 backdrop-blur-md border border-slate-800/90 rounded-2xl p-2 shadow-2xl shadow-black/70 gap-2.5">
          {/* Header pill */}
          <div className="flex flex-col items-center justify-center pt-1 pb-0.5">
            <Share2 className="w-3.5 h-3.5 text-slate-400 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Share
            </span>
          </div>

          <div className="w-6 h-px bg-slate-800/80" />

          {/* X / Twitter Button */}
          <button
            id="share-btn-twitter-desktop"
            onClick={() => handleShare('twitter')}
            title="Share on X (Twitter)"
            aria-label="Share on X (Twitter)"
            className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#0B0F17] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-600 transition-all duration-200"
          >
            <Twitter className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="sr-only">Share on X</span>
            <span className="absolute left-14 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Share on X
            </span>
          </button>

          {/* LinkedIn Button */}
          <button
            id="share-btn-linkedin-desktop"
            onClick={() => handleShare('linkedin')}
            title="Share on LinkedIn"
            aria-label="Share on LinkedIn"
            className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#0B0F17] hover:bg-[#0077B5]/20 text-slate-300 hover:text-[#0077B5] border border-slate-800 hover:border-[#0077B5]/50 transition-all duration-200"
          >
            <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="sr-only">Share on LinkedIn</span>
            <span className="absolute left-14 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Share on LinkedIn
            </span>
          </button>

          {/* Facebook Button */}
          <button
            id="share-btn-facebook-desktop"
            onClick={() => handleShare('facebook')}
            title="Share on Facebook"
            aria-label="Share on Facebook"
            className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#0B0F17] hover:bg-[#1877F2]/20 text-slate-300 hover:text-[#1877F2] border border-slate-800 hover:border-[#1877F2]/50 transition-all duration-200"
          >
            <Facebook className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="sr-only">Share on Facebook</span>
            <span className="absolute left-14 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Share on Facebook
            </span>
          </button>

          <div className="w-6 h-px bg-slate-800/80" />

          {/* Copy Link Button */}
          <button
            id="share-btn-copy-desktop"
            onClick={handleCopyLink}
            title="Copy article link"
            aria-label="Copy article link"
            className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#0B0F17] hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/40 transition-all duration-200"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Link2 className="w-4 h-4 transition-transform group-hover:rotate-45" />
            )}
            <span className="sr-only">Copy Link</span>
            <span className="absolute left-14 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              {copied ? 'Copied to clipboard!' : 'Copy Link'}
            </span>
          </button>

          {/* OG Image Preview Trigger */}
          <button
            id="share-btn-og-preview-desktop"
            onClick={() => setShowPreviewModal(true)}
            title="Preview custom Open Graph share card"
            aria-label="Preview custom Open Graph share card"
            className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 hover:from-emerald-500/20 hover:to-cyan-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
            <span className="sr-only">Preview OG Card</span>
            <span className="absolute left-14 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Preview Social Card
            </span>
          </button>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MOBILE / TABLET FLOATING DOCK (Fixed bottom pill)         */}
      {/* ========================================================= */}
      <div 
        id="mobile-floating-share-bar"
        aria-label="Mobile social sharing bar"
        className="xl:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-[#131B2A]/95 backdrop-blur-lg border border-slate-700/80 rounded-full px-3.5 py-2 shadow-2xl shadow-black/90 max-w-[95vw]"
      >
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1 pr-1.5 hidden sm:inline">
          Share
        </span>

        {/* X (Twitter) */}
        <button
          id="share-btn-twitter-mobile"
          onClick={() => handleShare('twitter')}
          aria-label="Share on X"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0B0F17] text-slate-300 hover:text-white border border-slate-800 active:scale-95 transition-all"
        >
          <Twitter className="w-3.5 h-3.5" />
        </button>

        {/* LinkedIn */}
        <button
          id="share-btn-linkedin-mobile"
          onClick={() => handleShare('linkedin')}
          aria-label="Share on LinkedIn"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0B0F17] text-slate-300 hover:text-[#0077B5] border border-slate-800 active:scale-95 transition-all"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </button>

        {/* Facebook */}
        <button
          id="share-btn-facebook-mobile"
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0B0F17] text-slate-300 hover:text-[#1877F2] border border-slate-800 active:scale-95 transition-all"
        >
          <Facebook className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-5 bg-slate-800 mx-0.5" />

        {/* Copy Link */}
        <button
          id="share-btn-copy-mobile"
          onClick={handleCopyLink}
          aria-label="Copy article link"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0B0F17] text-slate-300 hover:text-emerald-400 border border-slate-800 active:scale-95 transition-all"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Link2 className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Preview OG Card */}
        <button
          id="share-btn-og-preview-mobile"
          onClick={() => setShowPreviewModal(true)}
          aria-label="View Open Graph Preview"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 active:scale-95 transition-all"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {copied && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded-full shadow-lg whitespace-nowrap animate-bounce">
            Link copied!
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* CUSTOM OPEN GRAPH SOCIAL CARD PREVIEW MODAL               */}
      {/* ========================================================= */}
      {showPreviewModal && (
        <div 
          id="og-card-preview-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowPreviewModal(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Custom Open Graph Card Preview
                  </h3>
                  <p className="text-xs text-slate-400">
                    How this article renders when shared on X, LinkedIn &amp; Facebook
                  </p>
                </div>
              </div>
              <button
                id="close-og-preview-btn"
                onClick={() => setShowPreviewModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Social Card container */}
            <div className="bg-[#131B2A] border border-slate-700/80 rounded-xl overflow-hidden shadow-xl mb-5">
              {/* Card Banner Image */}
              <div className="relative aspect-[1200/630] w-full bg-[#0B0F17] overflow-hidden">
                {ogSvg ? (
                  <div className="w-full h-full">
                    {ogSvg}
                  </div>
                ) : (
                  <Image
                    src={ogImage}
                    alt="Open Graph preview card"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    unoptimized
                  />
                )}
              </div>

              {/* Card Content Snippet */}
              <div className="p-4 bg-[#1E293B]/60 border-t border-slate-800">
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span>evchargecurve.com</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 font-normal">Technical Guide</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 line-clamp-1">
                  {title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {description}
                </p>
              </div>
            </div>

            {/* Direct sharing action buttons inside the modal */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>1200 × 630 px custom card attached automatically</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="modal-share-twitter"
                  onClick={() => {
                    handleShare('twitter');
                    setShowPreviewModal(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>X / Twitter</span>
                </button>
                <button
                  id="modal-share-linkedin"
                  onClick={() => {
                    handleShare('linkedin');
                    setShowPreviewModal(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077B5]/20 hover:bg-[#0077B5]/30 text-xs font-semibold text-[#0077B5] border border-[#0077B5]/40 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </button>
                <button
                  id="modal-share-facebook"
                  onClick={() => {
                    handleShare('facebook');
                    setShowPreviewModal(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-xs font-semibold text-[#1877F2] border border-[#1877F2]/40 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
