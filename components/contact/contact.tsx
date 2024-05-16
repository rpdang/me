// 'use client';

// import { useSectionInView } from '@/lib/hooks';
// import { motion } from 'framer-motion';
// import SectionHeading from '../section-heading';

// export default function Contact() {
//   const { ref } = useSectionInView('Contact');

//   return (
//     <motion.section
//       ref={ref}
//       id="contact"
//       className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//       viewport={{
//         once: true,
//       }}
//     >
//       <SectionHeading>Contact Me</SectionHeading>
//       <p className="text-gray-700 -mt-6 dark:text-white/80">
//         Contact me directly{' '}
//         <a href="mailto:robin.dang@live.se" className="underline">
//           here
//         </a>{' '}
//         {/*or through this form.*/}
//       </p>
//       {/*
//       <form
//         className="mt-10 flex flex-col dark:text-black"
//         action={async (formData: FormData) => {
//           const { error } = await sendEmail(formData);
//           if (error) {
//             toast.error(error);
//             return;
//           }
//           toast.success('Email sent successfully!');
//         }}
//       >
//         <input
//           type="email"
//           name="senderEmail"
//           required
//           maxLength={500}
//           className="h-14 rounded-lg borderBlack px-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
//           placeholder="Your Email"
//         />
//         <textarea
//           name="senderMessage"
//           className="borderBlack h-52 my-3 rounded-lg p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
//           required
//           maxLength={5000}
//           placeholder="Message"
//         />
//         <SubmitBtn />
//       </form> */}
//     </motion.section>
//   );
// }
