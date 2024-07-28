"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Spline from "@splinetool/react-spline";
import styled from "styled-components";
import { FadeText } from "@/components/ui/fadeUpText";
import { AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const Body = styled.div`
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  margin: 0;
  padding: 20px;
`;

const Trigger = styled.div`
  height: 600px;
  width: 600px;
  position: absolute;
`;

const Hero = styled.div`
  background-color: #000000;
  color: #ffffff;
`;

export default function Home() {
  const container = useRef();

  const [currentText, setCurrentText] = useState(0);
  const textConfigs = [
    {
      text: "Are",
      duration: 0.3,
      delay: 10,
    },
    {
      text: "You",
      duration: 0.5,
      delay: 0.7,
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

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".trigger",
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          markers: true,
        },
      });
      tl.to(".trigger", { x: 450, y: 20 }, 0);
      tl.to(".trigger", { yPercent: 10, duration: 0.1 });
      tl.to(".trigger", { xPercent: -130, duration: 0.1 });
      tl.to(".trigger", { yPercent: 20, duration: 0.2 });
    },
    { scope: container }
  );

  const directToStart = () => {
    window.open("/", "_blank");
  };

  return (
    <Body ref={container}>
      <Hero id="hero">
        <div className="hero">
          <h1 className="text-center p-36">
            DANCE THE NIGHT <br />
            AWAY TODAY
          </h1>
        </div>
        <Trigger className="trigger">
          <Spline scene="https://prod.spline.design/o1ONSc8QZYOX9Hwg/scene.splinecode" />
        </Trigger>
        <div id="part1" className="flex row pt-[30vw]">
          <div className="part1-info flex column ">
            <h2>PLAY LIKE A PRO.</h2>
            <p>
              Transform your dance moves with professional guidance! Get
              personalized tips and step-by-step instructions to elevate your
              performance and dance like a pro.
            </p>
            <button className="button-47" onClick={directToStart}>
              Start Dance!
            </button>
          </div>
        </div>

        <div id="part2" className="flex row">
          <div className="part2-info flex column">
            <h2>CHALLENGE YOUR FRIENDS.</h2>
            <p>
              Turn up the heat and challenge your friends to a dance-off! Share
              your scores, compete for the top spot, and see who has the best
              moves in real-time.
            </p>

            <button className="button-47" onClick={directToStart}>
              Start
            </button>
          </div>
          <div></div>
        </div>

        <div id="part3" className="flex column">
          <h2>#START NOW</h2>
          <a href="https:twitter.com/juxtopposed" target="_blank">
            goooooooooooooooooooooooooo
          </a>
        </div>
      </Hero>
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
          <button>Lets GOO</button>
        </AnimatePresence>
      </div>
    </Body>
  );
}
