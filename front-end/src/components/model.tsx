import React from "react";

const Model = () => {
  return (
    <div className="relative w-full h-full" id="modelScreenshot">
      <video
        className="absolute inset-0 w-full h-full "
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/dance-body.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Model;
