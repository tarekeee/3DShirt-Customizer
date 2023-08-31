import React, { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
const Backdrop = () => {
  const shadows = useRef(null);
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.25}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        ambient={0.25}
        position={[5, 5, -10]}
        radius={10}
        intensity={0.55}
      />
      <RandomizedLight
        amount={4}
        ambient={0.25}
        position={[5, -5, 10]}
        radius={5}
        intensity={0.5}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
