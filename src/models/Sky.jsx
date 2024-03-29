import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

import skyScene from "../assets/3d/skycvbnm.glb";

export function Sky() {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();

  useEffect(() => {
    let animationId = null;

    const animate = () => {
      // Rotate the sky continuously
      skyRef.current.rotation.z -= 0.01; // Adjust speed as needed

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
