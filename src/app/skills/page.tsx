import Image from "next/image";

export default function Contact() {
  return (
    <div className="flex flex-col items-center sm:items-start mx-auto max-w-2xl p-8 sm:p-4 py-8 sm:py-8 lg:py-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Capabilities
          </h2>
          <p>Tools I trust to bring ideas to life.</p>
          <p className="mt-6 text-lg/8 text-gray-700">These tools and technologies shape how I think, build, and create. A blend of design, development, and machine learning — they define the systems behind who I am and what I make.</p>
          <dl className="mt-10 max-w-xl space-y-2 text-base/7 text-gray-600 lg:max-w-none">
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
               <Image
                                 className="absolute top-1 left-1 size-5"
                                 src="/linkedin-in-brands.svg"
                                 alt="LinkedIn Link"
                                 width={12}
                                 height={12}
                               />
                Technical Skills : 
              </dt>
              <dd className="inline"> &nbsp; C, C++, JavaScript, Python,Java,OOPS, Data Structure and Algorithm, DBMS, Data Visualization, Web Scrapping, Linux</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
               <Image
                  className="absolute top-1 left-1 size-5"
                  src="/linkedin-in-brands.svg"
                  alt="LinkedIn Link"
                  width={12}
                  height={12}
                />
                Database : 
              </dt>
              <dd className="inline"> &nbsp; MongoDB, MySQL, PostgreSql</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
               <Image
                  className="absolute top-1 left-1 size-5"
                  src="/linkedin-in-brands.svg"
                  alt="LinkedIn Link"
                  width={12}
                  height={12}
                />
                Developers Tools :
              </dt>
              <dd className="inline"> &nbsp; VS Code, Google Collab,Google Data Studio, GitHub, Anaconda: Jupyter</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
               <Image
                  className="absolute top-1 left-1 size-5"
                  src="/linkedin-in-brands.svg"
                  alt="LinkedIn Link"
                  width={12}
                  height={12}
                />
                Technologies/Frameworks :
              </dt>
              <dd className="inline"> &nbsp; ReactJS, Redux,NodeJS, ExpressJS, NextJS, Flask, Git</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <Image
                  className="absolute top-1 left-1 size-5"
                  src="/linkedin-in-brands.svg"
                  alt="LinkedIn Link"
                  width={12}
                  height={12}
                />
                Soft Skills :
              </dt>
              <dd className="inline"> &nbsp; Presentation, Analytical, Teamwork, Problem-solving</dd>
            </div>
          </dl>
          </div>
  );
}