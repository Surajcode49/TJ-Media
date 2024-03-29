import { a, useSpring } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import islandScene from "../assets/3d/island.glb";

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) {
  const islandRef = useRef();
  const cameraRef = useRef();
  const { gl, viewport, camera } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  // Zoom animation spring
  const { zoom } = useSpring({
    zoom: isRotating ? 3 : 1, // Define the zoom factor
    config: { mass: 1, tension: 210, friction: 20, precision: 0.0001 },
  });

  useEffect(() => {
    // Update camera position based on zoom animation
    if (cameraRef.current) {
      const zoomFactor = zoom.getValue(); // Get current zoom factor
      cameraRef.current.position.z = zoomFactor * 5; // Adjust camera position
    }
  }, [zoom]);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Rest of your code ...

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      // Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI]
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <a.group ref={islandRef} {...props}>
      <a.camera ref={cameraRef} position={[0, 0, 5]} /> {/* Define camera with initial position */}
      {/* Your island meshes */}
    </a.group>
  );
}
