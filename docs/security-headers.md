# En-têtes de sécurité du site

Ce document explique les en-têtes de sécurité (security headers) envoyés
par mon site à chaque visiteur. Ce sont des instructions invisibles que le
serveur ajoute à chaque page pour dire au navigateur comment se comporter
en toute sécurité.

Mon site étant statique (hébergé sur AWS S3 derrière CloudFront), ces
en-têtes seront appliqués par une "Response Headers Policy" CloudFront,
configurée en Terraform (phase 5). Ce document sert de référence pour
cette configuration.

---

## 1. Strict-Transport-Security (HSTS)

    Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

Force le navigateur à ne communiquer avec mon site qu'en HTTPS (connexion
chiffrée) pendant 2 ans. Même si quelqu'un tape l'adresse en "http://",
le navigateur bascule automatiquement en "https://".

Attaque bloquée : l'interception des données sur un réseau non sécurisé
(un pirate sur le même wifi qui essaie de lire la connexion).

---

## 2. Content-Security-Policy (CSP)

    Content-Security-Policy: default-src 'self'; img-src 'self' data:;
    style-src 'self' 'unsafe-inline'; script-src 'self'; object-src 'none';
    base-uri 'self'; frame-ancestors 'none'

C'est l'en-tête le plus important. Il définit une liste blanche de ce que
la page a le droit de charger. "'self'" signifie "uniquement depuis mon
propre domaine". Tout script ou contenu venant d'ailleurs est bloqué.

Attaque bloquée : l'injection de code malveillant (XSS). Si un pirate
réussissait à insérer un script pointant vers son serveur, le navigateur
refuserait de l'exécuter car il ne vient pas de mon domaine.

---

## 3. X-Content-Type-Options

    X-Content-Type-Options: nosniff

Interdit au navigateur de "deviner" le type d'un fichier. Il doit se fier
au type déclaré, sans essayer de l'interpréter autrement.

Attaque bloquée : un fichier déposé comme une simple image mais contenant
du code, que le navigateur pourrait sinon exécuter par erreur.

---

## 4. X-Frame-Options

    X-Frame-Options: DENY

Interdit d'afficher mon site à l'intérieur d'une fenêtre (iframe) sur un
autre site.

Attaque bloquée : le clickjacking. Un pirate affiche mon site en
transparence sous un faux bouton "Cliquez ici pour gagner", et l'internaute
clique en réalité sur un élément de mon site sans le savoir.

---

## 5. Referrer-Policy

    Referrer-Policy: strict-origin-when-cross-origin

Contrôle l'information envoyée à un site externe quand un visiteur clique
sur un lien sortant. Le site externe verra que le visiteur vient de mon
domaine, mais pas la page exacte qu'il consultait.

Attaque bloquée : la fuite d'informations sur la navigation de mes
visiteurs vers des sites tiers.

---

## 6. Permissions-Policy

    Permissions-Policy: camera=(), microphone=(), geolocation=()

Désactive explicitement des fonctionnalités du navigateur que mon site
n'utilise pas : caméra, microphone, géolocalisation. Les parenthèses vides
signifient "autorisé pour personne".

Intérêt : réduire la surface d'attaque. Si une faille permettait à du code
étranger de s'exécuter, il ne pourrait quand même pas activer la caméra ou
le micro du visiteur.

---

## Vérification 

Une fois le site en ligne, je vérifierai ces en-têtes avec :
- securityheaders.com (objectif : note A+)
- Mozilla Observatory (objectif : note maximale)
- la commande : curl -I https://mon-domaine