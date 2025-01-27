import { motion } from "framer-motion";

export default function IntroText() {
  return (
    <motion.h1
      className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="font-bold">Oh, hi there!</span> I'm{" "}
      <span className="font-bold">Robin</span>, a curious
      <span className="font-bold"> software engineer</span> who loves building
      cool things and learning new stuff. If you've stumbled here,{" "}
      <span className="italic">what a pleasant surprise! </span>
      <span className="underline">
        <a href="https://www.linkedin.com/in/robin-dang/"> Let’s connect!</a>
      </span>
    </motion.h1>
  );
}
