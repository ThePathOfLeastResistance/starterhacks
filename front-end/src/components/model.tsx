import Spline from "@splinetool/react-spline";

import React from "react";

const Model = () => {
  return (
    <div className="h-[400px] md:h-[600px] relative">
      <Spline
        scene="https://prod.spline.design/o1ONSc8QZYOX9Hwg/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
};

export default Model;
