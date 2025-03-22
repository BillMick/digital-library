# Digital Library

Projet de bibliothèque numérique pour le dépôt de documents d'une institution académique.

Ce projet utilise [Next.js](https://nextjs.org) et a été initialisé avec [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Démarrage

Pour exécuter le serveur de développement, utilisez l'une des commandes suivantes :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Puis ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

## 📂 API

Les différentes API sont disponibles sous `src/app/api/`.

### 🔹 Exemples de requêtes API

Avant de tester, assurez-vous d'avoir créé un utilisateur et un fichier dans la base de données via Prisma Studio.

#### 📌 Notation d'un fichier
**Endpoint:** `POST http://localhost:3000/api/ratings`

**Requête JSON :**
```json
{
    "userId": "123456789",
    "fileId": "file123",
    "note": 4,
    "commentaire": "Très bon document"
}
```

**Résultat :**
```json
{
    "id": "4c74c71e-f834-4470-9d57-c06b50ff7f32",
    "note": 4,
    "commentaire": "Très bon document",
    "dateEvaluation": "2025-03-12T13:19:41.579Z",
    "userId": "123456789",
    "fileId": "file123"
}
```

#### 📌 Commentaire sur un fichier
**Endpoint:** `POST http://localhost:3000/api/comments`

**Requête JSON :**
```json
{
    "userId": "123456789",
    "fileId": "file123",
    "content": "Ce document est très clair"
}
```

**Résultat :**
```json
{
    "id": "1da520d2-f15d-44c0-9fb8-f3898b367498",
    "content": "Ce document est très clair",
    "date": "2025-03-12T13:38:05.388Z",
    "userId": "123456789",
    "fileId": "file123"
}
```

#### 📌 Foire aux questions (FAQ)
**Endpoint:** `POST http://localhost:3000/api/faq`

**Requête JSON :**
```json
{
    "userId": "123456789",
    "question": "Comment télécharger un fichier ?",
    "reponse": "Cliquez sur le bouton de téléchargement dans la page du fichier."
}
```

**Résultat :**
```json
{
    "id": "864dea0a-875f-4620-a466-8dc6ddcfacfe",
    "question": "Comment télécharger un fichier ?",
    "reponse": "Cliquez sur le bouton de téléchargement dans la page du fichier.",
    "dateCreation": "2025-03-12T13:43:38.787Z",
    "userId": "123456789"
}
```

## 🎨 Frontend

### Structure du projet
```
/frontend
  ├── /src
  │    ├── /components          // Composants réutilisables
  │    ├── /hooks               // Hooks personnalisés pour API
  │    │    └── useApi.js       // Hook pour gérer les appels API
  │    ├── /pages               // Pages de l'application
  │    │    ├── accueil.jsx     // Page d'accueil de l'utilisateur (en cours de développement)
  │    │    ├── index.jsx       // Page principale
  │    └── /style
  │         ├── Dashboard.module.css  // Styles du tableau de bord
  │         ├── Home.module.css       // Styles de la page principale
  ├── package.json
  └── .env
```

### Prérequis avant de lancer le frontend
Avant de démarrer le frontend, assurez-vous d'avoir les images nécessaires dans le dossier `public/` du projet.

Installez les dépendances suivantes :
```bash
npm install slick-carousel
npm install react-icons
```

## 📜 Licence
Ce projet est sous licence MIT.

---

🚀 Bon développement !

