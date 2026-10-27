# Portfolio de Steeve Guillot

Site personnel statique, en français, destiné aux recruteurs. Le contenu éditable est dans `src/data/`. Les composants ne contiennent pas le texte du parcours.

## Installation

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
```

## Lancement

```bash
npm run dev
```

Le site est servi sur `http://localhost:5173`.

Build de production :

```bash
npm run build
npm run preview
```

Le dossier généré est `dist/`.

## Modifier le contenu

Tout le texte visible vient de `src/data/`.

| Fichier | Contenu |
| --- | --- |
| `profile.js` | Identité, accroche, disponibilité, e-mail, liens, photo, CV, chiffres du hero, qualités, centres d'intérêt |
| `experiences.js` | Expériences, de la plus récente à la plus ancienne |
| `education.js` | Formation |
| `skills.js` | Compétences, groupées par catégorie |
| `projects.js` | Projets |

Les expériences s'affichent en une seule phrase. Un commentaire `TODO` dans `experiences.js` (hôpital, collège) déclenche un `console.warn` dans le navigateur tant que la part exacte de Steeve n'est pas précisée. Ce rappel n'apparaît pas sur la page.

## Ajouter un projet

Dans `src/data/projects.js`, compléter une entrée vide ou en ajouter une :

```js
{
  title: 'Nom du projet',
  description: 'Ce que le projet fait, et avec quelles technos.',
  image: 'projects/nom-du-projet.webp',
  githubUrl: 'https://github.com/SteeveGllt/nom-du-projet',
  demoUrl: '',
  isPlaceholder: false,
}
```

Déposer le visuel WebP dans `public/projects/`. Tant que `image` est vide, la carte affiche un panneau dégradé avec le titre. `demoUrl` est facultatif : s'il est renseigné, un bouton « Voir le site » apparaît.

Une entrée avec `isPlaceholder: true` affiche une carte « Projet à venir ».

## Photo et CV

**Photo.** Exporter un portrait en WebP (largeur utile autour de 800 px), le placer dans `public/`, puis renseigner le fichier dans `src/data/profile.js` :

```js
photo: 'photo-steeve-guillot.webp',
```

Laisser `photo` vide pour conserver le monogramme.

**CV.** Placer le fichier ici :

```text
public/cv-steeve-guillot.pdf
```

Le bouton « Télécharger mon CV » pointe vers ce chemin. Le nom est `cvFile` dans `profile.js`.

## Thème

Le thème suit `prefers-color-scheme` au premier chargement, puis le choix du bouton soleil / lune est mémorisé dans `localStorage` (clé `theme`). La classe `dark` est posée sur `<html>` avant le premier rendu pour éviter un flash.

## Formulaire de contact

Sans variable d'environnement, le bouton « Envoyer » ouvre un `mailto:` prérempli vers l'adresse de `profile.js`.

Pour un envoi Formspree :

1. Créer un formulaire sur [formspree.io](https://formspree.io) et copier l'endpoint.
2. Créer un fichier `.env` à la racine (le modèle est `.env.example`) :

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

3. Relancer `npm run dev`, ou refaire `npm run build`. Vite injecte cette variable au moment du build, pas au runtime du serveur d'hébergement.

Sur Netlify ou Vercel, déclarer `VITE_FORM_ENDPOINT` dans les variables d'environnement, puis relancer un déploiement.

## Déploiement

Le site est une page statique, sans routeur. Publier le contenu de `dist/`.

### Netlify

- Build command : `npm run build`
- Publish directory : `dist`
- Variable : `VITE_FORM_ENDPOINT` si le formulaire doit envoyer sans mailto

### Vercel

- Framework : Vite
- Output : `dist`
- Même variable d'environnement, puis redéploiement

### GitHub Pages

Si le site est servi à la racine d'un domaine, le build par défaut suffit.

S'il est servi dans un sous-dossier (`https://steevegllt.github.io/portfoliov3/`), définir la base dans `vite.config.js` :

```js
export default defineConfig({
  plugins: [vue()],
  base: '/portfoliov3/',
})
```

Les fichiers de `public/` (CV, photo, visuels) restent référencés par leur nom : le helper `publicPath` dans `profile.js` préfixe cette base. Rebuild, puis publier `dist/` avec l'action GitHub Pages ou la branche de déploiement du dépôt.
