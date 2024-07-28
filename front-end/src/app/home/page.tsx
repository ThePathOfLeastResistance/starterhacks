"use client";

import Model from "@/components/model";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import styled from "styled-components";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Homepage() {
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      tl.to(tl.rotation, { x: -Math.PI / 14, z: Math.PI / 36 }, 0);
      tl.to(tl.position, { x: -500, y: -200 }, 0);
      tl.to(tl.scale, { x: 3, y: 3, z: 3 }, 0);
    },
    { scope: container }
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 landing-page">
      <div className="landing-page">
        <div className="big-text">
          <h1>NEW GAMES, NEW CHALLENGES</h1>
        </div>
        <div className="model">
          <Model ref={container} />
        </div>
        <div className="feature-text">
          <h2>EXPERIENCE THE FUTURE OF GAMING</h2>
          <p>
            With our latest keyboards, you get the perfect combination of
            performance and comfort. Customize your gaming experience with ease
            and play like a pro.
          </p>
        </div>
        <div className="feature-pic"></div>
      </div>
    </main>
  );
}
