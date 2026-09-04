"use client";

import { useState } from "react";
import Link from "next/link";

type Project = {
  name: string;
  subtitle?: string;
  tech?: string[];
  link?: string;
  bullets: string[];
  impact?: string[];
};

type MiniProject = {
  name: string;
  desc?: string;
};

type Tab = "overview" | "stack" | "impact";

export default function ProjectsSection({
  projects,
  miniProjects,
  githubUrl,
}: {
  projects: Project[];
  miniProjects?: MiniProject[];
  githubUrl?: string;
}) {
  const [selectedName, setSelectedName] = useState(projects[0]?.name);
  const [tab, setTab] = useState<Tab>("overview");

  const selected = projects.find((p) => p.name === selectedName) ?? projects[0];

  const availableTabs: Tab[] = [
    "overview",
    ...(selected?.tech && selected.tech.length > 0 ? (["stack"] as Tab[]) : []),
    ...(selected?.impact && selected.impact.length > 0 ? (["impact"] as Tab[]) : []),
  ];

  function selectProject(name: string) {
    setSelectedName(name);
    setTab("overview");
  }

  return (
    <section id="projects" className="px-4 sm:px-6 lg:px-16 xl:px-24 py-8 lg:py-14 w-full border-t border-gray-100">
      <h2 className="text-sm font-medium uppercase tracking-wide text-gray-400">Projects</h2>

      <div className="mt-3 lg:mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16 items-start">
        {/* LEFT: project list */}
        <div className="lg:col-span-1">
          <div className="space-y-1">
            {projects.map((p) => (
              <button
                key={p.name}
                onClick={() => selectProject(p.name)}
                className={`w-full text-left px-3 py-2 border-l-2 transition-colors duration-200 ${
                  selected?.name === p.name
                    ? "border-gray-900"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <p className="text-sm font-medium text-gray-900">{p.name}</p>
                {p.subtitle && (
                  <p className="text-xs text-gray-400 line-clamp-1">{p.subtitle}</p>
                )}
              </button>
            ))}
          </div>

          {miniProjects && miniProjects.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <span className="text-xs uppercase tracking-wide text-gray-400">Mini Projects</span>
              <ul className="mt-2 space-y-1">
                {miniProjects.map((mp) => (
                  <li key={mp.name} className="px-3 text-sm text-gray-600">
                    <span className="text-gray-800">{mp.name}</span>
                    {mp.desc && (
                      <span className="text-gray-400 block text-xs">{mp.desc}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-3 text-xs text-gray-500 underline underline-offset-2 hover:text-gray-900 transition-colors duration-200"
            >
              More on GitHub
            </Link>
          )}
        </div>

        {/* RIGHT: detail panel */}
        {selected && (
          <div className="lg:col-span-2">
            <h3 className="text-base font-medium text-gray-900 sm:text-lg">{selected.name}</h3>

            <div className="mt-3 flex gap-5 border-b border-gray-100 text-sm">
              {availableTabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-2 -mb-px capitalize transition-colors duration-200 ${
                    tab === t
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-3">
              {tab === "overview" && (
                <div className="space-y-3">
                  {selected.bullets.map((b, i) => (
                    <p
                      key={i}
                      className="border-l-2 border-gray-100 pl-4 text-sm text-gray-600 sm:text-base"
                    >
                      {b}
                    </p>
                  ))}
                </div>
              )}

              {tab === "stack" && selected.tech && (
                <div className="flex flex-wrap gap-1.5">
                  {selected.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-gray-600 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {tab === "impact" && selected.impact && (
                <div className="space-y-3">
                  {selected.impact.map((im, i) => (
                    <p
                      key={i}
                      className="border-l-2 border-gray-100 pl-4 text-sm text-gray-600 sm:text-base"
                    >
                      {im}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {selected.link && (
              <Link
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm text-gray-900 underline underline-offset-4"
              >
                View project →
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}