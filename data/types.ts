// types.ts - Modèle de données du portfolio
// Conforme au diagramme de classes du cahier des charges (Figure 4)

export interface Image {
  src: string;          // chemin dans /public/projets/<slug>/
  alt: string;          // texte alternatif (exigence Q3)
  legende: string;      // légende affichée sous la capture
  valideeOPSEC: boolean; // true uniquement après revue (règle 4.4) - aucune image publiée sans ça
}

export interface Etape {
  titre: string;        // ex. "Préparation de l'environnement"
  recit: string;        // 2 à 4 phrases à la première personne
  captures: Image[];
}

export interface Projet {
  slug: string;         // adresse de la page : /projets/<slug>
  titre: string;
  sousTitre: string;    // le mot mis en valeur par le surlignage or
  contexte: string;
  demarche: string;
  resultat: string;
  stack: string[];      // libellés monospace
  etapes: Etape[];
  resume: string;       // 2 lignes pour la carte sur l'accueil
}

export type RenvoiType = "projet" | "experience";

export interface Renvoi {
  type: RenvoiType;
  slug?: string;        // si type = "projet"
  titre: string;
  sousTexte: string;
}

export interface Expertise {
  slug: string;         // adresse de la page : /expertises/<slug>
  domaine: string;
  motSurligne: string;  // partie du titre surlignée en or
  approche: string;     // comment j'aborde ce domaine, à la première personne
  outils: { nom: string; usage: string }[];
  renvois: Renvoi[];
}

export interface Experience {
  entreprise: string;
  poste: string;
  periode: string;      // ex. "juin - décembre 2025"
  annee: string;        // affichée dans le registre : "2025"
  resumeCourt: string;  // une ligne pour le registre de l'accueil
  missions: string[];
}

export interface Certification {
  nom: string;
  organisme: string;
  statut: "obtenue" | "enPreparation";
}

export interface Formation {
  intitule: string;
  etablissement: string;
  periode: string;
}
