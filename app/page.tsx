import Link from "next/link";
import { expertises } from "@/data/expertises";
import { projets } from "@/data/projects";
import { profil, experiences, certifications, formations } from "@/data/profile";

const navItems = [
  { href: "#a-propos", label: "À propos" },
  { href: "#expertises", label: "Expertises" },
  { href: "#parcours", label: "Parcours" },
  { href: "#projets", label: "Projets" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-encre/10 bg-ivoire/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
          <a href="#accueil" className="font-serif text-xl font-semibold text-encre">
            LM
          </a>
          <nav
            aria-label="Navigation principale"
            className="flex gap-6 overflow-x-auto font-mono text-[11px] uppercase tracking-widest whitespace-nowrap text-encre/70 sm:gap-8 sm:text-xs"
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-emeraude">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="accueil" className="bg-ivoire px-6 pt-40 pb-24 sm:px-10 sm:pt-48 sm:pb-32">
          <div className="mx-auto max-w-4xl">
            <p className="font-mono text-xs tracking-[0.2em] text-emeraude-fonce uppercase">
              {profil.kicker}
            </p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] font-semibold text-encre sm:text-7xl">
              Lauraine
              <br />
              <span className="bg-or px-2 text-encre">Moukoko</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-encre/80">
              {profil.accroche}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/cv-lauraine-moukoko.pdf"
                download
                className="rounded-full bg-emeraude px-7 py-3 font-medium text-white transition-colors hover:bg-emeraude-fonce"
              >
                Mon CV
              </a>
              <a
                href="#projets"
                className="rounded-full border border-emeraude px-7 py-3 font-medium text-emeraude transition-colors hover:bg-emeraude hover:text-white"
              >
                Voir mes projets
              </a>
            </div>
          </div>
        </section>

        {/* Bandeau défilant des technologies (or : deuxième emploi signature de la charte) */}
        <div className="overflow-hidden border-y border-encre/10 bg-or py-3" aria-hidden="true">
          <div className="flex w-max gap-10 font-mono text-sm font-medium tracking-widest text-encre uppercase motion-safe:animate-marquee">
            {[...profil.bandeau, ...profil.bandeau].map((tech, i) => (
              <span key={i} className="whitespace-nowrap">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 01 - À propos */}
        <section id="a-propos" className="bg-white px-6 py-24 sm:px-10">
          <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-[280px_1fr] sm:items-start">
            <div>
              <p className="font-mono text-xs tracking-widest text-emeraude-fonce uppercase">01</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-encre">À propos</h2>
              <div
                className="mt-6 aspect-square w-full rounded-2xl bg-ivoire"
                aria-hidden="true"
              />
            </div>
            <div className="space-y-6 text-encre/80">
              <p className="text-lg leading-relaxed">{profil.aPropos}</p>
              <ul className="space-y-2 font-mono text-sm text-encre">
                {profil.faits.map((fait) => (
                  <li key={fait} className="flex gap-3">
                    <span className="text-emeraude">–</span>
                    {fait}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-encre/60">
                {profil.langues} · {profil.localisation} · {profil.disponibilite}
              </p>
            </div>
          </div>
        </section>

        {/* 02 - Expertises */}
        <section id="expertises" className="bg-ivoire px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-xs tracking-widest text-emeraude-fonce uppercase">02</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-encre">Expertises</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {expertises.map((expertise) => (
                <Link
                  key={expertise.slug}
                  href={`/expertises/${expertise.slug}`}
                  className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-encre/5 transition-shadow hover:ring-emeraude"
                >
                  <h3 className="font-serif text-xl font-semibold text-encre">
                    {expertise.domaine}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-encre/70">
                    {expertise.approche}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs tracking-widest text-emeraude uppercase group-hover:text-emeraude-fonce">
                    Découvrir <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 03 - Parcours */}
        <section id="parcours" className="bg-white px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-4xl">
            <p className="font-mono text-xs tracking-widest text-emeraude-fonce uppercase">03</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-encre">Parcours</h2>
            <div className="mt-10 space-y-4">
              {experiences.map((experience) => (
                <div
                  key={experience.entreprise}
                  className="rounded-2xl bg-ivoire p-6 sm:flex sm:items-start sm:justify-between sm:gap-8"
                >
                  <div>
                    <p className="font-serif text-lg font-semibold text-encre">
                      {experience.poste}
                    </p>
                    <p className="mt-1 text-sm text-encre/70">
                      {experience.entreprise} · {experience.periode}
                    </p>
                    <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-encre/80">
                      {experience.missions.map((mission) => (
                        <li key={mission} className="flex gap-2">
                          <span className="text-emeraude">–</span>
                          {mission}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="mt-4 inline-block font-mono text-xs tracking-widest text-encre/50 uppercase sm:mt-0">
                    {experience.annee}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 - Projets */}
        <section id="projets" className="bg-ivoire px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-xs tracking-widest text-emeraude-fonce uppercase">04</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-encre">Projets</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {projets.map((projet) => (
                <Link
                  key={projet.slug}
                  href={`/projets/${projet.slug}`}
                  className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-encre/5 transition-shadow hover:ring-emeraude"
                >
                  <p className="font-serif text-xl leading-snug font-semibold text-encre">
                    {projet.titre} <span className="text-emeraude-fonce">{projet.sousTitre}</span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-encre/70">{projet.resume}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {projet.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-ivoire px-3 py-1 font-mono text-[11px] tracking-wide text-encre/70 uppercase"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 05 - Certifications */}
        <section id="certifications" className="bg-white px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-4xl">
            <p className="font-mono text-xs tracking-widest text-emeraude-fonce uppercase">05</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-encre">Certifications</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-xs tracking-widest text-encre/50 uppercase">
                  Obtenue
                </p>
                <div className="mt-3 space-y-3">
                  {certifications
                    .filter((c) => c.statut === "obtenue")
                    .map((c) => (
                      <div key={c.nom} className="rounded-2xl border-2 border-emeraude bg-ivoire p-5">
                        <p className="font-serif text-lg font-semibold text-encre">{c.nom}</p>
                        <p className="mt-1 text-sm text-encre/60">{c.organisme}</p>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest text-encre/50 uppercase">
                  En préparation
                </p>
                <div className="mt-3 space-y-3">
                  {certifications
                    .filter((c) => c.statut === "enPreparation")
                    .map((c) => (
                      <div key={c.nom} className="rounded-2xl border border-encre/15 p-5">
                        <p className="font-serif text-lg font-semibold text-encre/80">{c.nom}</p>
                        <p className="mt-1 text-sm text-encre/50">{c.organisme}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="mt-10">
              <p className="font-mono text-xs tracking-widest text-encre/50 uppercase">Formation</p>
              <div className="mt-3 space-y-2">
                {formations.map((formation) => (
                  <p key={formation.intitule} className="text-sm text-encre/80">
                    <span className="font-medium text-encre">{formation.intitule}</span> —{" "}
                    {formation.etablissement}, {formation.periode}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 06 - Contact (seule section sombre) */}
        <section id="contact" className="bg-vert-encre px-6 py-28 text-center sm:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="font-mono text-xs tracking-widest text-ivoire/60 uppercase">06</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-ivoire sm:text-4xl">
              Un poste d&apos;alternance à pourvoir ? Parlons-en.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${profil.email}`}
                className="rounded-full bg-emeraude px-7 py-3 font-medium text-white transition-colors hover:bg-emeraude-fonce"
              >
                M&apos;écrire
              </a>
              <a
                href={profil.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ivoire/30 px-7 py-3 font-medium text-ivoire transition-colors hover:border-ivoire"
              >
                LinkedIn
              </a>
              <a
                href={profil.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ivoire/30 px-7 py-3 font-medium text-ivoire transition-colors hover:border-ivoire"
              >
                GitHub
              </a>
            </div>
            <p className="mt-16 font-mono text-xs text-ivoire/40">
              © {new Date().getFullYear()} Lauraine Moukoko — site conçu, développé et sécurisé par
              mes soins ·{" "}
              <Link href="/mentions-legales" className="underline hover:text-ivoire">
                Mentions légales
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
