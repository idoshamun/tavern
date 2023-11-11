create table if not exists classes (
    id text primary key not null references entities(id) on delete cascade,
    hit_die smallint not null,
    proficiencies text [] not null default '{}',
    saving_throws text [] not null default '{}',
    spellcasting_ability text null,
    subclasses text [] not null default '{}'
);

alter table
    classes enable row level security;

create policy "allow public access" on classes for
select
    using (true);


create table if not exists subclasses (
    id text primary key not null references entities(id) on delete cascade,
    class text not null references classes(id) on delete cascade,
    subclass_flavor text not null
);
create index subclasses_class on subclasses (class);

alter table
    subclasses enable row level security;

create policy "allow public access" on subclasses for
select
    using (true);


create table if not exists features (
    id text primary key not null references entities(id) on delete cascade,
    class text not null references classes(id) on delete cascade,
    subclass text null references subclasses(id) on delete cascade,
    feature_specific jsonb null,
    level smallint not null,
    parent text null references features(id) on delete cascade,
    prerequisites jsonb null
);
create index features_class on features (class);
create index features_subclass on features (subclass);

alter table
    features enable row level security;

create policy "allow public access" on features for
select
    using (true);


create table if not exists subclass_spells (
    spell text not null references spells(id) on delete cascade,
    subclass text not null references subclasses(id) on delete cascade,
    level smallint not null,
    feature text null references features(id) on delete cascade,
    id text primary key generated always as (spell || '-' || subclass || '-' || level::text || '-' || coalesce(feature, '')) stored
);
create index subclass_spells_subclass on subclass_spells (subclass);
create index subclass_spells_subclass_level on subclass_spells (subclass, level);

alter table
    subclass_spells enable row level security;

create policy "allow public access" on subclass_spells for
select
    using (true);


create table if not exists levels (
    id text primary key not null,
    level smallint not null,
    class text not null references classes(id) on delete cascade,
    subclass text references subclasses(id) on delete cascade,
    ability_score_bonuses smallint null,
    prof_bonus smallint null,
    class_specific jsonb null,
    subclass_specific jsonb null,
    spells_known smallint null,
    cantrips_known smallint null,
    slot_level_1 smallint null,
    slot_level_2 smallint null,
    slot_level_3 smallint null,
    slot_level_4 smallint null,
    slot_level_5 smallint null,
    slot_level_6 smallint null,
    slot_level_7 smallint null,
    slot_level_8 smallint null,
    slot_level_9 smallint null
);
create index levels_level_class_subclass on levels (level, class, subclass);

alter table
    levels enable row level security;

create policy "allow public access" on levels for
select
    using (true);


create table if not exists levels_features (
    level text not null references levels(id) on delete cascade,
    feature text not null references features(id) on delete cascade,
    primary key (level, feature)
);
create index levels_features_level on levels_features (level);

alter table
    levels_features enable row level security;

create policy "allow public access" on levels_features for
select
    using (true);
