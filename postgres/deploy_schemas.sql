-- Deploy New Database Tables
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'

-- Seed Data
\i '/docker-entrypoint-initdb.d/seed/seed.sql'