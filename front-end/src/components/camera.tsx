"use client";
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const CameraComponent: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  return (
    <div className="p-4 bg-gray-50 h-full flex flex-col">
      <div className="rounded-lg overflow-hidden shadow-md flex-grow">
        <Webcam
          ref={webcamRef}
          audio={false}
          imageSmoothing={true}
          mirrored={true}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CameraComponent;
