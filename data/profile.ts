// profile.ts - Identité, expériences, certifications, formations
import { Experience, Certification, Formation } from "./types";

export const profil = {
  nom: "Lauraine Moukoko",
  kicker: "SYSTÈMES · RÉSEAUX · SÉCURITÉ",
  // Accroche du hero, à la première personne (à ajuster avec tes mots si besoin)
  accroche:
    "J'administre des serveurs Linux, j'investigue des incidents de sécurité et je durcis des Active Directory. " +
    "En cycle ingénieur à l'EFREI Paris, je cherche une alternance d'un an en administration systèmes, réseaux et sécurité.",
  localisation: "Île-de-France",
  disponibilite: "disponible immédiatement, rythme alternance 1 an",
  // TODO : remplace par tes vraies adresses avant la mise en ligne
  email: "laurainemoukoko1@gmail.com",
  linkedin: "https://linkedin.com/in/lauraine-moukoko",
  github: "https://github.com/lauraineMK",
  langues: "Français C1 · Anglais B2",
  // Texte de la section 01 - À propos
  aPropos:
    "Trois entreprises, trois environnements différents : le ferroviaire au Cameroun, une PME de services, une association. " +
    "À chaque fois le même fil rouge : rendre les systèmes plus sûrs et plus simples à administrer. " +
    "Aujourd'hui à l'EFREI Paris en majeure Réseaux et Sécurité, je prépare la suite : une alternance où je pourrai " +
    "appliquer tout ça en conditions réelles.",
  // Faits chiffrés, en toutes lettres (règle de la charte : pas de signe plus)
  faits: [
    "Une cinquantaine de postes Windows déployés par scripts PowerShell",
    "Une trentaine d'équipements réseau sécurisés et segmentés",
    "Certifiée Stormshield CSNA - AWS Cloud Practitioner et CEH en préparation",
  ],
  // Bandeau défilant (or) - technologies du CV
  bandeau: [
    "ACTIVE DIRECTORY", "SPLUNK / ELK", "SNORT", "PFSENSE",
    "TERRAFORM", "AWS", "POWERSHELL", "DOCKER", "KUBERNETES", "WIRESHARK",
  ],
};

export const experiences: Experience[] = [
  {
    entreprise: "Association Grenade",
    poste: "Administratrice serveurs Linux",
    periode: "juin - décembre 2025",
    annee: "2025",
    resumeCourt: "serveurs Linux, durcissement, monitoring",
    missions: [
      "Supervision et monitoring de serveurs Debian (VPS OVHCloud), gestion des incidents et des mises à jour",
      "Sécurisation des accès : pare-feu UFW, clés SSH, durcissement système, restriction des privilèges",
      "Rédaction de procédures de sécurité et de documentation",
      "Gestion des comptes utilisateurs, des droits d'accès et des permissions système",
    ],
  },
  {
    entreprise: "SOCAGEM SARL",
    poste: "Administratrice sécurité réseau",
    periode: "avril - septembre 2024",
    annee: "2024",
    resumeCourt: "incidents, SIEM, pare-feu, VPN",
    missions: [
      "Investigation et traitement des incidents de sécurité : analyse des alertes SIEM (Splunk, ELK) et coordination de la remédiation",
      "Gestion des vulnérabilités : suivi, priorisation et application des correctifs sur serveurs et équipements réseau",
      "Création de supports de sensibilisation cybersécurité et formation des utilisateurs aux bonnes pratiques",
      "Déploiement d'une infrastructure sécurisée : pare-feu, VPN IPSec avec MFA, IDS/IPS, segmentation VLAN, sur une trentaine d'équipements",
      "Rédaction de rapports d'incidents et documentation technique avec Confluence",
    ],
  },
  {
    entreprise: "CAMRAIL S.A.",
    poste: "Administratrice systèmes et réseaux",
    periode: "mars - août 2023",
    annee: "2023",
    resumeCourt: "Active Directory, automatisation PowerShell",
    missions: [
      "IAM : Active Directory, groupes de sécurité, GPO, gestion et traçabilité des accès",
      "Automatisation du déploiement d'une cinquantaine de postes Windows 10 et 11 via PowerShell",
      "Scripts d'automatisation des tâches d'inventaire, de sauvegarde et de maintenance système",
    ],
  },
];

export const certifications: Certification[] = [
  { nom: "Stormshield CSNA", organisme: "Stormshield", statut: "obtenue" },
  { nom: "AWS Cloud Practitioner", organisme: "Amazon Web Services", statut: "enPreparation" },
  { nom: "CEH (Certified Ethical Hacker)", organisme: "EC-Council", statut: "enPreparation" },
];

export const formations: Formation[] = [
  {
    intitule: "Cycle ingénieur, majeure Réseaux et Sécurité",
    etablissement: "EFREI Paris",
    periode: "2025 - 2027",
  },
  {
    intitule: "Mastère Expert Architectures Systèmes, Réseaux et Sécurité Informatique (RNCP niveau 7)",
    etablissement: "École IT, Amiens",
    periode: "2024 - 2025",
  },
];
