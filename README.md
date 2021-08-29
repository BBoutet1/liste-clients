# LISTE DE CLIENTS

Cette application web sert à gérer une liste de clients. A l'ouverture, la page affiche la liste des clients s'il en existe. L'interface utilisateur permet de créér une nouvelle entrée, de la modifier ou la supprimer,  chercher un client spécifique mais également de choisir l'ordre d'affichage du tableau (par nom ou prénom).

## Table of contents

<!-- ⛔️ MD-MAGIC-EXAMPLE:START (TOC:collapse=true&collapseText=Click to expand) -->
<details>
<summary>Click to expand table of contents</summary>

* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [Démonstration](#démonstration)
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
- Bootstrap
...
```

## Installation

Pour commencer vous devez intaller Java, Maven et Spring-boot ainsi que le code source sur votre ordinateur.

Executer les commandes suivante pour insaller lancer l'application sur votre ordinateur:

1. Création de la base de données `clientsdb` et de la table `clients`

```sh
CREATE DATABASE clientsdb;
CREATE TABLE clients (
  id SERIAL,
  lastname VARCHAR(30) NOT NULL,
  firstname VARCHAR(30),
  phone VARCHAR(11)
);  
```

2. Lancement de l'application
```sh
mvn spring-boot:run    
```

## Comment utiliser l'application

* Lorsque la page est chargée, la liste de clients  est affichée si elle existe, sinon un message invitant à ajouter un client apparait.

* Lorsque l'utilisateur appuie le bouton `Ajouter un client`, un formulaire s'affiche pour permettre d'entrer nom, prénom et numéro de téléphone d'un nouveau client.

* Lorsque l'utilisateur appuie sur le bouton `Enregistrer`, la nouvelle entrée est enregistrée dans le tableau de la liste de clients sur condition que le champ réservé au nom ne soit pas vide et que le numéro de téléphone soit un nombre à 10 chiffres.

* Lorsque l'utilisateur appuie sur l'une des icône `poubelle` le client de la ligne concernée est éffacé de la liste.

* Lorsque le client appuie sur l'une des icônes `editer` un formulaire de saisie s'ouvre pour modifier les informations du client.
 -- Si l'utilisateur appuie sur l'icône `enregister`, les modifications sont enregistrées  sur condition que le champ réservé au nom ne soit pas vide et que le numéro de téléphone soit un nombre à 10 chiffres.
 -- Si l'utilisateur appuie sur l'icône `fermer`, le formulaire de modification se referme.
 
* Lorsque l'utilisateur saisit une entrée de `recherche`, seuls les clients dont le `nom` correspond à la recherche sont affichés. 
-- L'utilisateur peut changer le filtre de recherche pour chercher les clients par `prénom` ou `téléphone`.

* L'utilisateur peut ordonner le tableau par `id`, `nom`, `prénom` ou `numéro` de `téléphone`.

## Démonstration

L'image `.gif` ci-dessous permet de faire une démo rapide de l'application.

![alt text](./frontend/src/img/demo.gif "Project 3 Screen Shot Link-N-Park")


## Licence

[MIT](https://choosealicense.com/licenses/mit)

## Contribution

N'hésitez pas à faire d'extraction (pull request).

## Questions et remarques

Veuillez trouver les informations sur l'auteur et le contact ci-dessous.

## Information sur l'auteur

| <img align="left" width="150" height="auto" margin="10"  src="https://avatars3.githubusercontent.com/u/59809722?v=4"> |  Brice Boutet <br/>  Email : [boutetlb@gmail.com](boutetlb@gmail.com)<br/> GitHub : [BBoutet1](https://github.com/bboutet1)<br> Blog:  [https://bboutet1.github.io/](https://github.com/https://bboutet1.github.io/) |
| -------- | ----------- |

