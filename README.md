## digital-library
Digital library project for academic institution repository. 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Installer **PostgreSQL** avec ou non un GUI (PgAdmin, par exemple).

2. Créer la base de données avec le nom: **digital_library**

1. pour installer les dépendances de l'application, exécuter:
```bash
npm install
```
2. Si le fichier **.env** n'est pas présent dans votre architecture de fichiers:
```bash
touch .env
```
3. Vérifier que DATABASE_URL est bien configuré dans le **.env**. Exemple:
```bash
DATABASE_URL="postgresql://postgres@localhost:5432/digital_library?schema=public"
```
> Pour ce qui est de l'architecture frontend et backend:
> le backend sera écrit dans le dossier __/src/pages/api__.
> le frondend, dans __/src/pages/__.

4. Migrer la base de données
```bash
npx prisma migrate dev --name un_nom_de_migration
```

<!-- 4. pour générer la configuration prisma exécuter la commande :
```bash
yarn db:generate
```

5. pour exécuter les fichiers de migration prisma dans une bdd sqlite, exécuter la commande:
```bash
yarn db:migrate
```


7. lancer le projet avec la commande : 
```bash
yarn serve
``` -->

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
