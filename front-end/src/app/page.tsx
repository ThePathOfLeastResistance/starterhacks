"use client";
import React, { useRef, useState } from "react";
import DanceComponent from "@/components/DanceComponent";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full h-full max-w-7xl rounded-lg shadow-xl overflow-hidden">
        <DanceComponent />
      </div>
    </main>
  );
}
