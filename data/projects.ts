// projects.ts - Projets du portfolio
// 3 projets complets avec vraies captures (audit AD, infra Linux, pentest méthodologie)
// + 3 projets en squelette (à compléter quand tu auras leurs images).
//
// Chemins images : /public/projets/<slug>/<nom>.webp  (+ <nom>-thumb.webp pour la miniature)
// valideeOPSEC : true = capture vérifiée, publiable.
import { Projet } from "./types";

export const projets: Projet[] = [
  // ============================================================ 1. AUDIT AD
  {
    slug: "audit-active-directory-anssi",
    titre: "Audit de sécurité Active Directory selon le référentiel",
    sousTitre: "ANSSI",
    resume:
      "Audit d'un Active Directory vulnérable selon le guide CERTFR-2020-DUR-001, avec 8 points de contrôle automatisés en PowerShell sur 4 niveaux de criticité.",
    contexte:
      "Une école dispose d'un Active Directory vieillissant et mal entretenu. Le RSSI mandate une équipe d'administrateurs pour le sécuriser avant un audit de l'ANSSI. L'objectif : atteindre l'état de l'art préconisé par le guide de durcissement Active Directory de l'ANSSI (CERTFR-2020-DUR-001), qui note les vulnérabilités par niveaux de criticité, de N1 (le plus critique) à N4.",
    demarche:
      "J'ai étudié la checklist ANSSI et sélectionné 8 points de contrôle répartis sur les 4 niveaux. J'ai monté un domaine de laboratoire dans lequel j'ai introduit volontairement ces vulnérabilités, puis j'ai écrit pour chacune un script PowerShell de détection reproductible, renvoyant un code de sortie exploitable pour automatiser l'alerte.",
    resultat:
      "Une batterie de 8 scripts d'audit couvrant les niveaux N1 à N4, chacun documenté par sa description, son risque, la recommandation ANSSI associée et sa détection automatisée. Une méthode d'audit que je saurais rejouer en entreprise.",
    stack: ["ACTIVE DIRECTORY", "POWERSHELL", "ANSSI CERTFR-2020-DUR-001", "GPO"],
    etapes: [
      {
        titre: "Niveau N1 - Comptes privilégiés et DnsAdmins",
        recit:
          "Les vulnérabilités les plus critiques. J'ai détecté les comptes privilégiés dont le mot de passe n'expire jamais (accès permanent en cas de compromission), puis vérifié le groupe DnsAdmins : un de ses membres peut forcer le service DNS, qui tourne en SYSTEM, à charger une DLL malveillante et devenir administrateur du domaine. Le script compare les membres à une liste blanche et lève une alerte si un compte non autorisé y figure.",
        captures: [
          { src: "/projets/audit-active-directory-anssi/vuln-dnsadmins-code.webp", alt: "Script PowerShell de détection du groupe DnsAdmins", legende: "Détection des membres non autorisés du groupe DnsAdmins avec Get-ADGroupMember", valideeOPSEC: true },
          { src: "/projets/audit-active-directory-anssi/vuln-dnsadmins-resultat.webp", alt: "Résultat du script DnsAdmins avec alerte", legende: "Le script détecte un compte intrus et retourne un code de sortie 1", valideeOPSEC: true },
        ],
      },
      {
        titre: "Niveau N2 - Politiques de mot de passe et Kerberos",
        recit:
          "J'ai audité la politique de mot de passe des groupes privilégiés (longueur minimale, âge maximal) au regard des recommandations ANSSI, puis les comptes sans préauthentification Kerberos, exposés aux attaques AS-REP Roasting où un attaquant récupère un ticket chiffré pour casser le mot de passe hors-ligne.",
        captures: [
          { src: "/projets/audit-active-directory-anssi/vuln-politique-mdp-code.webp", alt: "Script d'audit de la politique de mot de passe", legende: "Analyse des Fine-Grained Password Policies des groupes privilégiés", valideeOPSEC: true },
          { src: "/projets/audit-active-directory-anssi/vuln-kerberos-preauth.webp", alt: "Détection des comptes sans préauthentification Kerberos", legende: "Détection des comptes vulnérables à l'AS-REP Roasting", valideeOPSEC: true },
        ],
      },
      {
        titre: "Niveau N3 - Serveurs inactifs et chiffrement obsolète",
        recit:
          "J'ai identifié les comptes machines de serveurs inactifs (cibles idéales car peu surveillées) avec un seuil paramétrable, puis les comptes supportant encore des algorithmes de chiffrement Kerberos obsolètes comme DES et RC4, cassables cryptographiquement.",
        captures: [
          { src: "/projets/audit-active-directory-anssi/vuln-serveurs-inactifs.webp", alt: "Détection des serveurs inactifs", legende: "Seuil paramétrable pour ajuster la sensibilité de la détection", valideeOPSEC: true },
          { src: "/projets/audit-active-directory-anssi/vuln-chiffrement-obsolete.webp", alt: "Détection des algorithmes de chiffrement obsolètes", legende: "Détection de DES et RC4 via l'opérateur binaire sur msDS-SupportedEncryptionTypes", valideeOPSEC: true },
        ],
      },
      {
        titre: "Niveau N4 - Quota de machines et silos d'authentification",
        recit:
          "Les points de durcissement avancé. J'ai vérifié l'attribut ms-DS-MachineAccountQuota (par défaut, tout utilisateur peut ajouter 10 machines au domaine, ce qui ouvre la voie à des attaques) et l'absence de silos d'authentification, qui isolent les comptes à privilèges pour éviter le vol de leurs identifiants sur des postes non sécurisés (Pass-the-Hash, Mimikatz).",
        captures: [
          { src: "/projets/audit-active-directory-anssi/vuln-machineaccountquota.webp", alt: "Audit du quota de comptes machines", legende: "Détection de la valeur par défaut non sécurisée (10 au lieu de 0)", valideeOPSEC: true },
          { src: "/projets/audit-active-directory-anssi/vuln-silo-authentification.webp", alt: "Script d'audit des silos d'authentification", legende: "Vérification de la présence de silos via la classe msDS-AuthNPolicySilo", valideeOPSEC: true },
          { src: "/projets/audit-active-directory-anssi/vuln-silo-resultat.webp", alt: "Résultat de l'audit des silos", legende: "Alerte : aucun silo configuré, les comptes privilégiés sont exposés", valideeOPSEC: true },
        ],
      },
    ],
  },

  // ============================================================ 2. INFRA LINUX
  {
    slug: "infrastructure-reseau-linux",
    titre: "Infrastructure réseau segmentée et sécurisée sous",
    sousTitre: "Linux",
    resume:
      "Conception, déploiement, sécurisation et automatisation de l'infrastructure réseau d'une école : VLANs, pare-feu iptables, DHCP, DNS/DDNS chiffré, centralisation des logs et automatisation Ansible.",
    contexte:
      "Concevoir de bout en bout l'infrastructure réseau et système d'une école fictive, Saint-Potache : un réseau segmenté en trois VLANs (postes de travail, serveurs critiques, serveur web), protégé par un pare-feu Linux qui route et filtre le trafic inter-VLAN, avec les services réseau essentiels et une automatisation complète. Projet mené en équipe de quatre.",
    demarche:
      "Segmentation en VLANs avec un pare-feu iptables central appliquant une politique par défaut DROP. Déploiement des services : DHCP à trois pools avec réservations, DNS BIND9 avec mise à jour dynamique chiffrée par clé TSIG, centralisation des journaux avec Rsyslog. Gestion fine des accès par ACL. Enfin, toute la configuration a été traduite en playbooks Ansible idempotents pour un déploiement reproductible.",
    resultat:
      "Une infrastructure complète, testée par des preuves concrètes (routage inter-VLAN, filtrage sélectif, résolution DNS, DDNS signé, sauvegarde automatique de la base) et entièrement automatisée. Chaque service validé, chaque règle de sécurité justifiée.",
    stack: ["DEBIAN", "IPTABLES", "BIND9 / DDNS", "ISC-DHCP", "RSYSLOG", "ANSIBLE", "VAGRANT"],
    etapes: [
      {
        titre: "Architecture et segmentation en VLANs",
        recit:
          "Le réseau est segmenté en trois VLANs isolés : postes de travail, serveurs critiques (DHCP, DNS, logs, Ansible) et serveur web. Le pare-feu, présent dans les trois VLANs, assure le routage inter-VLAN et applique un filtrage strict.",
        captures: [
          { src: "/projets/infrastructure-reseau-linux/architecture-reseau-vlans.webp", alt: "Schéma de l'architecture réseau segmentée en VLANs", legende: "Trois VLANs isolés reliés par un pare-feu central, avec sortie NAT vers Internet", valideeOPSEC: true },
        ],
      },
      {
        titre: "Routage inter-VLAN et pare-feu",
        recit:
          "Après activation du routage sur le pare-feu, j'ai vérifié qu'il joignait bien les trois VLANs. Le pare-feu applique une politique par défaut DROP (plus discret que REJECT), n'autorise chaque service que vers son serveur dédié, et journalise le trafic bloqué. Le SSH inter-VLAN est autorisé pour permettre à Ansible de configurer toutes les machines.",
        captures: [
          { src: "/projets/infrastructure-reseau-linux/firewall-ping-vlans.webp", alt: "Test de ping du pare-feu vers les trois VLANs", legende: "Le pare-feu joint les trois VLANs : le routage fonctionne", valideeOPSEC: true },
          { src: "/projets/infrastructure-reseau-linux/ssh-through-firewall.webp", alt: "Connexion SSH à travers le pare-feu", legende: "SSH inter-VLAN autorisé et journalisé, indispensable à Ansible", valideeOPSEC: true },
        ],
      },
      {
        titre: "Services réseau : DNS et DDNS chiffré",
        recit:
          "Le serveur BIND9 héberge le domaine de l'école avec une zone directe et trois zones inverses. La fonctionnalité avancée est la mise à jour dynamique et sécurisée du DNS (DDNS) : quand une machine reçoit un bail DHCP, le serveur DHCP prévient le DNS, mais uniquement via une mise à jour signée par une clé TSIG (hmac-sha256). Une mise à jour non signée est rejetée.",
        captures: [
          { src: "/projets/infrastructure-reseau-linux/dns-resolution-ddns.webp", alt: "Résolution DNS et mise à jour dynamique chiffrée", legende: "Résolution validée : le DDNS chiffré par clé TSIG fonctionne de bout en bout", valideeOPSEC: true },
        ],
      },
      {
        titre: "Centralisation des logs et gestion des accès",
        recit:
          "Rsyslog rapatrie les journaux de toutes les machines vers un serveur central, rangés par hôte, pour enquêter après un incident depuis un seul endroit. Côté système, les accès aux dossiers partagés sont gérés par ACL, plus souples que les permissions Unix classiques : droits différents par groupe sur un même dossier, validés par un test croisé.",
        captures: [
          { src: "/projets/infrastructure-reseau-linux/rsyslog-centralisation.webp", alt: "Centralisation des journaux avec Rsyslog", legende: "Un sous-dossier de logs par machine sur le serveur central", valideeOPSEC: true },
          { src: "/projets/infrastructure-reseau-linux/acl-permissions.webp", alt: "Gestion des permissions par ACL", legende: "getfacl confirme les droits différenciés par groupe sur le dossier partagé", valideeOPSEC: true },
        ],
      },
      {
        titre: "Automatisation avec Ansible",
        recit:
          "Toute la configuration validée manuellement a été traduite en playbooks Ansible : un par service, plus un orchestrateur. Ansible se connecte en SSH sans mot de passe, décrit l'état voulu et l'applique partout. Rejouer un playbook ne casse rien (idempotence) : un second passage affiche changed=0.",
        captures: [
          { src: "/projets/infrastructure-reseau-linux/ansible-playbook-web.webp", alt: "Exécution d'un playbook Ansible de déploiement", legende: "Déploiement du serveur web automatisé, playbook idempotent", valideeOPSEC: true },
          { src: "/projets/infrastructure-reseau-linux/intranet-lynx.webp", alt: "Site intranet servi dynamiquement", legende: "L'intranet Apache / PHP / MariaDB affiche les données de la base", valideeOPSEC: true },
        ],
      },
    ],
  },

  // ============================================================ 3. PENTEST METHODOLOGIE
  {
    slug: "pentest-methodologie",
    titre: "Test d'intrusion : méthodologie de",
    sousTitre: "pentest",
    resume:
      "Test d'intrusion complet sur une machine d'entraînement Hack The Box : reconnaissance réseau, énumération web, identification des vulnérabilités, exploitation et validation, en environnement légal et contrôlé.",
    contexte:
      "Exercice de test d'intrusion mené sur une machine d'entraînement Hack The Box, une plateforme légale conçue pour la pratique du pentest en environnement contrôlé. L'objectif : appliquer une méthodologie structurée, de la reconnaissance à la prise de contrôle, comme lors d'un audit offensif réel. Ce projet comportait aussi un volet analyse de malware en laboratoire, que je présente de vive voix en entretien plutôt que de le publier ici, par prudence.",
    demarche:
      "J'ai suivi les phases classiques d'un test d'intrusion, chaque décision découlant du résultat de la précédente : reconnaissance réseau (découverte d'hôtes, ports, services, versions), énumération du service web (technologies, répertoires cachés), identification des vulnérabilités (scan dédié, repérage d'une porte dérobée), puis exploitation contrôlée et validation par les flags de la plateforme.",
    resultat:
      "Une méthodologie de pentest appliquée de bout en bout et documentée phase par phase, jusqu'à la prise de contrôle validée par les flags utilisateur et administrateur. Ce qui compte ici n'est pas le nombre d'outils lancés mais l'enchaînement des raisonnements.",
    stack: ["KALI LINUX", "NMAP", "GOBUSTER", "WHATWEB", "METASPLOIT", "HACK THE BOX"],
    etapes: [
      {
        titre: "Reconnaissance réseau",
        recit:
          "Première phase : cartographier la cible avant de l'attaquer. J'ai commencé par découvrir les hôtes actifs, puis énuméré les ports TCP ouverts, identifié les versions des services qui tournent derrière, et complété par un scan UDP souvent négligé. Cette cartographie définit toute la surface d'attaque sur laquelle concentrer la suite.",
        captures: [
          { src: "/projets/pentest-methodologie/recon-decouverte-hotes.webp", alt: "Découverte des hôtes actifs avec Nmap", legende: "Découverte des hôtes actifs sur le réseau cible", valideeOPSEC: true },
          { src: "/projets/pentest-methodologie/recon-nmap-tcp.webp", alt: "Scan Nmap des ports TCP ouverts", legende: "Identification des ports TCP ouverts et des services associés", valideeOPSEC: true },
          { src: "/projets/pentest-methodologie/recon-nmap-versions.webp", alt: "Détection des versions de services", legende: "Détection des versions exactes des services exposés", valideeOPSEC: true },
          { src: "/projets/pentest-methodologie/recon-scan-udp.webp", alt: "Scan des ports UDP", legende: "Scan UDP, souvent négligé mais riche en information", valideeOPSEC: true },
        ],
      },
      {
        titre: "Énumération du service web",
        recit:
          "Le service HTTP mérite une analyse dédiée. J'ai identifié les technologies employées par le serveur web, puis recherché les répertoires et fichiers cachés non référencés, et observé les réponses HTTP pour comprendre le fonctionnement de l'application. C'est souvent là que se trouvent les points d'entrée.",
        captures: [
          { src: "/projets/pentest-methodologie/web-whatweb.webp", alt: "Identification des technologies web avec whatweb", legende: "Énumération des technologies du serveur web", valideeOPSEC: true },
          { src: "/projets/pentest-methodologie/web-gobuster-commande.webp", alt: "Lancement de gobuster", legende: "Recherche de répertoires cachés avec gobuster", valideeOPSEC: true },
          { src: "/projets/pentest-methodologie/web-gobuster-resultat.webp", alt: "Résultats de gobuster", legende: "Répertoires et fichiers cachés découverts", valideeOPSEC: true },
          { src: "/projets/pentest-methodologie/web-reponse-http.webp", alt: "Analyse d'une réponse HTTP", legende: "Analyse du code HTML renvoyé par une requête HTTP", valideeOPSEC: true },
        ],
      },
      {
        titre: "Identification des vulnérabilités",
        recit:
          "À l'aide d'un scan de vulnérabilités ciblé sur les services découverts, j'ai mis en évidence les faiblesses exploitables, dont une porte dérobée signalée sur un port TCP. C'est le point de bascule entre l'analyse et l'exploitation : on passe de « qu'est-ce qui est exposé » à « qu'est-ce qui est attaquable ».",
        captures: [
          { src: "/projets/pentest-methodologie/vuln-scan-backdoor.webp", alt: "Scan de vulnérabilités révélant une backdoor", legende: "Le scan met en évidence une porte dérobée sur un port TCP", valideeOPSEC: true },
          { src: "/projets/pentest-methodologie/vuln-identification.webp", alt: "Identification précise de la vulnérabilité", legende: "Identification de la vulnérabilité à exploiter", valideeOPSEC: true },
        ],
      },
      {
        titre: "Exploitation et validation",
        recit:
          "Exploitation contrôlée de la vulnérabilité depuis la console Metasploit, puis validation de la réussite par la récupération des flags de la plateforme : d'abord le flag utilisateur, puis le flag administrateur après élévation de privilèges. Ces flags sont la preuve standard de prise de contrôle dans ce type d'exercice.",
        captures: [
          { src: "/projets/pentest-methodologie/exploit-msfconsole.webp", alt: "Ouverture de la console Metasploit", legende: "Préparation de l'exploitation depuis Metasploit", valideeOPSEC: true },
          { src: "/projets/pentest-methodologie/validation-flag-user.webp", alt: "Récupération du flag utilisateur", legende: "Flag utilisateur : première preuve de prise de contrôle", valideeOPSEC: true },
          { src: "/projets/pentest-methodologie/validation-flag-root.webp", alt: "Récupération du flag administrateur", legende: "Flag administrateur : contrôle total après élévation de privilèges", valideeOPSEC: true },
        ],
      },
    ],
  },

  // ============================================================ 4. PIPELINE DEVSECOPS
  {
    slug: "pipeline-devsecops",
    titre: "Chaîne d'intégration et de déploiement continus",
    sousTitre: "DevSecOps",
    resume:
      "Une chaîne complète de bout en bout : Jenkins, analyse de code SonarQube, conteneurisation Docker, déploiement GitOps sur Kubernetes avec ArgoCD, et supervision Prometheus / Grafana / Elastic.",
    contexte:
      "Construire une chaîne DevSecOps complète, de la modification du code jusqu'à l'application déployée et supervisée, avec des contrôles de qualité et de sécurité intégrés à chaque étape plutôt qu'ajoutés après coup.",
    demarche:
      "Mise en place d'un environnement d'intégration continue conteneurisé (Jenkins et SonarQube), création d'un pipeline multi-étapes déclenché par le dépôt de code, analyse statique du code, construction et publication de l'image conteneur, puis déploiement GitOps sur un cluster Kubernetes avec ArgoCD. Enfin, ajout d'une couche complète de supervision et de centralisation des journaux.",
    resultat:
      "Une chaîne fonctionnelle où un simple envoi de code déclenche l'analyse, la construction, le déploiement et rend l'application observable en temps réel. Toutes les identifiants sont gérés par le magasin de secrets de Jenkins, jamais en clair dans le code.",
    stack: ["JENKINS", "SONARQUBE", "DOCKER", "KUBERNETES", "ARGOCD", "PROMETHEUS", "GRAFANA", "ELASTIC"],
    etapes: [
      {
        titre: "Environnement d'intégration continue",
        recit:
          "J'ai démarré par le socle : un cluster Kubernetes local avec Minikube, puis Jenkins et SonarQube lancés en conteneurs Docker. Jenkins orchestre la chaîne, SonarQube analyse la qualité et la sécurité du code. Les extensions nécessaires ont été installées pour connecter Jenkins à Git, Docker et Kubernetes.",
        captures: [
          { src: "/projets/pipeline-devsecops/cluster-minikube-pret.webp", alt: "Cluster Minikube prêt", legende: "Le cluster Kubernetes local est opérationnel", valideeOPSEC: true },
          { src: "/projets/pipeline-devsecops/conteneurs-jenkins-sonarqube.webp", alt: "Conteneurs Jenkins et SonarQube en fonctionnement", legende: "Jenkins et SonarQube tournent en conteneurs Docker", valideeOPSEC: true },
          { src: "/projets/pipeline-devsecops/jenkins-pret.webp", alt: "Interface Jenkins opérationnelle", legende: "Jenkins est accessible et prêt à recevoir les tâches", valideeOPSEC: true },
          { src: "/projets/pipeline-devsecops/jenkins-plugins.webp", alt: "Installation des extensions Jenkins", legende: "Extensions installées pour Git, Docker et Kubernetes", valideeOPSEC: true },
        ],
      },
      {
        titre: "Construction du pipeline",
        recit:
          "J'ai créé la tâche d'intégration continue et défini le pipeline en plusieurs étapes : récupération du code, analyse statique avec SonarQube, construction de l'image conteneur et publication. Chaque étape est visible individuellement, ce qui permet d'identifier immédiatement où un échec se produit.",
        captures: [
          { src: "/projets/pipeline-devsecops/pipeline-creation-job.webp", alt: "Création de la tâche d'intégration continue", legende: "Création du job de pipeline dans Jenkins", valideeOPSEC: true },
          { src: "/projets/pipeline-devsecops/pipeline-build-console.webp", alt: "Console de construction du pipeline", legende: "Sortie console de l'exécution du pipeline", valideeOPSEC: true },
          { src: "/projets/pipeline-devsecops/pipeline-stages-succes.webp", alt: "Vue des étapes du pipeline toutes en succès", legende: "Toutes les étapes du pipeline passent au vert", valideeOPSEC: true },
        ],
      },
      {
        titre: "Déploiement GitOps avec ArgoCD",
        recit:
          "Le déploiement suit le principe GitOps : l'état voulu du cluster est décrit dans le dépôt Git, et ArgoCD se charge de faire converger le cluster vers cet état. Aucun déploiement manuel, tout est traçable et réversible par un retour en arrière dans Git.",
        captures: [
          { src: "/projets/pipeline-devsecops/argocd-application.webp", alt: "Application gérée par ArgoCD", legende: "ArgoCD synchronise le cluster avec l'état décrit dans Git", valideeOPSEC: true },
          { src: "/projets/pipeline-devsecops/application-deployee.webp", alt: "Application déployée et accessible", legende: "L'application est déployée et répond", valideeOPSEC: true },
          { src: "/projets/pipeline-devsecops/application-fonctionne.webp", alt: "Application en fonctionnement", legende: "Vérification du bon fonctionnement de l'application déployée", valideeOPSEC: true },
        ],
      },
      {
        titre: "Supervision et observabilité",
        recit:
          "Une application déployée qu'on ne surveille pas est une application dont on ignore l'état. J'ai ajouté Prometheus pour collecter les métriques, Grafana pour les visualiser en tableaux de bord, et Elastic pour centraliser les journaux. C'est ce qui permet de détecter une anomalie avant que l'utilisateur ne la signale.",
        captures: [
          { src: "/projets/pipeline-devsecops/prometheus-actif.webp", alt: "Prometheus collectant les métriques", legende: "Prometheus collecte les métriques du cluster", valideeOPSEC: true },
          { src: "/projets/pipeline-devsecops/grafana-datasource.webp", alt: "Configuration de la source de données Grafana", legende: "Prometheus déclaré comme source de données dans Grafana", valideeOPSEC: true },
          { src: "/projets/pipeline-devsecops/grafana-actif.webp", alt: "Grafana opérationnel", legende: "Grafana est accessible et connecté", valideeOPSEC: true },
          { src: "/projets/pipeline-devsecops/grafana-dashboard.webp", alt: "Tableau de bord Grafana de supervision", legende: "Tableau de bord de supervision du cluster en temps réel", valideeOPSEC: true },
          { src: "/projets/pipeline-devsecops/elastic-installation.webp", alt: "Installation d'Elastic pour la centralisation des journaux", legende: "Elastic centralise les journaux de la plateforme", valideeOPSEC: true },
        ],
      },
      {
        titre: "Nettoyage des ressources",
        recit:
          "Dernier réflexe, souvent oublié : libérer les ressources en fin de projet. En environnement cloud, des ressources laissées actives coûtent de l'argent et élargissent inutilement la surface d'attaque.",
        captures: [
          { src: "/projets/pipeline-devsecops/nettoyage-ressources.webp", alt: "Nettoyage des ressources du cluster", legende: "Libération des ressources en fin de projet", valideeOPSEC: true },
        ],
      },
    ],
  },

  // ============================================================ 5. CHIFFREMENT CLOUD AWS KMS
  {
    slug: "chiffrement-cloud-aws-kms",
    titre: "Gestion des clés de chiffrement dans le cloud avec",
    sousTitre: "AWS KMS",
    resume:
      "Chiffrement de données sensibles au repos sur Amazon S3 avec une clé gérée par le client dans AWS KMS : gouvernance des clés, séparation des rôles, scénarios d'échec et traçabilité CloudTrail.",
    contexte:
      "Stocker des données sensibles dans le cloud impose deux exigences : garantir leur confidentialité au repos même si le support de stockage fuite, et surtout maîtriser la clé cryptographique, car la sécurité du chiffrement dépend d'abord de la protection et de la gouvernance des clés. Le cas d'usage retenu est un coffre RH contenant un fichier de paie de test.",
    demarche:
      "J'ai suivi une chaîne complète : création des identités IAM avec séparation entre un profil d'administration et un profil métier, création d'une clé maîtresse gérée par le client dans KMS, définition séparée des administrateurs et des utilisateurs de la clé, activation du chiffrement côté serveur SSE-KMS sur le compartiment S3, puis tests d'accès autorisé et non autorisé, avec vérification des traces dans CloudTrail.",
    resultat:
      "Une démonstration complète du modèle : les données sont illisibles sans autorisation, la désactivation de la clé agit comme un coupe-circuit qui rend le déchiffrement impossible, et chaque opération cryptographique est tracée. L'utilisateur n'obtient jamais la clé, seulement le résultat de l'opération après contrôle des politiques.",
    stack: ["AWS KMS", "AMAZON S3", "IAM", "CLOUDTRAIL", "SSE-KMS"],
    etapes: [
      {
        titre: "Architecture et chiffrement par enveloppe",
        recit:
          "L'architecture s'organise en trois couches : l'identité (IAM) définit qui a le droit d'agir, la gestion des clés (KMS) conserve et opère les clés en appliquant les politiques, et le stockage (S3) applique le chiffrement. Le principe clé : ni les applications ni les utilisateurs ne manipulent la clé maîtresse, ils demandent des opérations au service. Le chiffrement suit un modèle hiérarchique : la donnée est chiffrée par une clé de données rapide, elle-même protégée par la clé maîtresse.",
        captures: [
          { src: "/projets/chiffrement-cloud-aws-kms/architecture-kms.webp", alt: "Architecture conceptuelle d'un service de gestion de clés", legende: "KMS comme autorité de confiance entre identité et stockage", valideeOPSEC: true },
          { src: "/projets/chiffrement-cloud-aws-kms/modele-cle-hierarchique.webp", alt: "Modèle hiérarchique des clés", legende: "Clé maîtresse, clés de données, fichiers : le chiffrement par enveloppe", valideeOPSEC: true },
          { src: "/projets/chiffrement-cloud-aws-kms/cycle-chiffrement.webp", alt: "Cycle de chiffrement et de déchiffrement", legende: "Le cycle complet, du chiffrement à la restitution en clair", valideeOPSEC: true },
        ],
      },
      {
        titre: "Identités IAM et séparation des rôles",
        recit:
          "Deux utilisateurs distincts sont créés : un profil d'administration pour la gouvernance de la clé, et un profil métier pour l'utilisation quotidienne. Cette séparation illustre un principe fondamental : administrer une clé (la désactiver, la supprimer, modifier sa politique) ne doit jamais être accordé au même profil que celui qui s'en sert au quotidien.",
        captures: [
          { src: "/projets/chiffrement-cloud-aws-kms/iam-utilisateurs.webp", alt: "Création des utilisateurs IAM", legende: "Séparation des responsabilités : un profil d'administration, un profil métier", valideeOPSEC: true },
        ],
      },
      {
        titre: "Création de la clé et politiques d'autorisation",
        recit:
          "J'ai choisi une clé gérée par le client plutôt qu'une clé gérée par AWS : elle permet de définir une politique adaptée, d'activer la rotation, de désactiver la clé en urgence et d'obtenir une traçabilité renforcée. Les autorisations distinguent les administrateurs de clé, qui peuvent modifier la gouvernance, des utilisateurs de clé, qui peuvent uniquement déclencher des opérations cryptographiques sans jamais toucher à la politique.",
        captures: [
          { src: "/projets/chiffrement-cloud-aws-kms/kms-creation-cle.webp", alt: "Création de la clé KMS gérée par le client", legende: "Création d'une clé maîtresse gérée par le client, avec son alias", valideeOPSEC: true },
          { src: "/projets/chiffrement-cloud-aws-kms/kms-administrateurs-cle.webp", alt: "Définition des administrateurs de la clé", legende: "Les administrateurs de clé gèrent la politique et la rotation", valideeOPSEC: true },
          { src: "/projets/chiffrement-cloud-aws-kms/kms-utilisateurs-cle.webp", alt: "Définition des utilisateurs de la clé", legende: "Les utilisateurs de clé peuvent chiffrer et déchiffrer, sans modifier la politique", valideeOPSEC: true },
        ],
      },
      {
        titre: "Compartiment S3 et chiffrement côté serveur",
        recit:
          "Le compartiment S3 sert de coffre. J'ai activé le chiffrement côté serveur SSE-KMS plutôt que SSE-S3, car il associe le stockage à une clé KMS avec sa politique, son audit et sa séparation des rôles. L'option de clé de compartiment est activée pour réduire les appels au service, donc la latence et le coût. Une fois le fichier chargé, la console permet de vérifier que la clé est bien liée à l'objet : on démontre la configuration effective, pas seulement l'intention.",
        captures: [
          { src: "/projets/chiffrement-cloud-aws-kms/s3-creation-bucket.webp", alt: "Création du compartiment S3", legende: "Création du coffre de stockage", valideeOPSEC: true },
          { src: "/projets/chiffrement-cloud-aws-kms/s3-chiffrement-sse-kms.webp", alt: "Configuration du chiffrement SSE-KMS", legende: "Chiffrement côté serveur SSE-KMS associé à la clé du projet", valideeOPSEC: true },
          { src: "/projets/chiffrement-cloud-aws-kms/s3-chargement-fichier.webp", alt: "Chargement du fichier de test", legende: "Le fichier est chiffré automatiquement au repos dès son import", valideeOPSEC: true },
        ],
      },
      {
        titre: "Tests : accès refusé, coupe-circuit, accès autorisé",
        recit:
          "La partie la plus démonstrative. Sans les droits nécessaires, l'accès est refusé : connaître l'adresse de l'objet ne suffit pas, l'accès est gouverné par les politiques. Clé désactivée, le déchiffrement devient impossible même pour un utilisateur autorisé : c'est la preuve du coupe-circuit, la clé contrôle réellement l'accès aux données. Enfin, avec les droits et la clé active, le contenu est restitué en clair sans que l'utilisateur n'obtienne jamais la clé.",
        captures: [
          { src: "/projets/chiffrement-cloud-aws-kms/test-acces-refuse.webp", alt: "Test d'accès non autorisé refusé", legende: "Accès refusé : l'adresse seule ne donne pas accès à la donnée", valideeOPSEC: true },
          { src: "/projets/chiffrement-cloud-aws-kms/test-dechiffrement-autorise.webp", alt: "Déchiffrement autorisé et contenu lisible", legende: "Accès autorisé : le contenu est déchiffré côté serveur et restitué", valideeOPSEC: true },
        ],
      },
    ],
  },

  // ============================================================ 6. CHATSEC
  {
    slug: "chatsec-messagerie-securisee",
    titre: "ChatSec, messagerie de groupe",
    sousTitre: "sécurisée",
    resume:
      "Application de messagerie chiffrée de bout en bout : chiffrement hybride AES-256-GCM, infrastructure à clés publiques X.509, tunnel TLS 1.3, authentification LDAP et historique local chiffré.",
    contexte:
      "Projet technique de fin d'année mené en équipe : concevoir et développer une messagerie de groupe sécurisée pour un usage en entreprise, où la confidentialité des échanges et le contrôle des identités sont des exigences fortes. L'ensemble a été cadré par un cahier des charges, une documentation technique et une campagne de tests formalisée.",
    demarche:
      "Le produit se compose d'un serveur en Python, qui relaie les messages chiffrés, authentifie les utilisateurs auprès de l'annuaire LDAP, joue le rôle d'autorité de certification pour signer les certificats clients et distribue la clé de groupe ; et d'un client avec interface graphique, qui se connecte au serveur par un tunnel TLS 1.3, chiffre et signe les messages, et conserve l'historique dans une base locale chiffrée.",
    resultat:
      "Une application fonctionnelle validée par une suite de tests couvrant cinq exigences : authentification LDAP sécurisée, tunnel TLS 1.3, chiffrement hybride des messages, gestion des certificats X.509 et robustesse réseau (livraison hors-ligne, reconnexion automatique).",
    stack: ["PYTHON", "TLS 1.3", "AES-256-GCM", "PKI X.509", "RSA-PSS", "LDAP", "SQLITE"],
    etapes: [
      {
        titre: "Architecture de la solution",
        recit:
          "L'architecture répartit clairement les rôles : le serveur ne déchiffre jamais les messages, il ne fait que les relayer ; il centralise en revanche l'authentification, la signature des certificats et la distribution de la clé de groupe. Le chiffrement est hybride : symétrique pour la rapidité sur le contenu, asymétrique pour protéger la clé et signer.",
        captures: [
          { src: "/projets/chatsec-messagerie-securisee/architecture-chatsec.webp", alt: "Architecture de la solution ChatSec", legende: "Architecture générale : serveur relais, PKI, annuaire LDAP et clients", valideeOPSEC: true },
        ],
      },
      {
        titre: "Le client et l'expérience utilisateur",
        recit:
          "Le client dispose d'une interface graphique et est distribué sous forme d'exécutable autonome. Il se connecte au serveur par TLS 1.3, chiffre et signe chaque message, et stocke l'historique localement dans une base chiffrée. Les fonctions de robustesse (livraison hors-ligne, reconnexion automatique) le rendent utilisable en conditions réelles.",
        captures: [
          { src: "/projets/chatsec-messagerie-securisee/interface-client.webp", alt: "Interface du client ChatSec", legende: "Interface du client de messagerie sécurisée", valideeOPSEC: true },
        ],
      },
      {
        titre: "Validation par les tests",
        recit:
          "Chaque exigence du cahier des charges a été traduite en scénarios de test tracés : authentification avec identifiants valides et invalides, utilisateur absent de l'annuaire, révocation en cours de session, vérification du tunnel chiffré, du chiffrement des messages et de la validité des certificats.",
        captures: [
          { src: "/projets/chatsec-messagerie-securisee/tests-validation.webp", alt: "Campagne de tests de validation", legende: "Suite de tests couvrant les cinq exigences du cahier des charges", valideeOPSEC: true },
        ],
      },
      {
        titre: "Organisation de l'équipe",
        recit:
          "Projet mené en équipe avec une répartition formalisée des responsabilités, une méthodologie et des outils communs, un planning suivi et une documentation livrée : cahier des charges, rapport technique, documentation et audit.",
        captures: [
          { src: "/projets/chatsec-messagerie-securisee/organigramme-equipe.webp", alt: "Organigramme de l'équipe projet", legende: "Répartition des rôles au sein de l'équipe", valideeOPSEC: true },
        ],
      },
    ],
  },

  // ============================================================ 7. CE SITE
  {
    slug: "ce-site",
    titre: "Ce site",
    sousTitre: "lui-même",
    resume: "Site statique durci, infrastructure AWS en Terraform, déploiement continu via OIDC : la démonstration en direct.",
    contexte:
      "Ce portfolio est mon terrain de démonstration : site statique Next.js, bucket S3 privé derrière CloudFront, headers de sécurité stricts, infrastructure entièrement décrite en Terraform et pipeline GitHub Actions authentifié par OIDC, sans aucune clé stockée.",
    demarche:
      "Cadrage par un cahier des charges complet (maquettes, modèle de données, exigences de sécurité), développement multi-pages en export statique, durcissement applicatif, infrastructure as code, pipeline de déploiement, puis audits externes.",
    resultat:
      "Le site que vous lisez. À compléter en fin de projet avec les rapports d'audit.",
    stack: ["NEXT.JS", "TERRAFORM", "S3 / CLOUDFRONT", "GITHUB ACTIONS", "OIDC"],
    etapes: [
      { titre: "Cadrage et cahier des charges", recit: "À RÉDIGER : maquettes, charte graphique, exigences de sécurité.", captures: [] },
      { titre: "Infrastructure Terraform", recit: "À RÉDIGER en phase 5.", captures: [] },
      { titre: "Pipeline et audits", recit: "À RÉDIGER en phases 6 et 7, avec les rapports en captures.", captures: [] },
    ],
  },
];
