"use client";

import { motion } from "framer-motion";

export default function ArrowAnimation({ arrowData, onComplete }) {
  if (!arrowData) return null;

  return (
    <motion.img
      src="/arrowAnimate.png"
      alt="arrow"
      initial={{
        top: arrowData.startY - 60,
        left: arrowData.startX - 60,
        width: 100,
        height: 100,
        rotate: -45,
        opacity: 0.5,
      }}
      animate={{
        top: arrowData.endY,
        left: arrowData.endX,
        width: 200,
        height: 200,
        rotate: 0,
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
      }}
      onAnimationComplete={onComplete}
      style={{
        position: "fixed",
        width: 200,
        height: 200,
        zIndex: 9999,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}