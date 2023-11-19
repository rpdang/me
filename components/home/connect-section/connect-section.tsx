import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';

export default function ConnectSection() {
  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:px-28 items-center justify-between gap-2 px-4 text-lg font-medium"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Link
        href="#contact"
        className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
      >
        Contact me here{' '}
        <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
      </Link>

      <a
        href="/CV.pdf"
        download
        className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer border border-black/10"
      >
        Download CV{' '}
        <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
      </a>

      <a
        href="https://linkedin.com/in/robin-dang"
        target="_blank"
        className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-110 transition cursor-pointer border border-black/10"
      >
        <BsLinkedin />
      </a>

      <a
        href="https://github.com/rpdang"
        target="_blank"
        className="bg-white text-[1.35rem] p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-110 transition cursor-pointer border border-black/10"
      >
        <FaGithubSquare />
      </a>
    </motion.div>
  );
}
