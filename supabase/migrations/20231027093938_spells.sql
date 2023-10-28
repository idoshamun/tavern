create table if not exists entities (
    id text primary key not null,
    type text not null,
    name text not null,
    description text not null,
    fts tsvector generated always as (to_tsvector('english', name)) stored
);

create index entities_type_name on entities (type, name);

alter table
    entities enable row level security;

create policy "allow public access" on entities for
select
    using (true);

create table if not exists spells (
    id text primary key not null references entities(id) on delete cascade,
    higher_level text [] not null default '{}',
    range text not null,
    components text [] not null default '{}',
    material text null,
    is_ritual boolean not null,
    duration text not null,
    is_concentration boolean not null,
    casting_time text not null,
    level integer not null,
    attack_type text null,
    damage_type text null,
    damage_at_slot_level jsonb null,
    damage_at_character_level jsonb null,
    school text not null,
    dc_type text null,
    dc_success text null,
    dc_description text null,
    heal_at_slot_level jsonb null,
    aoe_type text null,
    aoe_size integer null,
    classes text [] not null default '{}',
    subclasses text [] not null default '{}'
);
create index spells_level on spells (level);
create index spells_classes on spells using gin(classes);
create index spells_subclasses on spells using gin(subclasses);

alter table
    spells enable row level security;

create policy "allow public access" on spells for
select
    using (true);