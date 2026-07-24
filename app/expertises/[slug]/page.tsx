import Link from "next/link";
import { notFound } from "next/navigation";
import { expertises } from "@/data/expertises";

// Génère statiquement les 6 pages expertises à l'export (aucun serveur pour les résoudre à la demande)
export function generateStaticParams() {
  return expertises.map((expertise) => ({ slug: expertise.slug }));
}

export const dynamicParams = false;

// Découpe le titre autour du mot à surligner en or (même effet marqueur que l'accueil)
function TitreSurligne({ domaine, motSurligne }: { domaine: string; motSurligne: string }) {
  const idx = domaine.indexOf(motSurligne);
  if (idx === -1) {
    return <>{domaine}</>;
  }
  const avant = domaine.slice(0, idx);
  const apres = domaine.slice(idx + motSurligne.length);
  return (
    <>
      {avant}
      <span className="bg-or px-2 text-encre">{motSurligne}</span>
      {apres}
    </>
  );
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = expertises.findIndex((e) => e.slug === slug);

  if (index === -1) {
    notFound();
  }

  const expertise = expertises[index];
  const total = expertises.length;
  const numero = String(index + 1).padStart(2, "0");

  return (
    <main className="bg-ivoire">
      {/* En-tête : numéro de l'expertise, titre avec surlignage or, paragraphe d'approche */}
      <section className="px-6 pt-28 pb-16 sm:px-10 sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/#expertises"
            className="font-mono text-xs tracking-widest text-encre/50 uppercase transition-colors hover:text-emeraude-fonce"
          >
            ← Accueil
          </Link>
          <p className="mt-8 font-mono text-xs tracking-[0.2em] text-emeraude-fonce uppercase">
            Expertise {numero} / {String(total).padStart(2, "0")}
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-[1.1] font-semibold text-encre sm:text-6xl">
            <TitreSurligne domaine={expertise.domaine} motSurligne={expertise.motSurligne} />
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-encre/80">
            {expertise.approche}
          </p>
        </div>
      </section>

      {/* Outils pratiqués / Où je l'ai pratiqué */}
      <section className="bg-white px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-16 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs tracking-widest text-encre/50 uppercase">
              Outils pratiqués
            </p>
            <ul className="mt-6 space-y-5">
              {expertise.outils.map((outil) => (
                <li key={outil.nom} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <span className="shrink-0 font-mono text-sm font-medium text-encre sm:w-36">
                    {outil.nom}
                  </span>
                  <span className="text-sm leading-relaxed text-encre/70">{outil.usage}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest text-encre/50 uppercase">
              Où je l&apos;ai pratiqué
            </p>
            <div className="mt-6 space-y-4">
              {expertise.renvois.map((renvoi) => {
                const isProjet = renvoi.type === "projet";
                const href = isProjet ? `/projets/${renvoi.slug}` : "/#parcours";
                return (
                  <Link
                    key={`${renvoi.type}-${renvoi.titre}`}
                    href={href}
                    className="group block rounded-2xl bg-ivoire p-5 ring-1 ring-encre/5 transition-shadow hover:ring-emeraude"
                  >
                    <p className="font-mono text-[11px] tracking-widest text-encre/40 uppercase">
                      {isProjet ? "Projet" : "Expérience"}
                    </p>
                    <p className="mt-2 font-serif text-lg leading-snug font-semibold text-encre">
                      {renvoi.titre}
                    </p>
                    <p className="mt-1 text-sm text-encre/60">{renvoi.sousTexte}</p>
                    <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs tracking-widest text-emeraude uppercase group-hover:text-emeraude-fonce">
                      {isProjet ? "Voir le projet" : "Voir le parcours"}{" "}
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
