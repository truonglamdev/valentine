import React, { useEffect, useRef } from "react";
import Fireworks from "fireworks-js";

const Animation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const fireworks = new Fireworks(containerRef.current, {
        // Cấu hình pháo hoa
        hue: {
          min: 0,
          max: 360,
        },
        delay: {
          min: 15,
          max: 30,
        },
        rocketsPoint: {
          min: 50,
          max: 50,
        },
        lineWidth: {
          explosion: {
            min: 1,
            max: 3,
          },
          trace: {
            min: 1,
            max: 2,
          },
        },
        brightness: {
          min: 50,
          max: 80,
        },
        decay: {
          min: 0.015,
          max: 0.03,
        },
        mouse: {
          click: false,
          move: false,
          max: 1,
        },
      });

      fireworks.start();

      // Dọn dẹp khi component unmount
      // return () => {
      //   fireworks.stop();
      // };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        zIndex: 9999,
      }}
    />
  );
};

export default Animation;
