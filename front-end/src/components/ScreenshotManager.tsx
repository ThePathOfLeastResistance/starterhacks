// components/ScreenshotManager.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import html2canvas from "html2canvas";
import postScreenshots from "./postScreenshots";

interface ScreenshotManagerProps {
  modelRef: React.RefObject<HTMLDivElement>;
  cameraRef: React.RefObject<HTMLDivElement>;
  currentDanceSequenceId: number;
}

interface Screenshots {
  modelImage: string;
  userImage: string;
}

const ScreenshotManager: React.FC<ScreenshotManagerProps> = ({
  modelRef,
  cameraRef,
}) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const captureScreenshots = async (): Promise<Screenshots | null> => {
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
    const screenshots = await captureScreenshots();
    if (screenshots) {
      console.log("Screenshots captured:", screenshots);

      try {
        const result = await postScreenshots(screenshots);
        console.log("Screenshots uploaded:", result);
      } catch (error) {
        console.error("Failed to upload screenshots:", error);
      }
    }
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isCapturing) {
      intervalId = setInterval(handleCapture, 500);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isCapturing, handleCapture]);

  const toggleCapture = () => {
    setIsCapturing((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={toggleCapture}
        className={`font-bold py-2 px-4 rounded ${
          isCapturing
            ? "bg-red-500 hover:bg-red-700 text-white"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
      >
        {isCapturing ? "Stop Capturing" : "Start Capturing"}
      </button>
    </div>
  );
};

export default ScreenshotManager;
