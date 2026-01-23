pg_dump \
  --schema-only \
  --no-owner \
  --no-privileges \
  --quote-all-identifiers \
  --dbname "postgresql://postgres:postgres@localhost:54322/postgres" \
  > supabase_schema.sql
