export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        &copy; 2023 Robin | All rights reserved | <a href="https://robin-dang.vercel.app">https://robin-dang.vercel.app</a>
      </small>
      <p className="text-xs">
        <span className="font-semibold">This website</span> is built using React
        & Next.js (App router & Server Actions), Typescript, Tailwind CSS,
        Framer Motion, React Email & Resend, Vercel Hosting.
      </p>
    </footer>
  );
}
