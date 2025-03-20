## digital-library dockerized db
Digital library project for academic institution repository. 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Etape 1 : Installation of docker engine
Navigate to [https://docs.docker.com/engine/install](https://docs.docker.com/engine/install).\
On the left side menu, choose the corresponding OS. Then follow the instructions.

### Etape 2 : Installation of docker-compose
Follow the instructions on : [https://docs.docker.com/compose/install/standalone/](https://docs.docker.com/compose/install/standalone/).

### Etape 3: Extension docker in your IDE (optional)
If you use **VSCode** as IDE, we advise to install the extension **Docker** certified **Microsoft**.

### Etape 4: Your .env
In the **.env**, add the following variables:
```bash
POSTGRES_USER = username
POSTGRES_PASSWORD = password
POSTGRES_DB_NAME = db_name
```

### Etape 5: Start PostgreSQL with Docker
```bash
docker-compose up -d
```

### Step 6: Connect to PostgreSQL
- Using **psql** CLI (optional):\
*PS: Your may need to update some values.*
```bash
docker exec -it postgres_db psql -U username -d db_name
```

- Using **Prisma**\
Update your **.env** file:
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/db_name
```
- Then, run:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Step 5: Restart or Stop PostgreSQL
- Restart:
```bash
docker-compose restart
```
- Stop:
```bash
docker-compose down
```
