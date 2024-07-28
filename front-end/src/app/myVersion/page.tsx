"use client";
import React, { useState, useEffect } from "react";
import { FadeText } from "@/components/ui/fadeUpText";
import { AnimatePresence } from "framer-motion";

const Page = () => {
  const [currentText, setCurrentText] = useState(0);
  const textConfigs = [
    {
      text: "Are",
      duration: 0.3,
      delay: 0.2,
    },
    {
      text: "You🫵",
      duration: 0.5,
      delay: 0.1,
    },
    {
      text: "READYYYY?",
      duration: 0.7,
      delay: 0,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentText < textConfigs.length - 1) {
        setCurrentText(currentText + 1);
      }
    }, (textConfigs[currentText].duration + textConfigs[currentText].delay + 0.5) * 1000);

    return () => clearTimeout(timer);
  }, [currentText]);

  return (
    <div className="flex justify-center items-center bg-black min-h-screen flex-col">
      <AnimatePresence mode="wait">
        <FadeText
          key={currentText}
          className="text-8xl font-bold text-white"
          direction="up"
          framerProps={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -50 },
            transition: {
              duration: textConfigs[currentText].duration,
              delay: textConfigs[currentText].delay,
            },
          }}
          text={textConfigs[currentText].text}
        />
        <button>Let's GOO</button>
      </AnimatePresence>
    </div>
  );
};

export default Page;
