import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

import SkyScene from "../assets/3d/space_nebula_hdri_panorama_360_skydome.glb"; // Import the new GLB file

export function Sky() {
  const sky = useGLTF(SkyScene); // Use the new GLTF file
  const skyRef = useRef();

  useEffect(() => {
    let animationId = null;

    const animate = () => {
      // Rotate the sky continuously
      skyRef.current.rotation.x += 0.01; // Adjust speed as needed

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Adjust scale to cover the entire background
  useEffect(() => {
    if (sky.scene) {
      // Calculate scale based on the size of the // this code is use for the randering the backgornd image 
      const scaleFactor = -100; // Adjust this value as needed
      skyRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
      skyRef.current.position.z = -10; // Adjust the z position to place it further away from the camera { this wil set the camera postion }
    }
  }, [sky.scene]);

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene.clone(true)} />
    </mesh>
  );
}
