import React from "react";
import ImageWrapper from "./ImageWrapper";

const GradientBg = () => {
  return (
    <ImageWrapper
      width={100}
      height={100}
      loading="eager"
      alt="bg"
      src="/assets/blogs/bg.png"
      objectFit={"object-fill"}
      className="absolute object-fill pointer-events-none top-0 left-0 w-full h-full -z-0"
    />
  );
};

export default GradientBg;
