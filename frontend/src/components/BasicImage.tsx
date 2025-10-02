interface BasicImageProps {
  src: string;
  alt: string;
  className?: string;
}

const BasicImage: React.FC<BasicImageProps> = ({
  src,
  alt,
  className = "",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={() => console.log(`✅ Basic image loaded: ${src}`)}
      onError={() => console.error(`❌ Basic image failed: ${src}`)}
      loading="lazy"
    />
  );
};

export default BasicImage;
