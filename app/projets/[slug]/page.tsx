import Link from "next/link";
import { notFound } from "next/navigation";
import { projets } from "@/data/projects";
import { Gallery } from "./Gallery";

// Génère statiquement les 6 pages projets à l'export (aucun serveur pour les résoudre à la demande)
export function generateStaticParams() {
  return projets.map((projet) => ({ slug: projet.slug }));
}

export const dynamicParams = false;

export default async function ProjetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projets.findIndex((p) => p.slug === slug);

  if (index === -1) {
    notFound();
  }

  const projet = projets[index];
  const total = projets.length;
  const precedent = projets[(index - 1 + total) % total];
  const suivant = projets[(index + 1) % total];
  const numero = String(index + 1).padStart(2, "0");

  return (
    <main className="bg-ivoire">
      {/* En-tête : numéro du projet, titre avec surlignage or, ligne de stack émeraude */}
      <section className="px-6 pt-28 pb-16 sm:px-10 sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/#projets"
            className="font-mono text-xs tracking-widest text-encre/50 uppercase transition-colors hover:text-emeraude-fonce"
          >
            ← Accueil
          </Link>
          <p className="mt-8 font-mono text-xs tracking-[0.2em] text-emeraude-fonce uppercase">
            Projet {numero} / {String(total).padStart(2, "0")}
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-[1.1] font-semibold text-encre sm:text-6xl">
            {projet.titre} <span className="bg-or px-2 text-encre">{projet.sousTitre}</span>
          </h1>
          <p className="mt-8 font-mono text-sm tracking-widest text-emeraude uppercase">
            {projet.stack.join("  ·  ")}
          </p>
        </div>
      </section>

      {/* Contexte / démarche / résultat */}
      <section className="bg-white px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs tracking-widest text-encre/50 uppercase">
              Le contexte
            </p>
            <p className="mt-4 leading-relaxed text-encre/80">{projet.contexte}</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-encre/50 uppercase">
              Ma démarche
            </p>
            <p className="mt-4 leading-relaxed text-encre/80">{projet.demarche}</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-encre/50 uppercase">
              Le résultat
            </p>
            <p className="mt-4 leading-relaxed text-encre/80">{projet.resultat}</p>
          </div>
        </div>
      </section>

      {/* Étapes : récit + galerie de captures */}
      <section className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-5xl space-y-20 sm:space-y-24">
          {projet.etapes.map((etape, i) => (
            <div key={etape.titre}>
              <p className="font-mono text-sm tracking-widest text-emeraude uppercase">
                {String(i + 1).padStart(2, "0")} — {etape.titre}
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-encre/80">{etape.recit}</p>
              <div className="mt-8">
                <Gallery images={etape.captures} etapeTitre={etape.titre} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation projet précédent / suivant */}
      <nav
        aria-label="Navigation entre projets"
        className="border-t border-encre/10 bg-white px-6 py-14 sm:px-10"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href={`/projets/${precedent.slug}`} className="group">
            <p className="font-mono text-xs tracking-widest text-encre/50 uppercase">
              ← Projet précédent
            </p>
            <p className="mt-1 font-serif text-lg font-semibold text-encre transition-colors group-hover:text-emeraude-fonce">
              {precedent.titre} {precedent.sousTitre}
            </p>
          </Link>
          <Link
            href={`/projets/${suivant.slug}`}
            className="inline-flex items-center gap-2 self-start rounded-full bg-emeraude px-7 py-3 font-medium text-white transition-colors hover:bg-emeraude-fonce sm:self-auto"
          >
            Projet suivant <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
