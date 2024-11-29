import React, { useEffect } from "react";
import { hourglass } from "ldrs";

const Loading = () => {
  useEffect(() => {
    hourglass.register();
  }, []);

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <l-hourglass
        size="60"
        bg-opacity="0.1"
        speed="1"
        color="#5046E5"
      ></l-hourglass>
    </div>
  );
};

export default Loading;
