import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <h1 className="text-2xl font-extrabold tracking-tight text-balance text-gray-900 sm:text-2xl">Gracy Patel</h1>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <Image
                  // className="dark:invert"
                  src="/bars-solid.svg"
                  alt="Projects Link"
                  width={20}
                  height={20}
                />
            </button>
          </div>
          <div className="bg-[#efefef] rounded-full py-1 px-1 hidden lg:flex lg:gap-x-2">
            <a href="/" className="text-sm/6 py-1 px-6 rounded-full flex items-center justify-center gap-2 font-semibold text-gray-900 hover:bg-[#ffffff]"> <Image
                  // className="dark:invert"
                  src="/user-solid.svg"
                  alt="Home Link"
                  width={14}
                  height={14}
                />
                Home</a>
            <a href="/about" className="text-sm/6 py-1 px-6 rounded-full flex items-center justify-center gap-2 font-semibold text-gray-900 hover:bg-[#ffffff]"> <Image
                  // className="dark:invert"
                  src="/user-solid.svg"
                  alt="About Link"
                  width={14}
                  height={14}
                />
                About</a>
                 <a href="/skills" className="text-sm/6 py-1 px-6 rounded-full flex items-center justify-center gap-2 font-semibold text-gray-900 hover:bg-[#ffffff]"> <Image
                  // className="dark:invert"
                  src="/envelope-solid.svg"
                  alt="Skills Link"
                  width={14}
                  height={14}
                />
                Skills</a>
                 <a href="/projects" className="text-sm/6 py-1 px-6 rounded-full flex items-center justify-center gap-2 font-semibold text-gray-900 hover:bg-[#ffffff]"> <Image
                  // className="dark:invert"
                  src="/grip-solid.svg"
                  alt="Projects Link"
                  width={14}
                  height={14}
                />
                Projects</a>
                
          </div>
          <div className="hidden lg:flex lg:gap-x-6 lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 flex items-center justify-center gap-2 font-semibold text-gray-900"> <Image
                  // className="dark:invert"
                  src="/linkedin-in-brands.svg"
                  alt="LinkedIn Link"
                  width={16}
                  height={16}
                />
                </a>
                <a href="#" className="text-sm/6 flex items-center justify-center gap-2 font-semibold text-gray-900"> <Image
                  // className="dark:invert"
                  src="/github-brands.svg"
                  alt="Github Link"
                  width={16}
                  height={16}
                />
                </a>
          </div>
        </div>
  );
}
