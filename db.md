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

## Debug a non-applied update
It looks like **your Prisma client is not connecting to the correct database inside your Docker container**, or it is using an outdated migration history. Here’s how to troubleshoot and fix the issue.

---

### **1️⃣ Check Your `.env` File**
Make sure your `DATABASE_URL` inside **your Prisma `.env` file** is pointing to your **Dockerized PostgreSQL** database:

```ini
DATABASE_URL=postgresql://POSTGRES_USER:POSTGRES_PASSWORD@localhost:5432/POSTGRES_DB_NAME?schema=public
```
- Replace `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB_NAME` with the actual values you set in your `docker-compose.yml`.

---

### **2️⃣ Verify the Database Connection**
Manually check if Prisma is connecting to the right database **inside Docker**:

1. **Run your container** if it’s not running:
   ```sh
   docker-compose up -d
   ```

2. **Enter the PostgreSQL container**:
   ```sh
   docker exec -it postgres_db psql -U $POSTGRES_USER -d $POSTGRES_DB_NAME
   ```

3. **Check the tables inside PostgreSQL**:
   ```sql
   \dt
   ```
   If your tables exist but Prisma doesn’t recognize them, Prisma might be using a different database or schema.

---

### **3️⃣ Reset Prisma Migrations**
If Prisma is out of sync, you may need to **reset migrations** and apply them again:

```sh
npx prisma migrate reset
```
🚨 **WARNING:** This will **delete** all existing data in the database.

If you want to keep your data, try:

```sh
npx prisma db push
```
This will **sync Prisma schema** without erasing data.

---

### **4️⃣ Restart Docker & Prisma**
If Prisma Studio is still not reflecting changes, try restarting everything:

```sh
docker-compose down -v  # Stop and remove volumes
docker-compose up -d    # Restart containers
npx prisma generate     # Regenerate Prisma client
npx prisma migrate dev  # Apply migrations
npx prisma studio       # Open Prisma Studio again
```

---

### **5️⃣ Debug Prisma Studio Connection**
If Prisma Studio still doesn’t show changes:
```sh
npx prisma studio --schema=prisma/schema.prisma
```
- This forces Prisma Studio to use your **latest schema**.

---

### **Conclusion**
🔹 **If the database inside Docker shows changes but Prisma doesn’t**, the issue is likely **a connection mismatch or outdated migrations**.  
✅ **Try resetting migrations and making sure Prisma is using the correct database.**  
