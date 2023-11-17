import profilePic from '@/public/robin.jpg';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Avatar() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          <Image
            className="h-24 w-24 rounded-full object-cover shadow-xl border-[0.35rem] border-white"
            alt="Portrait"
            src={profilePic}
            width="192"
            height="192"
            quality="95"
            priority={true}
          />
        </motion.div>
        <motion.span
          className="absolute bottom-0 right-0 text-4xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 125,
            delay: 0.1,
            duration: 0.7,
          }}
        >
          👋
        </motion.span>
      </div>
    </div>
  );
}
