
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface AnimatedTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  duration?: number;
  delay?: number;
}

const AnimatedTransition = ({
  children,
  isVisible,
  duration = 0.5,
  delay = 0,
}: AnimatedTransitionProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration, delay, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedTransition;
