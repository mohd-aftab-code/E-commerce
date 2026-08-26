"use client";

import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Box, Layers, Monitor } from "lucide-react";

// Model Component
function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

// Preload models for faster switching
useGLTF.preload("/3d/business_card_viewer.glb");
useGLTF.preload("/3d/one_choice_33.5_better_roll_up_banner.glb");
useGLTF.preload("/3d/sony_playstation_1_dual_shock_box_packaging.glb");

const models = [
  {
    id: "business-card",
    name: "Business Cards",
    description: "Premium thick paper with high-quality printing. Spin the model to check the details.",
    path: "/3d/business_card_viewer.glb",
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: "box",
    name: "Custom Packaging",
    description: "High-quality custom mailer boxes designed to protect and impress your customers.",
    path: "/3d/sony_playstation_1_dual_shock_box_packaging.glb",
    icon: <Box className="w-5 h-5" />,
  },
  {
    id: "banner",
    name: "Roll-up Banner",
    description: "Durable and vivid large format banners, perfect for any trade show or event.",
    path: "/3d/one_choice_33.5_better_roll_up_banner.glb",
    icon: <Monitor className="w-5 h-5" />,
  },
];

export function RealInteractive3DShowcase() {
  const [activeModel, setActiveModel] = useState(models[0]);

  if (!activeModel) return null;

  return (
    <section className="bg-white py-16 sm:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Text Content Area */}
          <ScrollReveal direction="left" className="w-full lg:w-5/12 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 text-[#7B8B77] font-bold tracking-widest text-sm mb-4 uppercase">
              <Box className="w-4 h-4" /> 360° Interactive View
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a202c] tracking-tight mb-6 leading-[1.15]">
              Experience the <span className="text-[#3b4b6b]">Digital Twin</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Drag, zoom, and rotate with your mouse to inspect the quality and structure of our products from absolutely every angle before you place an order.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 mb-8">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setActiveModel(model)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer ${
                    activeModel.id === model.id
                      ? "bg-[#1a202c] text-white shadow-xl scale-105"
                      : "bg-[#F0F4F8] text-[#2A2646] hover:bg-gray-200"
                  }`}
                >
                  {model.icon} {model.name}
                </button>
              ))}
            </div>

            <div className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl">
              <h3 className="font-bold text-[#1a202c] text-xl mb-2">{activeModel.name}</h3>
              <p className="text-gray-500">{activeModel.description}</p>
            </div>
          </ScrollReveal>

          {/* 3D Showcase Interactive Area */}
          <ScrollReveal direction="right" className="w-full lg:w-7/12 h-[500px] sm:h-[650px] relative flex items-center justify-center cursor-grab active:cursor-grabbing">
            
            <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-sm font-bold text-gray-700">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Click & Drag to Rotate
            </div>

            <div className="absolute inset-0 z-10 pointer-events-auto">
              <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
                {/* Adding key forces Stage to perfectly recalculate bounds for the new model */}
                <Suspense fallback={null} key={activeModel.id}>
                  <Stage preset="soft" intensity={0.8} environment="city" adjustCamera={1.5}>
                    <Model path={activeModel.path} />
                  </Stage>
                  {/* minDistance/maxDistance prevents user from zooming in too much or out too much */}
                  <OrbitControls makeDefault autoRotate autoRotateSpeed={0.8} enablePan={false} enableZoom={true} minDistance={2} maxDistance={8} />
                </Suspense>
              </Canvas>
            </div>

          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
