"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // When pathname changes, trigger rolling logo transition for 550ms
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 580);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="relative w-full flex-1 flex flex-col min-h-0">
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="rolling-logo-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md"
          >
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl border border-pink-100 bg-white shadow-xl">
              <motion.img
                src="/logo-moniresh-v2.png"
                alt="MONIRESH Logo"
                className="h-16 w-16 rounded-2xl object-cover shadow-sm border border-pink-100"
                animate={{
                  rotate: [0, 360],
                  scale: [0.9, 1.1, 1],
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mt-4 text-[18px] font-black tracking-tight text-black"
              >
                MONIRESH
              </motion.div>
              <div className="mt-1 text-[14px] font-bold tracking-widest uppercase text-moni-600">
                Research Operating System
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex-1 flex flex-col min-h-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
