import React from "react";

interface ModelProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isActive: boolean;
}

const Model: React.FC<ModelProps> = ({ videoRef, isActive }) => {
  return (
    <div className="h-full">
      <video
        ref={videoRef}
        className={`w-full h-full transition-transform duration-300 ${
          isActive ? "scale-100" : "scale-0"
        }`}
        src="/dance-body.mp4"
        loop
      />
    </div>
  );
};

export default Model;
