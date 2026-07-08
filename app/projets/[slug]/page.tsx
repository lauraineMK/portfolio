import { notFound } from "next/navigation";
import { projets } from "@/data/projets";

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
  const projet = projets.find((p) => p.slug === slug);

  if (!projet) {
    notFound();
  }

  return (
    <main>
      {/* Contexte, démarche, résultat */}
      {/* Récit par étapes avec galerie et visionneuse plein écran */}
      {/* Navigation projet précédent / projet suivant */}
    </main>
  );
}
