import { motion } from 'framer-motion';

export default function IntroText() {
  return (
    <motion.h1
      className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="font-bold">Hello!</span> I'm{' '}
      <span className="font-bold">Robin</span> and I'm a versatile
      <span className="font-bold"> software engineer</span> and I'm eager to
      take on new <span className="italic">challenges</span> and explore
      exciting <span className="italic">opportunities</span>.{' '}
      <span className="underline">Let's connect!</span>
    </motion.h1>
  );
}
