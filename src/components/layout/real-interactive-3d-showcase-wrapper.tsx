"use client";

import dynamic from "next/dynamic";

export const RealInteractive3DShowcaseWrapper = dynamic(
  () => import("./real-interactive-3d-showcase").then((mod) => mod.RealInteractive3DShowcase),
  { ssr: false }
);
