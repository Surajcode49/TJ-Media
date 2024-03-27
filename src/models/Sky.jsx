import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

import skyScene from "../assets/3d/sky.glb";

export function Sky() {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();

  useEffect(() => {
    let animationId = null;

    const animate = () => {
      // Rotate the sky continuously
      skyRef.current.rotation.y += 0.007;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene.clone(true)} />
    </mesh>
  );
}
