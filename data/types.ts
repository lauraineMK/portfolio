// Modèle de données - section 5.2 du cahier des charges

export interface Image {
  src: string;
  alt: string;
  legende: string;
  valideeOPSEC: boolean;
}

export interface Etape {
  titre: string;
  recit: string;
  captures: Image[];
}

export interface Projet {
  slug: string;
  titre: string;
  contexte: string;
  demarche: string;
  resultat: string;
  stack: string[];
  etapes: Etape[];
}

export interface Expertise {
  slug: string;
  domaine: string;
  approche: string;
  outils: string[];
  renvois: string[];
}
