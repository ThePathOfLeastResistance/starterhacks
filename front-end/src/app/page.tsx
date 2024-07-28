// pages/index.tsx

"use client";
import React, { useRef } from "react";
import CameraComponent from "@/components/camera";
import Model from "@/components/model";
import ScreenshotManager from "@/components/ScreenshotManager";

export default function Home() {
  const cameraRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full h-full max-w-7xl rounded-lg shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row h-[80svh]">
          <div className="w-full md:w-1/2" ref={modelRef}>
            <Model />
          </div>
          <div className="w-full md:w-1/2" ref={cameraRef}>
            <CameraComponent />
          </div>
        </div>
        <ScreenshotManager cameraRef={cameraRef} modelRef={modelRef} />
      </div>
    </main>
  );
}
