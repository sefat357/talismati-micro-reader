"use client";

import { Canvas } from "@react-three/fiber";
import { ShaderPlane } from "./background-paper-shaders";

export function LoginBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                {/* We use a purple-indigo aesthetic to match the current Login page colors */}
                <ShaderPlane position={[0, 0, 0]} color1="#4f46e5" color2="#7c3aed" />
            </Canvas>
        </div>
    );
}
