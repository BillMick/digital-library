## digital-library
Digital library project for academic institution repository. 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Installer **PostgreSQL** avec ou non un GUI (PgAdmin, par exemple).

2. Créer la base de données avec le nom: **digital_library**
> La version dockerizée est disponible sur la branche **db/dockerization**.

3. pour installer les dépendances de l'application, exécuter:
```bash
npm install
```
2. Si le fichier **.env** n'est pas présent dans votre architecture de fichiers:
```bash
touch .env
```
3. Vérifier que DATABASE_URL est bien configuré dans le **.env**. Exemple:
```bash
DATABASE_URL="DATABASE_URL = postgresql://postgres:password@localhost:5432/digital_library
"
```

4. Migrer la base de données
```bash
npx prisma migrate dev --name un_nom_de_migration
```
5. You may need to create the folder **./public/uploads**

6. Run the API by executing
```bash
node app.js
# or
npx nodemon app.js
```
The API should be launched on the port **git **.

# For RAG agent
## Requirements
You will need:
- to install python3.10
- to install required packages by running (assuming you are at the root):
```bash
python3.10 -m pip install -r resources/requirements.txt
```