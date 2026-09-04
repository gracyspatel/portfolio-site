import Image from "next/image";
import Link from "next/link";
import data from "@/data/portfolio.json";

export default function Navbar() {
  return (
    <div
      className="flex items-center justify-between px-4 sm:px-6 lg:px-16 xl:px-24 py-6"
      aria-label="Global"
    >
      <div className="flex lg:flex-1">
        <Link href="/" className="-m-1.5 p-1.5">
          <h1 className="text-2xl font-extrabold tracking-tight text-balance text-gray-900 sm:text-2xl">
            Gracy Patel
          </h1>
        </Link>
      </div>

      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 transition-colors duration-200 hover:bg-[#efefef]"
        >
          <Image src="/bars-solid.svg" alt="Menu" width={20} height={20} />
        </button>
      </div>

      <div className="bg-[#efefef] rounded-full py-1 px-1 hidden lg:flex lg:gap-x-2">
        <Link
          href="/"
          className="text-sm/6 py-1 px-6 rounded-full flex items-center justify-center gap-2 font-semibold text-gray-900 transition-colors duration-200 hover:bg-white"
        >
          <Image src="/user-solid.svg" alt="Home Link" width={14} height={14} />
          Home
        </Link>
        <Link
          href="/#projects"
          className="text-sm/6 py-1 px-6 rounded-full flex items-center justify-center gap-2 font-semibold text-gray-900 transition-colors duration-200 hover:bg-white"
        >
          <Image src="/grip-solid.svg" alt="Projects Link" width={14} height={14} />
          Projects
        </Link>
        <Link
          href="/#experience"
          className="text-sm/6 py-1 px-6 rounded-full flex items-center justify-center gap-2 font-semibold text-gray-900 transition-colors duration-200 hover:bg-white"
        >
          <Image src="/user-solid.svg" alt="Experience Link" width={14} height={14} />
          Experience
        </Link>
        {/* <span
          className="text-sm/6 py-1 px-6 rounded-full flex items-center justify-center gap-2 font-semibold text-gray-400 cursor-not-allowed select-none"
          title="Coming soon"
        >
          Blog
        </span> */}
        <Link
          href="/#contact"
          className="text-sm/6 py-1 px-6 rounded-full flex items-center justify-center gap-2 font-semibold text-gray-900 transition-colors duration-200 hover:bg-white"
        >
          <Image src="/envelope-solid.svg" alt="Contact Link" width={14} height={14} />
          Contact
        </Link>
      </div>

      <div className="hidden lg:flex lg:gap-x-6 lg:flex-1 lg:justify-end">
        <Link
          href={data.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm/6 flex items-center justify-center gap-2 font-semibold text-gray-900 transition-opacity duration-200 hover:opacity-60"
        >
          <Image src="/linkedin-in-brands.svg" alt="LinkedIn Link" width={16} height={16} />
        </Link>
        <Link
          href={data.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm/6 flex items-center justify-center gap-2 font-semibold text-gray-900 transition-opacity duration-200 hover:opacity-60"
        >
          <Image src="/github-brands.svg" alt="Github Link" width={16} height={16} />
        </Link>
      </div>
    </div>
  );
}