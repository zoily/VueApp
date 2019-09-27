# VueJS + Vuex + NGInx + Docker

Un exemple basique respectant un modèle d'architecture pour un développement en VueJS.

Si ce projet vous est utile n'hésitez pas à me donner un Tip en BAT via brave (cf : https://brave.com/zoi565)

## VueJS

Les frameworks utilisés sont les suivants :
 - [VueJS](https://fr.vuejs.org/)
 - [Vuetify](https://vuetifyjs.com/en/)
 - [Vue CLI](https://cli.vuejs.org/) (permettant de générer rapidement une solution de base VueJS avec les bons outils, babel, eslint, vuex...)

Pour utiliser correctement ESLint, je vous conseil de l'associer avec prettier de visual studio code.
Pour exécuter la solution en localhost (/!\ La map ne pourra accéder à l'API Google et fonctionner normalement) :
 - installer node.js
 - cloner le repo GIT et ouvrir un terminal à la racine du projet
 - Exécuter les commandes suivantes 
```
npm install
npm run serve
```

## Structure du projet

 - public : Ressources web non transpilées
 - src
    - assets : Autres ressources
    - components : Composants visuels 
    - modules : Sources web transpilées regroupées par composante métier
        - moduleName.vue : Partie visuel du module
        - moduleStore.js : Fichier de gestion d'état des données du module
            - State : données mises en cache
            - Getters : fonctions d'accès à l'état
            - Mutations : fonctions de modification de l'état
            - Actions : fonctions de traitement des taches asynchrones
        - moduleRepository : Point d'accès aux APIs
    - views : Pages correspondantes aux diverses routes
    - App.vue : Racine de l'app VueJS
    - main.js : Fichier racine de l'application web
 - les fichiers à la racine sont des fichiers de configuration des différents outils

 ## Production

Pour la mise en production, la solution est déployée via un serveur nginx contenu dans un docker déployé sur heroku. 

Generate Docker Image :

docker build -t ibanfirst:latest .

Publish on heroku :
```
-- login heroku
    heroku login
-- connect container registry
    heroku container:login
-- create heroku app
    heroku create
-- push to container registry
    heroku container:push ibanfirst
-- release
    heroku container:release ibanfirst
-- open app
    heroku open
```
