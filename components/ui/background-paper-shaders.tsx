"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
varying float vElevation;
uniform float uTime;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Create massive, slow, elegant sweeping waves
  float elevation = sin(modelPosition.x * 0.3 + uTime * 0.2) * 0.8
                  + cos(modelPosition.y * 0.2 + uTime * 0.15) * 0.8;
  modelPosition.z += elevation;
  vElevation = elevation;
  
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
`;

const fragmentShader = `
varying vec2 vUv;
varying float vElevation;

void main() {
  // Deep, premium color palette
  // Deepest shadow has a very faint, almost imperceptible red tint for the brand
  vec3 shadowColor = vec3(0.04, 0.0, 0.0);
  
  // Peaks catch a dark, moody silver light
  vec3 highlightColor = vec3(0.15, 0.15, 0.18);

  // Mix based on the wave height
  float mixValue = (vElevation + 1.6) * 0.3; // Normalize the elevation
  vec3 finalColor = mix(shadowColor, highlightColor, mixValue);
  
  // Add a massive, soft radial vignette to blend perfectly into the black UI
  float distance = length(vUv - 0.5);
  float vignette = smoothstep(0.8, 0.1, distance);
  
  gl_FragColor = vec4(finalColor * vignette, 1.0);
}
`;

export function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    // Flat orientation, scaled massively to cover the whole viewport
    <mesh rotation={[0, 0, 0]} scale={[15, 15, 1]} position={[0, 0, -2]}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        wireframe={false}
      />
    </mesh>
  );
}
