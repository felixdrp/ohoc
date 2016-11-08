
# Table template

CREATE TABLE public.templates
(
  type character varying(256) NOT NULL,
  subtype character varying(256) NOT NULL,
  structure jsonb,
  CONSTRAINT templates_pkey PRIMARY KEY (type, subtype)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.templates
  OWNER TO admin;

# Table Data

CREATE SEQUENCE data_id_seq;
CREATE TABLE public.data
(
  id integer NOT NULL DEFAULT nextval('data_id_seq'::regclass),
  type character varying(256) NOT NULL,
  subtype character varying(256) NOT NULL,
  data jsonb,
  CONSTRAINT data_pkey PRIMARY KEY (id)
);

ALTER TABLE public.data
  OWNER TO admin;

# Write tables

insert into
  public.templates
values
  (
    'mlk1',
    'submlk',
    '{"hello": ["mlk", "supermlk"]}'::jsonb
  ),
  (
    'books',
    'science fiction',
    '{"hello": ["mlk", "supermlk"]}'::jsonb
  ),
  (
    'inteviews',
    'economics',
    '{"hello": ["mlk", "supermlk"]}'::jsonb
  )



insert into public.data (type, subtype, data) values ('mlk','submlk','{"hello": ["mlk", "supermlk"]}')

# Read tables

select * from public.templates where type='mlk';

select * from public.data where type='mlk';

[9.15. JSON Functions and Operators](https://www.postgresql.org/docs/9.5/static/functions-json.html)

select * from templates where structure #>> '{hello,0}' = 'mlk';
select * from templates where structure->'hello' ?| array['supermlk','mlk']
