import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col gap-[32px] items-center sm:items-start mx-auto max-w-2xl p-8 sm:p-4 py-8 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
            System Overview: Gracy Edition
          </h2>
          <p>A minimal mind shaped by code, design, and machine learning.</p>
          <p className="mt-8 mb-2 text-lg text-pretty sm:text-lg/8">
            I’m Gracy Patel — A <b>Computer Science engineer</b> crafting at the
            crossroads of logic, design, and intelligent systems. Passionate
            about building clean, intuitive interfaces (
            <b>full-stack development</b>) while experimenting with the creative
            possibilities of <b>machine learning</b> and <b>deep learning</b>.
            Always learning, always iterating.
          </p>

          <p className="mt-8 mb-2 text-lg text-pretty sm:text-lg/8">
            Beyond code and outside screen, I'm a <b>artist</b> with a love for
            painting and how it shapes patterns, aesthetics, and emotion flow
            into each project — whether visual or technical. Art grounds me —
            and inspires the way I approach <b>systems</b>, <b>patterns</b>, and &nsbp;
            <b>design</b>.
          </p>

          <p className="mt-8 mb-2 text-lg text-pretty sm:text-lg/8">
            Currently exploring how minimal design and intelligent systems can
            coexist to build tools that are both functional and beautiful.
          </p>
        </div>
        <div className="grid grid-cols-6 gap-x-8 gap-y-6 mt-12 text-base/7 font-semibold">
          <Link
            href="#"
            className="text-sm/6 flex items-center gap-2 font-semibold text-gray-900"
          >
            <Image
              // className="dark:invert"
              src="/linkedin-in-brands.svg"
              alt="LinkedIn Link"
              width={16}
              height={16}
            />
          </Link>
          <Link
            href="#"
            className="text-sm/6 flex items-center gap-2 font-semibold text-gray-900"
          >
            {" "}
            <Image
              // className="dark:invert"
              src="/github-brands.svg"
              alt="Github Link"
              width={16}
              height={16}
            />
          </Link>
          <Link
            href="#"
            className="text-sm/6 flex items-center gap-2 font-semibold text-gray-900"
          >
            {" "}
            <Image
              // className="dark:invert"
              src="/envelope-solid-black.svg"
              alt="Envelope"
              width={16}
              height={16}
            />
          </Link>
          <Link
            href="#"
            className="text-sm/6 flex items-center gap-2 font-semibold text-gray-900"
          >
            {" "}
            <Image
              // className="dark:invert"
              src="/download-solid.svg"
              alt="Download Button"
              width={16}
              height={16}
            />
          </Link>
          <Link
            href="#"
            className="text-sm/6 flex items-center gap-2 font-semibold text-gray-900"
          >
            {" "}
            <Image
              // className="dark:invert"
              src="/code-solid.svg"
              alt="Code Leet Code"
              width={16}
              height={16}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
