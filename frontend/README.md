# Interface React

L’interface fait partie de l’application Java servie sur le même domaine.

Prérequis : Node.js 24 (au moins 24.15).

```sh
npm ci
npm start
```

Vite affiche l’adresse locale et transmet `/api` à Spring Boot sur le port 8080.

```sh
npm test
npm run build
```

La compilation produit `dist/`, intégré dans le JAR par Maven.
Voir le [README principal](../README.md) pour le démarrage complet et Docker.
