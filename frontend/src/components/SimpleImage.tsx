import { useState } from "react";

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText: string;
}

const SimpleImage: React.FC<SimpleImageProps> = ({
  src,
  alt,
  className = "",
  fallbackText,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600"></div>
        </div>
      )}

      {error && !loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500">
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
          <span className="text-xs text-center">{fallbackText}</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`${className} ${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
};

export default SimpleImage;
