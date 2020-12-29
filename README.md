# LISTE DE CLIENTS

Cette application web sert à gérer une liste de clients. A l'ouverture, la page affiche la liste des clients si il en existe. L'interface utilisateur permet de chercher de un client spécifique mais également de de choisir l'ordre d'affichage du tableau.

## Table of contents

<!-- ⛔️ MD-MAGIC-EXAMPLE:START (TOC:collapse=true&collapseText=Click to expand) -->
<details>
<summary>Click to expand table of contents</summary>

* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [Licence](#licence)
* [Contributing](#contributing)
* [Questions](#questions)
* [Author information](#author-information)

</details>
<!-- ⛔️ MD-MAGIC-EXAMPLE:END -->

## Technologies

```
- Java
- Spring-boot
- PostgreSQL
- Maven
- Hibernate
- Javascript
- React
- HTML
- CSS
```

## Installation

Pour commencer vous devez intaller Java, Maven et Spring-boot sur votre ordinateur.

Executer la commande suivante pour insaller l'application:

1. Création de la base de données `clientsdb` et de la table `clients`

```sh
CREATE DATABASE clients;
CREATE TABLE users (
  id SERIAL,
  lastname VARCHAR(30),
  firstname VARCHAR(30),
  phone VARCHAR(11)
);  
```

2. Lancement de l'application
```sh
mvn spring-but:run    
```

## Usage

* Lorsque la page est chargée, est affichée la liste de clients avec: noms, prénoms et numéro de téléphone.
* Lorsque l'utilisateur saisit une entrée de `recherche`, seuls les clients dont le `nom` correspond à la recherche sont affichés.
* L'utilisateur peut changer le type de filtre de recherche pour chercher les clients par de `prénom` `préléphone`.
* L'utilisateur peut ordonner le tableau par `id`, `nom`, `prénom` ou `numéro` de `téléphone`.

## Licence

[MIT](https://choosealicense.com/licenses/mit)

## Contribution

N'hésitez pas à faire une pull request.

## Questions et remarques

Veuillez trouver les informations sur l'auteur et le contact ci-dessous.

## Information sur l'auteur

| <img align="left" width="150" height="auto" margin="10"  src="https://avatars3.githubusercontent.com/u/59809722?v=4"> |  Brice Boutet <br/>  Email : [boutetlb@gmail.com](boutetlb@gmail.com)<br/> GitHub : [BBoutet1](https://github.com/bboutet1)<br> Blog:  [https://bboutet1.github.io/](https://github.com/https://bboutet1.github.io/) |
| -------- | ----------- |

