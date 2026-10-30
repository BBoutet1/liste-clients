# Liste de clients

Application full stack personnelle créée en 2020–2021 avec **Java, Spring Boot, JPA et React**. Elle permet d’ajouter, de rechercher, de trier, de modifier et de supprimer des clients.

La maintenance de 2026 actualise les dépendances, la validation, les tests et le déploiement tout en conservant le périmètre du projet initial.

## Technologies

- Java 17, Spring Boot 4.1.2, Spring MVC, Spring Data JPA / Hibernate, Jakarta Validation.
- React 19, Vite 8, Bootstrap 5 ; appels REST avec `fetch`.
- H2 en mémoire pour la démonstration ; PostgreSQL pour un environnement persistant.
- Maven Wrapper 3.9.16, Node.js 24, JUnit / MockMvc, Vitest / Testing Library, Docker, GitHub Actions.

## Démarrage rapide

Prérequis : **JDK 17**. Le wrapper Maven et le plugin frontend téléchargent les outils nécessaires au premier lancement. Une connexion Internet est donc requise.

```sh
./mvnw clean verify
java -jar target/liste-clients.jar
```

Sous Windows, utiliser `mvnw.cmd` à la place de `./mvnw`.

Ouvrir **http://localhost:8080**. Le JAR contient l’API et l’interface ; aucun serveur frontend distinct n’est nécessaire.

Par défaut, le profil `demo` utilise une base H2 en mémoire et trois entrées fictives. Les changements sont partagés entre les visiteurs d’une même instance et **disparaissent au redémarrage**. Utiliser uniquement des données fictives.

## Développement

Pour faire évoluer l’interface avec rechargement automatique, ouvrir deux terminaux :

```sh
# API sur le port 8080
./mvnw -P'!frontend' spring-boot:run
```

```sh
# Interface — suivre l’adresse affichée par Vite
cd frontend
npm ci
npm start
```

Le proxy Vite transmet `/api` au serveur Java. En déploiement, Spring Boot sert les deux parties sur le même domaine.

## Tests

```sh
# Chaîne complète : installation reproductible, tests React, compilation, tests API, JAR
./mvnw clean verify

# API seule
./mvnw -P'!frontend' test

# Interface seule
cd frontend
npm ci
npm test
npm run build
npm audit
```

Les tests API couvrent le CRUD, la collection vide, les champs facultatifs, les validations, les clients absents, la recherche et l’exposition limitée du point de santé. Les tests d’interface couvrent aussi les erreurs réseau et l’attente de confirmation du serveur avant d’afficher un succès.

La CI exécute les tests API sur H2 puis PostgreSQL et construit le conteneur avant de vérifier ses routes HTTP.

## API REST

| Méthode | Route | Comportement |
| --- | --- | --- |
| GET | `/api/clients` | Liste ordonnée par ID ; `200 []` si vide. |
| GET | `/api/clients?name=exem` | Filtre sur le nom, sans distinction de casse. |
| GET | `/api/clients/{id}` | Client ou `404`. |
| POST | `/api/clients` | Création ; `201` avec en-tête `Location`. |
| PUT | `/api/clients/{id}` | Modification ; `200`, ou `404` si absent. |
| DELETE | `/api/clients/{id}` | Suppression ; `204`, ou `404` si absent. |
| GET | `/actuator/health` | État de santé sans détails de configuration. |

Corps de création / modification :

```json
{"lastname":"Exemple","firstname":"Camille","phone":"4185550101"}
```

Le nom est obligatoire et limité à 30 caractères. Le prénom est facultatif et limité à 30 caractères. Le téléphone est facultatif ; lorsqu’il est renseigné, il doit contenir exactement 10 chiffres. Une entrée invalide retourne `400` avec un objet `errors` par champ.

## Déploiement Docker

```sh
docker build -t liste-clients .
docker run --rm -p 8080:8080 liste-clients
```

Le Dockerfile compile et teste l’interface et l’API. L’image finale contient uniquement le JRE et le JAR et s’exécute sans privilèges root.

Pour un hébergeur compatible Docker / JVM :

- Déployer ce dépôt avec le Dockerfile à sa racine.
- Utiliser le profil `demo` pour une démonstration publique sur données fictives.
- Configurer la sonde HTTP sur `/actuator/health`.
- Laisser l’hébergeur définir `PORT`, ou utiliser le port 8080 par défaut.
- Activer HTTPS au niveau de l’hébergeur.

Le premier démarrage peut prendre quelques dizaines de secondes, notamment sur un hébergement à ressources limitées. Aucun lien de démonstration n’est annoncé avant validation du déploiement effectif.

### PostgreSQL

Créer une base vide dédiée, puis définir ces variables dans l’environnement de lancement ou dans le gestionnaire de secrets de l’hébergeur :

| Variable | Valeur attendue |
| --- | --- |
| `SPRING_PROFILES_ACTIVE` | `postgres` |
| `DB_JDBC_URL` | URL JDBC, par exemple `jdbc:postgresql://localhost:5432/clientsdb` ; utiliser les options TLS exigées par l’hébergeur. |
| `DB_USER` | Utilisateur de la base. |
| `DB_PASSWORD` | Mot de passe de la base. |

Le profil PostgreSQL ne charge aucune donnée de démonstration. Hibernate crée / met à jour la table pour ce petit projet. Pour une exploitation réelle, prévoir des migrations de schéma versionnées.

Cette application de portfolio ne gère ni authentification ni autorisations. Le profil PostgreSQL convient à un environnement de développement privé ; ne pas y exposer de données personnelles réelles sans ajouter les contrôles nécessaires.

### Anciens accès

Les anciens identifiants ont été retirés de la configuration active. S’ils sont encore valides, ils doivent être révoqués ou renouvelés : supprimer une valeur du dernier commit ne la retire pas de l’historique Git. Ne jamais inscrire de nouveaux secrets dans le dépôt.

## Démonstration historique

L’animation ci-dessous illustre la version initiale ; l’interface maintenue conserve les mêmes fonctions principales.

![Démonstration de la version initiale](frontend/src/img/demo.gif)

## Auteur et licence

[Brice Boutet](https://github.com/BBoutet1) · [Profil GitHub](https://github.com/BBoutet1)

Licence MIT, comme indiqué dans la version initiale du projet.
