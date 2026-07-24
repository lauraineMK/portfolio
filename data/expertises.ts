// expertises.ts - Les 6 domaines, chacun avec sa page /expertises/<slug>
import { Expertise } from "./types";

export const expertises: Expertise[] = [
  {
    slug: "incidents-et-reponse",
    domaine: "Incidents et réponse",
    motSurligne: "réponse",
    approche:
      "Quand une alerte tombe, je commence par qualifier : vrai incident ou faux positif ? " +
      "Ensuite je remonte le fil dans les logs, je documente ce que je trouve et je coordonne la remédiation. " +
      "Un incident bien traité, c'est aussi un rapport clair qui évite qu'il se reproduise.",
    outils: [
      { nom: "Splunk", usage: "analyse des alertes et recherche dans les logs" },
      { nom: "ELK", usage: "centralisation et exploration des journaux" },
      { nom: "Wireshark", usage: "analyse de trafic réseau" },
      { nom: "Confluence", usage: "rapports d'incidents et documentation" },
    ],
    renvois: [
      { type: "experience", titre: "SOCAGEM - investigation des incidents et alertes SIEM", sousTexte: "expérience, 2024" },
      { type: "projet", slug: "pentest-methodologie", titre: "Test d intrusion, 'méthodologie", sousTexte: "étude de cas, captures" },
    ],
  },
  {
    slug: "gestion-des-vulnerabilites",
    domaine: "Gestion des vulnérabilités",
    motSurligne: "vulnérabilités",
    approche:
      "De la découverte à la correction : je scanne, je priorise selon la criticité CVSS et l'exposition réelle, " +
      "puis je suis l'application des correctifs jusqu'au bout. Le plus dur n'est pas de trouver les failles, " +
      "c'est de faire vivre le suivi dans la durée.",
    outils: [
      { nom: "Nmap", usage: "cartographie réseau et découverte de services" },
      { nom: "OpenVAS", usage: "scans de vulnérabilités" },
      { nom: "OWASP ZAP", usage: "tests de sécurité applicatifs" },
      { nom: "Snort", usage: "détection d'intrusion" },
      { nom: "pfSense et UFW", usage: "pare-feu et filtrage" },
    ],
    renvois: [
      { type: "experience", titre: "SOCAGEM - suivi et correctifs sur serveurs et équipements", sousTexte: "expérience, 2024" },
      { type: "projet", slug: "audit-active-directory-anssi", titre: "Audit Active Directory selon l'ANSSI", sousTexte: "étude de cas, captures" },
      { type: "projet", slug: "pentest-methodologie", titre: "Test d'intrusion : méthodologie", sousTexte: "étude de cas, captures" },
    ],
  },
  {
    slug: "reseaux-et-systemes",
    domaine: "Réseaux et systèmes",
    motSurligne: "systèmes",
    approche:
      "Le socle de tout le reste : des réseaux segmentés proprement, des serveurs durcis, des annuaires bien tenus. " +
      "J'ai administré du Windows Server et de l'Active Directory comme du Linux, sur site comme dans le cloud.",
    outils: [
      { nom: "Active Directory", usage: "IAM, GPO, durcissement (ORADAD, HardenAD)" },
      { nom: "Linux Debian / Ubuntu", usage: "administration et durcissement de serveurs" },
      { nom: "Windows Server", usage: "services d'infrastructure" },
      { nom: "VLAN, VPN IPSec et SSL", usage: "segmentation et accès distants" },
      { nom: "DNS, DHCP, 802.1X", usage: "services réseau et contrôle d'accès" },
    ],
    renvois: [
      { type: "experience", titre: "CAMRAIL - Active Directory et parc Windows", sousTexte: "expérience, 2023" },
      { type: "experience", titre: "Grenade - serveurs Linux durcis", sousTexte: "expérience, 2025" },
      { type: "projet", slug: "audit-active-directory-anssi", titre: "Audit Active Directory selon l ANSSI", sousTexte: "étude de cas, captures" },
      { type: "projet", slug: "chatsec-messagerie-securisee", titre: "ChatSec : TLS 1.3, PKI X.509", sousTexte: "étude de cas, captures" },
    ],
  },
  {
    slug: "automatisation",
    domaine: "Automatisation",
    motSurligne: "Automatisation",
    approche:
      "Tout ce que je fais deux fois, je le scripte. Déploiement de postes, inventaire, sauvegardes, " +
      "traitement de données de sécurité : un script fiable libère du temps pour ce qui demande vraiment un cerveau.",
    outils: [
      { nom: "PowerShell", usage: "déploiement et administration Windows" },
      { nom: "Python", usage: "traitement de données et outillage" },
      { nom: "Bash", usage: "automatisation côté Linux" },
      { nom: "Power Automate", usage: "notions, automatisation de flux" },
    ],
    renvois: [
      { type: "experience", titre: "CAMRAIL - une cinquantaine de postes déployés par scripts", sousTexte: "expérience, 2023" },
      { type: "projet", slug: "pipeline-devsecops", titre: "Chaîne DevSecOps complète", sousTexte: "étude de cas, captures" },
    ],
  },
  {
    slug: "cloud-et-devops",
    domaine: "Cloud et DevOps",
    motSurligne: "DevOps",
    approche:
      "Je conçois l'infrastructure comme du code : versionnée, revue, reproductible. " +
      "Conteneurs, orchestration, pipelines de déploiement : la sécurité s'intègre dans la chaîne, pas après coup.",
    outils: [
      { nom: "AWS", usage: "S3, CloudFront, IAM, KMS" },
      { nom: "Terraform", usage: "infrastructure as code" },
      { nom: "Docker et Kubernetes", usage: "conteneurisation et orchestration" },
      { nom: "GCP et OVHCloud", usage: "environnements multi-fournisseurs" },
      { nom: "GitHub Actions", usage: "pipelines CI/CD" },
    ],
    renvois: [
      { type: "projet", slug: "pipeline-devsecops", titre: "Chaîne DevSecOps complète", sousTexte: "étude de cas, captures" },
      { type: "projet", slug: "chiffrement-cloud-aws-kms", titre: "Chiffrement cloud avec AWS KMS", sousTexte: "étude de cas, captures" },
      { type: "projet", slug: "infrastructure-reseau-linux", titre: "Infrastructure réseau Linux", sousTexte: "étude de cas, captures" },
      { type: "projet", slug: "ce-site", titre: "Ce site lui-même", sousTexte: "architecture AWS" },
    ],
  },
  {
    slug: "conformite-et-sensibilisation",
    domaine: "Conformité et sensibilisation",
    motSurligne: "sensibilisation",
    approche:
      "La sécurité ne tient que si les utilisateurs comprennent pourquoi. Je crée des supports de sensibilisation, " +
      "je rédige des procédures qui se lisent, et je fais de la veille réglementaire pour ancrer les pratiques " +
      "dans les référentiels : RGPD, ISO 27001 et 27002, recommandations ANSSI, notions de NIS2.",
    outils: [
      { nom: "ISO 27001 et 27002", usage: "référentiels de gestion de la sécurité" },
      { nom: "RGPD", usage: "protection des données personnelles" },
      { nom: "Référentiels ANSSI", usage: "guides de durcissement et bonnes pratiques" },
      { nom: "Confluence", usage: "procédures et documentation" },
    ],
    renvois: [
      { type: "experience", titre: "SOCAGEM - supports de sensibilisation et formation des utilisateurs", sousTexte: "expérience, 2024" },
      { type: "experience", titre: "Grenade - procédures de sécurité", sousTexte: "expérience, 2025" },
    ],
  },
];
