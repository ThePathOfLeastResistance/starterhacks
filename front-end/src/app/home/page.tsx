"use client";

import Model from "@/components/model";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Spline from "@splinetool/react-spline";
import styled from "styled-components";

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
  position: absolute;
  height: 600px;
  width: 600px;
  border: 3px solid while;
`;

const Hero = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default function Home() {
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".trigger",
          start: "5% 5%",
          end: "+=2000",
          scrub: true,
          pin: true,
          markers: true,
        },
      });
      tl.to(".trigger", { x: -500, y: -200 }, 0);
      tl.to(tl.rotation, { x: -Math.PI / 14, z: Math.PI / 36 }, 3);
      tl.to(tl.scale, { x: 0.8, y: 0.8, z: 0.8 }, 0);
    },
    { scope: container }
  );

  return (
    <Body ref={container}>
      <Hero id="hero">
        <div className="p-20">
          <h1 className="text-center p-20">
            DANCE THE NIGHT <br />
            AWAY TODAY
          </h1>
        </div>
        <Trigger className="trigger">
          <Spline
            scene="https://prod.spline.design/o1ONSc8QZYOX9Hwg/scene.splinecode"
            className="box"
          />
        </Trigger>
      </Hero>
      <div id="part1" className="flex row">
        <div className="part1-info flex column">
          <h2>PLAY LIKE A PRO.</h2>
          <p>
            With these keyboards, youll get proper bounce, a bit of *click*, and
            lots of satisfaction.
          </p>
          <button>Make a keyboard - Its easy!</button>
        </div>
      </div>

      <div id="part2" className="flex row">
        <div className="part2-info flex column">
          <h2>CUSTOMIZE ALL THE WAY.</h2>
          <p>
            Its all yours! Change the colors as you like. Make them purple,
            green, red, anything.
          </p>

          <button>Customize a Keyboard</button>
        </div>
        <div></div>
      </div>

      <div id="part3" className="flex column">
        <h2>#Spline3DAndGSAPAnimations</h2>
        <a href="https:twitter.com/juxtopposed" target="_blank">
          By @Juxtopposed
        </a>
      </div>
    </Body>
  );
}

// }
// "use client";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger, useGSAP);
// }

// import styled from "styled-components";

// const Box = styled.div`
//   background-color: black;
//   width: 10vw;
//   height: 10vw;
// `;

// export default function Homepage() {
//   const container = useRef<HTMLDivElement>(null);

//   useGSAP(
//     () => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: "part1",
//           start: "top top",
//           end: "bottom top",
//           scrub: 1,
//           pin: true,
//           markers: true,
//         },
//       });
//       tl.to(tl.rotation,
//     },
//     { scope: container }
//   );
//   return (
//     <main
//       ref={container}
//       className="flex min-h-screen flex-col items-center justify-between p-24 landing-page"
//     >
//
//       <div id="hero" className="flex row">
//         <h1>
//           YOUR
//           <br />
//           GAMES.
//           <br />
//           YOUR
//           <br />
//           <div className="keyboard">
//             <span className="key">K</span>
//             <span className="key">E</span>
//             <span className="key">Y</span>
//             <span className="key">B</span>
//             <span className="key">O</span>
//             <span className="key">A</span>
//             <span className="key">R</span>
//             <span className="key">D</span>
//           </div>
//         </h1>
//       </div>

//       <div id="part1" className="flex row">
//         <div></div>
//         <div className="part1-info flex column">
//           <h2>PLAY LIKE A PRO.</h2>
//           <p>
//             With these keyboards, youll get proper bounce, a bit of *click*, and
//             lots of satisfaction.
//           </p>
//           <button>Make a keyboard - Its easy!</button>
//         </div>
//       </div>

//       <div id="part2" className="flex row">
//         <div className="part2-info flex column">
//           <h2>CUSTOMIZE ALL THE WAY.</h2>
//           <p>
//             Its all yours! Change the colors as you like. Make them purple,
//             green, red, anything.
//           </p>

//           <button>Customize a Keyboard</button>
//         </div>
//         <div></div>
//       </div>

//       <div id="part3" className="flex column">
//         <h2>#Spline3DAndGSAPAnimations</h2>
//         <a href="https://twitter.com/juxtopposed" target="_blank">
//           By @Juxtopposed
//         </a>
//       </div>
//     </main>
//   );
// }
