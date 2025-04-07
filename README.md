# BestProfiles Frontend

BestProfiles Frontend est l’interface utilisateur de la plateforme **BestProfiles**, une solution intelligente de tri et de matching de profils candidats à destination des recruteurs. Le frontend permet d’interagir avec l’ensemble des microservices backend, offrant une expérience fluide pour tester, visualiser, filtrer et comparer les CVs via des interfaces ergonomiques.

> Basé sur Angular, ce frontend permet :
>
> - L'import et l'analyse de CVs au format PDF
> - Le tri et scoring de profils sur des critères multiples (formations, expériences, compétences…)
> - Le matching intelligent entre profils et description de poste
> - L'utilisation d’un Chatbot IA basé sur un LLM pour répondre aux questions RH
> - La visualisation des performances de traitement via un dashboard (benchmark)

---

## Fonctionnalités principales

- **Module Collection** : Envoi et visualisation des CVs uploadés. Ajouter une nouvelle collection de CVs (Exemple : Collection **Serveur** où vous mettez tous les CVs des serveurs que vous disposez en y ajoutant une description et ajouter les CVs) avec la possibilité d'en rajouter d'autres, de les modifier ou d'en supprimer.
- **Module Tri** : Classement automatique de profils à partir de scores pondérés.
   - Chargez les CVs à trier via `📄 Choisir des fichiers à trier`.
   - Puis, cliquez sur `Charger` pour faire le tri et attender quelques secondes voire quelques minutes en fonction du nombre de CVs choisis (Référez-vous sur l'onglet `Benchmark` pour avoir une idée du délai d'attente.).
   - Recevez le tri de vos CVs avec la possibilité de cliquer sur chaque section pour voir les détails qui ont conduit à ce résultat.
   - Faites un tri decroissant si besoin en cliquant sur `Trier`.
- **Module Matching** : Saisie d’une description de poste et matching automatique avec les CVs.
   - Chargez les CVs à trier via `📄 Choisir des fichiers à trier`.
   - Entrez la description du poste dont vous chercher un profil correspondant.
   - Puis, cliquez sur `Matcher` pour faire le matching et attendez quelques secondes voire quelques minutes en fonction du nombre de CVs choisis.
   - Recevez les résultats du matching de vos CVs avec la possibilité de cliquer sur chaque section pour voir les détails qui ont conduit à ce résultat.
   - Faites un tri decroissant si besoin en cliquant sur `Trier`.
- **Chatbot IA** : Interagir avec un agent conversationnel pour répondre à des requêtes sur les profils.
   - Soit, configurez la base de données vectorielle
   - Ajoutez de nouveaux CVs sur lesquels vous souhaiteriez avoir des informations spécifiques
   - Puis, échangez avec notre assitant intelligent et obtenez vos réponses
   - Soit, posez des questions en rapport avec le contenu d'un CV sur les deux profils suivants : `Clara` et `Linh Dao` qui sont déjà dans la BDD vectorielle.
- **Benchmark** : Visualisation graphique des performances de **5 à 1 000 CVs**:
   - Temps de traitement : Temps d'attente, délai qu'il faut afin de recevoir les résultats de `Tri`ou de `Matching`.
   - Gain de temps : Correspond à la durée que les recruteurs ou vous même, vous gagneriez en utilisant notre solution au lieu de faire une présélection manuelle. D'après les [études](https://www.studyrama.com/emploi/premier-emploi/rediger-cv-lettre-de-motivation/cv-attentes-recruteurs), il faut au moins 3minutes à la lecture d'un CV. Nous avons pris en moyenne 90 secondes par CVs afin de calculer le temps nécessaire pour un nombre de CVs et faire la différence entre le temps d'exécution.
- **Connexion** : Interface de gestion utilisateur sécurisée.

## Prérequis

Pour exécuter ce projet localement, assurez-vous d'avoir :

- **Node.js** (version 16 ou ultérieure)
- **npm** (version 7 ou ultérieure) ou **yarn**
- Backend **BestProfiles** configuré (voir [backend repo](https://github.com/dioprawane/best_profils_back.git)), a lancé via `Docker`pour interagir direcetement avec le front et tester les fonctionnalités.

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/dioprawane/best_profiles_frontend.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd best_profiles_frontend
   ```

3. Installez les dépendances :

   ```bash
   npm install
   ```
   ou avec **yarn** :

   ```bash
   yarn install
   ```

## Utilisation

1. Lancez le serveur de développement :

   ```bash
   ng serve
   ```

   ```bash
   npm start
   ```
   ou avec **yarn** :

   ```bash
   yarn start
   ```

2. Ouvrez votre navigateur et accédez à : [http://localhost:3000](http://localhost:3000)

## Scripts disponibles

- `npm start` : Lance le serveur de développement.
- `npm run build` : Génère une version optimisée pour la production.
- `npm test` : Lance les tests unitaires.

---

## Liens utiles

- **Backend du projet** : [BestProfiles Backend](https://github.com/dioprawane/best_profils_back.git)
- **Documentation officielle** : [BestProfiles Wiki](#)

---
## Auteurs & Contacts

Projet réalisé dans le cadre du Master 2 Intelligence Artificielle Appliquée.

### Équipe BestProfiles

- **Serigne Rawane Diop** – Chef de projet, ingénieur IA & backend  
  serigne-rawane.diop@etu.univ-cotedazur.fr    

- **Théo Borreani** – Développeur Full Stack, IHM et IA  
  theo.borreani@etu.univ-cotedazur.fr  

- **Tuan Linh Dao** – Ingénieur en intelligence artificielle & data science  
  tuan-linh.dao@etu.univ-cotedazur.fr  

---

Merci !

Pour toute collaboration, suggestion ou problème technique, n’hésitez pas à nous contacter !

Équipez votre processus de recrutement avec **BestProfiles** !