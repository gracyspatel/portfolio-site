import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-[32px] items-center sm:items-start mx-auto max-w-2xl p-8 sm:p-4 py-28 sm:py-28 lg:py-32">
            <div className="text-left">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">Shaping Ideas Through Technology</h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Computer Science Engineer | ML Learner | Designer & Developer | Quietly Creative & Minimal</p>
            </div>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Link
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  // className="dark:invert"
                  src="/bars-progress-solid.svg"
                  alt="Projects Link"
                  width={20}
                  height={20}
                />
                View Projects
              </Link>
              <Link
              //  dark:hover:bg-[#1a1a1a]
                className="rounded-full border border-solid border-black/[.1]  transition-colors flex items-center justify-center gap-2 hover:bg-[#f2f2f2] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-auto"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  // className="dark:invert"
                  src="/download-solid.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                />
                Download Resume
              </Link>
            </div>
          </div>
  );
}
