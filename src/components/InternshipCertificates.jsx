import { useState } from "react";

const internships = [
  {
    company: "Prodigy InfoTech",
    role: "Full-Stack Web Development Intern",
    duration: "April 15, 2026 - May 15, 2026",
    focus: "MERN Stack application building and deployment.",
    certificate: "/assets/certificates/prodigy-cert.png",
    skills: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    company: "Pridology Infotech",
    role: "Full-Stack Developer Intern",
    duration: "Full-stack applications and system integration",
    focus: "Full-stack applications and system integration.",
    certificate: "/assets/certificates/pridology-cert.png",
    skills: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    company: "Thiranex",
    role: "Full-Stack Developer Intern",
    duration: "Web development and framework architecture",
    focus: "Web development and framework architecture.",
    certificate: "/assets/certificates/thiranex-cert.png",
    skills: ["React", "Node.js", "Express", "MongoDB"],
  },
];

export default function InternshipCertificates() {
  const [active, setActive] = useState(null);

  return (
    <section id="internships" className="py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-blue-400">Experience</p>
          <h2 className="text-4xl font-black tracking-tight md:text-6xl">
            Internship Experience <span className="text-blue-400">& Certificates</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Full-stack internships focused on MERN application delivery, deployment, system integration, and clean UI engineering.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {internships.map((item) => (
            <article
              key={item.company}
              className="group rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-blue-500/5 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-blue-500/20"
            >
              <h3 className="text-2xl font-black">{item.company}</h3>
              <p className="mt-2 font-semibold text-blue-300">{item.role}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{item.duration}</p>
              <p className="mt-5 text-sm leading-6 text-slate-300">{item.focus}</p>
              <ul className="mt-5 grid gap-2 text-sm text-slate-300">
                {item.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {skill}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="mt-6 rounded-xl border border-blue-400/40 bg-blue-500/15 px-4 py-2 text-sm font-bold text-blue-100 transition hover:bg-blue-500 hover:text-white"
              >
                View Certificate
              </button>
            </article>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 p-4 backdrop-blur-xl">
          <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">
            <img src={active.certificate} alt={`${active.company} certificate`} className="max-h-[70vh] w-full object-contain" />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-5">
              <div>
                <h3 className="font-black">{active.company}</h3>
                <p className="text-sm text-slate-400">{active.role}</p>
              </div>
              <div className="flex gap-3">
                <a href={active.certificate} download className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white">
                  Download
                </a>
                <button onClick={() => setActive(null)} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-slate-200">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
