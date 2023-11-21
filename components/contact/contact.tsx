'use client';

import { sendEmail } from '@/actions/sendEmail';
import { useSectionInView } from '@/lib/hooks';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SectionHeading from '../section-heading';
import SubmitBtn from './submit-btn';

export default function Contact() {
  const { ref } = useSectionInView('Contact');

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact Me</SectionHeading>
      <p className="text-gray-700 -mt-6">
        Contact me directly{' '}
        <a href="mailto:robin.dang@live.se" className="underline">
          here
        </a>{' '}
        or through this form.
      </p>
      <form
        className="mt-10 flex flex-col"
        action={async (formData: FormData) => {
          const { error } = await sendEmail(formData);
          if (error) {
            toast.error(error);
            return;
          }
          toast.success('Email sent successfully!');
        }}
      >
        <input
          type="email"
          name="senderEmail"
          required
          maxLength={500}
          className="h-14 rounded-lg borderBlack px-4"
          placeholder="Your Email"
        />
        <textarea
          name="senderMessage"
          className="borderBlack h-52 my-3 rounded-lg p-4"
          required
          maxLength={5000}
          placeholder="Message"
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
}
