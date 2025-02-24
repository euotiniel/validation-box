import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 dark:bg-[#0A0A0A]">
      <div className="max-w-[400px] w-full flex flex-col items-center dark:bg-[#050505] py-10 px-6 md:py-14 md:px-9 rounded-md border border-dashed dark:border-neutral-700 gap-2.5">
        <h1 className="text-center text-5xl md:text-7xl font-mono text-black dark:text-neutral-200">404</h1>
        <p className="font-mono font-bold my-1.5 text-center text-black dark:text-neutral-200">Ops! Something went wrong</p>
        <p className="text-center text-black dark:text-neutral-400">
          It looks like the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="text-black dark:text-white bg-neutral-100 dark:bg-neutral-900 rounded-md border-neutral-700 dark:border-neutral-600 py-2 px-6 opacity-70 mt-5"
        >
          Go to home
        </Link>
      </div>
    </div>
  );
}