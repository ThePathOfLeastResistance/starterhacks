"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";
import postScreenshots from "@/components/postScreenshots";
import Model from "@/components/Model";

const DanceComponent: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const captureScreenshots = async () => {
    if (!modelRef.current || !cameraRef.current) {
      console.error("One or both refs are null");
      return null;
    }

    try {
      const modelCanvas = await html2canvas(modelRef.current);
      const userCanvas = await html2canvas(cameraRef.current);

      const modelImage = modelCanvas.toDataURL("image/png").split(",")[1];
      const userImage = userCanvas.toDataURL("image/png").split(",")[1];

      return { modelImage, userImage };
    } catch (error) {
      console.error("Error capturing screenshots:", error);
      return null;
    }
  };

  const handleCapture = useCallback(async () => {
    if (!isActive) return; // Stop capturing if not active

    const screenshots = await captureScreenshots();
    if (screenshots) {
      try {
        const result = await postScreenshots(screenshots);
        console.log("Screenshots uploaded:", result);
      } catch (error) {
        console.error("Failed to upload screenshots:", error);
      }
    }
  }, [isActive]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive) {
      intervalId = setInterval(handleCapture, 500);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, handleCapture]);

  const toggleActivity = () => {
    setIsActive((prev) => !prev);
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[80svh]">
      <div className="w-full md:w-1/2" ref={modelRef}>
        <Model videoRef={videoRef} isActive={isActive}/>
      </div>
      <div className="w-full md:w-1/2" ref={cameraRef}>
        <div className="h-full flex flex-col">
          <div className="rounded-lg overflow-hidden flex-grow">
            {isActive && (
              <Webcam
                ref={webcamRef}
                audio={false}
                mirrored={true}
                className="w-full h-full"
              />
            )}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <button
          onClick={toggleActivity}
          className={`font-bold py-5 px-5   rounded-full ${
            isActive
              ? "bg-red-500 hover:bg-red-700 text-white"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        >
          {isActive ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default DanceComponent;
