import { motion } from 'framer-motion';

export default function IntroText() {
  return (
    <motion.p
      className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="font-bold">Hello!</span> I'm{' '}
      <span className="font-bold">Robin</span> and I'm a{' '}
      <span className="font-bold"> software engineer</span> based in Stockholm
      with <span className="font-bold"> +2 years</span> of experience. I'm all
      for new <span className="italic">challenges</span> and{' '}
      <span className="italic">experiences</span>.{' '}
      <span className="underline">Let's connect!</span>
    </motion.p>
  );
}
