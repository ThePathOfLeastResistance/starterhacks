"use client";
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const CameraComponent: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);

  const startWebcam = () => {
    setIsWebcamOn(true);
  };

  const stopWebcam = () => {
    setIsWebcamOn(false);
  };

  return (
    <div className=" h-full flex flex-col">
      <div className="rounded-lg overflow-hidden flex-grow">
        {isWebcamOn && (
          <Webcam
            ref={webcamRef}
            audio={false}
            mirrored={true}
            className="w-full h-full"
          />
        )}
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={startWebcam}
          disabled={isWebcamOn}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Start Webcam
        </button>
        <button
          onClick={stopWebcam}
          disabled={!isWebcamOn}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          Stop Webcam
        </button>
      </div>
    </div>
  );
};

export default CameraComponent;
