"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex-1 flex flex-col min-h-0"
    >
      {children}
    </motion.div>
  );
}
