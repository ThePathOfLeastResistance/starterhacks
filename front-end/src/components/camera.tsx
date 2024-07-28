import React from "react";
import Webcam from "react-webcam";

interface CameraProps {
  isActive: boolean;
}

const Camera: React.FC<CameraProps> = ({ isActive }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="rounded-lg overflow-hidden flex-grow">
        {isActive && (
          <Webcam audio={false} mirrored={true} className="w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default Camera;
