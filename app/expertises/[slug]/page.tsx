import { notFound } from "next/navigation";
import { expertises } from "@/data/expertises";

// Génère statiquement les 6 pages expertises à l'export (aucun serveur pour les résoudre à la demande)
export function generateStaticParams() {
  return expertises.map((expertise) => ({ slug: expertise.slug }));
}

export const dynamicParams = false;

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const expertise = expertises.find((e) => e.slug === slug);

  if (!expertise) {
    notFound();
  }

  return (
    <main>
      {/* Approche personnelle, outils pratiqués */}
      {/* Renvois croisés vers projets et expériences */}
    </main>
  );
}
