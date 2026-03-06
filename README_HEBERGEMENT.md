# Fichiers prêts pour l'hébergement

Vous avez plusieurs options pour héberger votre site :

1.  **Dossier `public_html`** (Recommandé) :
    *   C'est la version la plus performante et optimisée.
    *   Contient `index.html` et le dossier `assets/`.
    *   Hébergez tout le contenu de ce dossier sur votre serveur.

2.  **Dossier `www`** :
    *   Identique à `public_html`, juste un autre nom standard.

3.  **Dossier `build_output`** :
    *   Identique à `public_html`, juste un autre nom.

4.  **Dossier `standalone`** :
    *   Version simplifiée en un seul fichier HTML (`index.html`) + un fichier de données (`data.js`).
    *   Plus facile à modifier à la main si vous ne connaissez pas React/Vite.
    *   Moins performant que `public_html` mais fonctionne partout sans configuration.

Choisissez l'un de ces dossiers et mettez son contenu en ligne !
