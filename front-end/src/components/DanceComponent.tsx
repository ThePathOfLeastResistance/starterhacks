"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  postScreenshots,
  fetchDanceFrames,
} from "@/components/postScreenshots";
import Model from "@/components/Model";
import Camera from "@/components/camera";
import ResultsDisplay, { DanceFrame } from "@/components/ResultsDisplay";
import ControlButton from "@/components/ControlButton";
import html2canvas from "html2canvas";

const DanceComponent: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [danceFrames, setDanceFrames] = useState<DanceFrame[]>([]);
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
    if (!isActive) return;

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
      intervalId = setInterval(handleCapture, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, handleCapture]);

  const fetchResults = async () => {
    try {
      const frames = await fetchDanceFrames();
      setDanceFrames(frames);
      console.log("Dance frames fetched:", frames);
    } catch (error) {
      console.error("Failed to fetch dance frames:", error);
    }
  };

  const toggleActivity = () => {
    setIsActive((prev) => {
      if (prev) {
        setTimeout(fetchResults, 3000);
      }
      if (videoRef.current) {
        prev ? videoRef.current.pause() : videoRef.current.play();
      }
      return !prev;
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-[80svh]">
      <div className="w-full md:w-1/2" ref={modelRef}>
        <Model videoRef={videoRef} isActive={isActive} />
      </div>
      <div className="w-full md:w-1/2" ref={cameraRef}>
        <Camera isActive={isActive} />
      </div>
      <ControlButton isActive={isActive} onClick={toggleActivity} />
      {!isActive && danceFrames.length > 0 && (
        <ResultsDisplay danceFrames={danceFrames} />
      )}
    </div>
  );
};

export default DanceComponent;
