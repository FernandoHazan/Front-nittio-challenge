"use client";

import { motion } from "framer-motion";

export default function Hearts({ x, y, total = 8, onComplete }) {
  const hearts = Array.from({ length: total });

  return (
    <>
      {hearts.map((_, i) => {
        const angle = Math.random() * 2 * Math.PI;
        const distance = 60 + Math.random() * 40;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        const size = 20 + Math.random() * 10;

        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{ x: offsetX, y: offsetY, scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.17, 0.67, 0.83, 0.67] }}
            style={{
              position: "fixed",
              left: x,
              top: y,
              fontSize: size,
              zIndex: 9999,
              pointerEvents: "none",
            }}
            onAnimationComplete={i === total - 1 ? onComplete : undefined} // chama onComplete no último coração
          >
            ❤️
          </motion.div>
        );
      })}
    </>
  );
}