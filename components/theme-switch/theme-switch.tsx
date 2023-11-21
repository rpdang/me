'use client';

import { useTheme } from '@/context/theme-context';
import { motion } from 'framer-motion';
import { BsMoon, BsSun } from 'react-icons/bs';

export default function ThemeSwitch() {
  const { theme, toggle } = useTheme();

  return (
    <motion.button
      className="fixed bottom-5 right-5 bg-white h-[3rem] w-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
      onClick={toggle}
      initial={{ rotate: 0, scale: 0 }}
      animate={{ rotate: 720, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 1,
      }}
    >
      {theme === 'light' ? <BsSun /> : <BsMoon />}
    </motion.button>
  );
}
