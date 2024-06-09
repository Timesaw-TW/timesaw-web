"use client";

import Lottie from "react-lottie";
import splashAnimation from "@public/lotties/splash.json";
import { merge } from "@/libs/tailwind";
import { FC } from "react";

interface Props {
  width?: string | number;
  height?: string | number;
}

const Splash: FC<Props> = ({ width = "5rem", height = "5rem" }) => {
  const lottieOption = {
    loop: true,
    autoplay: true,
    animationData: splashAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className={merge(
        "h-screen w-screen bg-soda-100",
        "flex items-center justify-center"
      )}
    >
      <Lottie options={lottieOption} width={width} height={height} />
    </div>
  );
};

export default Splash;
