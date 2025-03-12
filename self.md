## Launch postgresql
```bash
psql -U postgres
```

## List all Databases
```bash
\l
```

## Select a database
```bash
\c database_name
```

## List all tables of the selected database
```bash
\dt
```

## Truncate a table
```sql
TRUNCATE TABLE table_name CASCADE;
```

## IMPORTANT
Do not forget the **;** at the end of each SQL command.