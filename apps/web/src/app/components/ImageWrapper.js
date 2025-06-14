import ExportedImage from "next-image-export-optimizer";

const ImageWrapper = ({
  alt,
  loading,
  width,
  height,
  layout = "intrinsic",
  objectFit = "cover",
  objectPosition = "center",
  ...props
}) => (
  <>
    {width < 40 ? (
      <img
        {...props}
        alt={`screenplay ${alt}`}
        loading={loading ?? "lazy"}
        width={width}
        height={height}
        style={{
          objectFit,
          objectPosition,
        }}
      />
    ) : (
      <ExportedImage
        {...props}
        alt={`screenplay ${alt}`}
        loading={loading ?? "lazy"}
        layout={layout}
        width={width}
        height={height}
        objectFit={objectFit}
        objectPosition={objectPosition}
      />
    )}
  </>
);
export default ImageWrapper;
