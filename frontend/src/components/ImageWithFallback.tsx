import { useState, useEffect } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText: string;
  colorType: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = "",
  fallbackText,
  colorType,
  onLoad,
  onError,
}) => {
  const [imageState, setImageState] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  // Reset state when src changes
  useEffect(() => {
    setImageState("loading");
  }, [src]);

  const handleImageLoad = () => {
    console.log(`✅ Image component loaded: ${src}`);
    setImageState("loaded");
    onLoad?.();
  };

  const handleImageError = () => {
    console.error(`❌ Image component failed: ${src}`);
    setImageState("error");
    onError?.();
  };

  if (imageState === "loading") {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100`}
      >
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600"></div>
      </div>
    );
  }

  if (imageState === "error") {
    return (
      <div
        className={`${className} flex flex-col items-center justify-center bg-gray-100 text-gray-500`}
      >
        <svg
          className="w-12 h-12 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-xs font-medium text-center">{fallbackText}</span>
        <span className="text-xs text-gray-400 capitalize">{colorType}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={handleImageLoad}
      onError={handleImageError}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;
