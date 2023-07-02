CREATE DATABASE auto_completion_db
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS public.search_history
(
    search_value character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT search_history_pkey PRIMARY KEY (search_value)
)    