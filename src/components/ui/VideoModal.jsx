import { useEffect } from "react";
import { X } from "lucide-react";

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);

  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 md:p-8" onClick={onClose}>
      <div className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
          aria-label="Close video"
        >
          <X className="w-6 h-6 text-text-body group-hover:text-primary transition-colors" />
        </button>

        {/* Video Container */}
        <div className="relative w-full pt-[56.25%]">
          {videoId ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-default">
              <p className="text-neutral-caption">Invalid video URL</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
