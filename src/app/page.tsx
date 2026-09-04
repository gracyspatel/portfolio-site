import Link from "next/link";
import data from "@/data/portfolio.json";
import ProjectsSection from "@/components/project-section";

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-16 xl:px-24 pt-10 pb-8 sm:pt-14 sm:pb-10 lg:pt-20 lg:pb-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              {data.name}
            </h1>
            <p className="mt-2 text-lg text-gray-600 sm:text-xl">
              {data.title}
            </p>
            <p className="mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
              {data.summary}
            </p>
            <div className="mt-5 flex gap-4 flex-wrap text-sm text-gray-600">
              <Link href={`mailto:${data.links.email}`} className="transition-colors duration-200 hover:text-gray-900 underline underline-offset-4">
                Email
              </Link>
              <Link href={data.links.github} target="_blank" className="transition-colors duration-200 hover:text-gray-900 underline underline-offset-4">
                GitHub
              </Link>
              <Link href={data.links.linkedin} target="_blank" className="transition-colors duration-200 hover:text-gray-900 underline underline-offset-4">
                LinkedIn
              </Link>
              <Link href={data.links.resume} target="_blank" className="transition-colors duration-200 hover:text-gray-900 underline underline-offset-4">
                Resume
              </Link>
            </div>
          </div>

          <div className="text-sm space-y-4 lg:pt-2 border-l border-gray-100 rounded-lg p-4 sm:p-6">
            {data.heroFacts.map((fact) => (
              <div key={fact.label}>
                <span className="text-xs uppercase tracking-wide text-gray-400">
                  {fact.label}
                </span>
                <p className="mt-0.5 text-gray-700">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="px-4 sm:px-6 lg:px-16 xl:px-24 py-8 lg:py-14 w-full border-t border-gray-100">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">Experience</h2>
        <div className="mt-3 lg:mt-6 space-y-10 lg:space-y-12">
          {data.experience.map((job) => (
            <div key={job.company} className="relative pl-6">
              <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full border-2 border-gray-900" />

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-medium text-gray-900 sm:text-lg">
                  {job.company}
                  <span className="text-gray-400 font-normal"> · {job.role}</span>
                </h3>
                <span className="text-sm text-gray-400">{job.dates}</span>
              </div>

              <div className="mt-0.5 flex items-center gap-2 text-sm text-gray-400">
                {job.location && <span>{job.location}</span>}
                {job.type && (
                  <span className="text-xs bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5">
                    {job.type}
                  </span>
                )}
              </div>

              <div className="mt-3 space-y-3">
                {job.bullets.map((b, i) => (
                  <p
                    key={i}
                    className="border-l-2 border-gray-100 pl-4 text-sm text-gray-600 sm:text-base"
                  >
                    {b}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="px-4 sm:px-6 lg:px-16 xl:px-24 py-8 lg:py-14 w-full border-t border-gray-100">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">Education</h2>
        <div className="mt-3 lg:mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16 items-start">
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {data.education.map((edu) => (
              <div key={edu.school}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-base font-medium text-gray-900 sm:text-lg">
                    {edu.school}
                  </h3>
                  <span className="text-sm text-gray-400">{edu.dates}</span>
                </div>
                <p className="text-sm text-gray-600 sm:text-base">{edu.degree}</p>
                {edu.detail && (
                  <p className="text-sm text-gray-500">{edu.detail}</p>
                )}
              </div>
            ))}
          </div>

          <div className="text-sm space-y-2 border-l border-gray-100 rounded-lg p-4 sm:p-6">
            <span className="text-gray-400 block">Coursework & Certificates</span>
            {data.coursework.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 block transition-colors duration-200 hover:text-gray-900 hover:underline underline-offset-2"
                >
                  {item.name}
                </Link>
                {item.issuer && (
                  <span className="text-gray-400 text-xs">{item.issuer}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsSection
        projects={data.projects}
        miniProjects={data.miniProjects}
        githubUrl={data.links.github}
      />

      {/* SKILLS */}
      <section id="skills" className="px-4 sm:px-6 lg:px-16 xl:px-24 py-8 lg:py-14 w-full border-t border-gray-100">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">Skills</h2>
        <div className="mt-3 lg:mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-16 gap-y-4 lg:gap-y-6 text-sm sm:text-base">
          {data.skills.map((s) => (
            <div key={s.category}>
              <span className="text-gray-400 block text-xs uppercase tracking-wide mb-1">{s.category}</span>
              <span className="text-gray-700">{s.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-4 sm:px-6 lg:px-16 xl:px-24 py-12 lg:py-20 w-full border-t border-gray-100">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">Get in touch</h2>
        <p className="mt-3 max-w-2xl text-base text-gray-700 sm:text-lg">
          Reach out at{" "}
          <Link href={`mailto:${data.links.email}`} className="underline underline-offset-4 transition-colors duration-200 hover:text-gray-900">
            {data.links.email}
          </Link>
        </p>
      </section>
    </div>
  );
}