export interface The5ESRDAbilityScores {
	index: string;
	name: string;
	full_name: string;
	desc: string[];
	skills: The5ESRDWeaponProperties[];
	url: string;
}

export interface The5ESRDConditionPrerequisite {
	ability_score: The5ESRDWeaponProperties;
	minimum_score: number;
}

export interface The5ESRDWeaponProperties {
	name: string;
	index: string;
	url: string;
	desc?: string[] | string;
	equipment?: The5ESRDWeaponProperties[];
	prerequisites?: The5ESRDConditionPrerequisite[];
	subsections?: The5ESRDWeaponProperties[];
	ability_score?: The5ESRDWeaponProperties;
	type?: The5ESRDConditionType;
}

export enum The5ESRDConditionType {
	Feature = 'feature',
	Level = 'level',
	Spell = 'spell'
}

export interface The5ESRDAlignments {
	index: string;
	name: string;
	abbreviation: string;
	desc: string;
	url: string;
}

export interface The5ESRDBackgrounds {
	index: string;
	name: string;
	starting_proficiencies: The5ESRDWeaponProperties[];
	language_options: The5ESRDBackgroundLanguageOptions;
	starting_equipment: StartingEquipment[];
	starting_equipment_options: ChoiceElement[];
	feature: Feature;
	personality_traits: Bonds;
	ideals: Ideals;
	bonds: Bonds;
	flaws: Bonds;
	url: string;
}

export interface Bonds {
	choose: number;
	type: string;
	from: BondsFrom;
}

export interface BondsFrom {
	option_set_type: OptionSetType;
	options: PurpleOption[];
}

export enum OptionSetType {
	EquipmentCategory = 'equipment_category',
	OptionsArray = 'options_array'
}

export interface PurpleOption {
	option_type: PurpleOptionType;
	string: string;
}

export enum PurpleOptionType {
	String = 'string'
}

export interface Feature {
	name: string;
	desc: string[];
}

export interface Ideals {
	choose: number;
	type: string;
	from: IdealsFrom;
}

export interface IdealsFrom {
	option_set_type: OptionSetType;
	options: FluffyOption[];
}

export interface FluffyOption {
	option_type: string;
	desc: string;
	alignments: The5ESRDWeaponProperties[];
}

export interface The5ESRDBackgroundLanguageOptions {
	choose: number;
	type: string;
	from: PurpleFrom;
}

export interface PurpleFrom {
	option_set_type: string;
	resource_list_url: string;
}

export interface StartingEquipment {
	equipment: The5ESRDWeaponProperties;
	quantity: number;
}

export interface ChoiceElement {
	choose: number;
	type: StartingEquipmentOptionType;
	from: FluffyFrom;
	desc?: string;
}

export interface FluffyFrom {
	option_set_type: OptionSetType;
	equipment_category: The5ESRDWeaponProperties;
}

export enum StartingEquipmentOptionType {
	Equipment = 'equipment'
}

export interface The5ESRDClasses {
	index: string;
	name: string;
	hit_die: number;
	proficiency_choices: ProficiencyChoice[];
	proficiencies: The5ESRDWeaponProperties[];
	saving_throws: The5ESRDWeaponProperties[];
	starting_equipment: StartingEquipment[];
	starting_equipment_options: The5ESRDClassStartingEquipmentOption[];
	class_levels: string;
	multi_classing: MultiClassing;
	subclasses: The5ESRDWeaponProperties[];
	url: string;
	spellcasting?: The5ESRDClassSpellcasting;
	spells?: string;
}

export interface MultiClassing {
	prerequisites?: The5ESRDConditionPrerequisite[];
	proficiencies: The5ESRDWeaponProperties[];
	proficiency_choices?: LanguageOptionsElement[];
	prerequisite_options?: PrerequisiteOptions;
}

export interface PrerequisiteOptions {
	type: string;
	choose: number;
	from: PrerequisiteOptionsFrom;
}

export interface PrerequisiteOptionsFrom {
	option_set_type: OptionSetType;
	options: TentacledOption[];
}

export interface TentacledOption {
	option_type: string;
	ability_score: The5ESRDWeaponProperties;
	minimum_score: number;
}

export interface LanguageOptionsElement {
	desc?: string;
	choose: number;
	type: string;
	from: StartingProficiencyOptionsFrom;
}

export interface StartingProficiencyOptionsFrom {
	option_set_type: OptionSetType;
	options: StickyOption[];
}

export interface StickyOption {
	option_type: FluffyOptionType;
	item: The5ESRDWeaponProperties;
}

export enum FluffyOptionType {
	Choice = 'choice',
	Multiple = 'multiple',
	Reference = 'reference'
}

export interface ProficiencyChoice {
	desc: string;
	choose: number;
	type: ProficiencyChoiceType;
	from: TentacledFrom;
}

export interface TentacledFrom {
	option_set_type: OptionSetType;
	options: IndigoOption[];
}

export interface IndigoOption {
	option_type: FluffyOptionType;
	item?: The5ESRDWeaponProperties;
	choice?: LanguageOptionsElement;
}

export enum ProficiencyChoiceType {
	Proficiencies = 'proficiencies'
}

export interface The5ESRDClassSpellcasting {
	level: number;
	spellcasting_ability: The5ESRDWeaponProperties;
	info: Feature[];
}

export interface The5ESRDClassStartingEquipmentOption {
	desc: string;
	choose: number;
	type: StartingEquipmentOptionType;
	from: StickyFrom;
}

export interface StickyFrom {
	option_set_type: OptionSetType;
	options?: IndecentOption[];
	equipment_category?: The5ESRDWeaponProperties;
}

export interface IndecentOption {
	option_type: TentacledOptionType;
	count?: number;
	of?: The5ESRDWeaponProperties;
	choice?: ChoiceElement;
	prerequisites?: OptionPrerequisite[];
	items?: Item[];
}

export interface Item {
	option_type: TentacledOptionType;
	count?: number;
	of?: The5ESRDWeaponProperties;
	choice?: ChoiceElement;
}

export enum TentacledOptionType {
	Choice = 'choice',
	CountedReference = 'counted_reference',
	Multiple = 'multiple'
}

export interface OptionPrerequisite {
	type: string;
	proficiency: The5ESRDWeaponProperties;
}

export interface The5ESRDEquipment {
	index: string;
	name: string;
	equipment_category: The5ESRDWeaponProperties;
	weapon_category?: WeaponCategory;
	weapon_range?: WeaponRange;
	category_range?: CategoryRange;
	cost: Cost;
	damage?: TwoHandedDamageElement;
	range?: RangeClass;
	weight?: number;
	properties?: The5ESRDWeaponProperties[];
	url: string;
	throw_range?: RangeClass;
	two_handed_damage?: TwoHandedDamageElement;
	special?: string[];
	armor_category?: string;
	armor_class?: The5ESRDEquipmentArmorClass;
	str_minimum?: number;
	stealth_disadvantage?: boolean;
	gear_category?: The5ESRDWeaponProperties;
	desc?: string[];
	quantity?: number;
	contents?: Content[];
	tool_category?: ToolCategory;
	vehicle_category?: VehicleCategory;
	speed?: Cost;
	capacity?: string;
}

export interface The5ESRDEquipmentArmorClass {
	base: number;
	dex_bonus: boolean;
	max_bonus?: number;
}

export enum CategoryRange {
	MartialMelee = 'Martial Melee',
	MartialRanged = 'Martial Ranged',
	SimpleMelee = 'Simple Melee',
	SimpleRanged = 'Simple Ranged'
}

export interface Content {
	item: The5ESRDWeaponProperties;
	quantity: number;
}

export interface Cost {
	quantity: number;
	unit: Unit;
}

export enum Unit {
	Cp = 'cp',
	FtRound = 'ft/round',
	Gp = 'gp',
	Mph = 'mph',
	SP = 'sp'
}

export interface TwoHandedDamageElement {
	damage_dice: string;
	damage_type: The5ESRDWeaponProperties;
}

export interface RangeClass {
	normal: number;
	long?: number;
}

export enum ToolCategory {
	ArtisanSTools = "Artisan's Tools",
	GamingSets = 'Gaming Sets',
	MusicalInstrument = 'Musical Instrument',
	OtherTools = 'Other Tools'
}

export enum VehicleCategory {
	MountsAndOtherAnimals = 'Mounts and Other Animals',
	TackHarnessAndDrawnVehicles = 'Tack, Harness, and Drawn Vehicles',
	WaterborneVehicles = 'Waterborne Vehicles'
}

export enum WeaponCategory {
	Martial = 'Martial',
	Simple = 'Simple'
}

export enum WeaponRange {
	Melee = 'Melee',
	Ranged = 'Ranged'
}

export interface The5ESRDFeatures {
	index: string;
	class: The5ESRDWeaponProperties;
	name: string;
	level: number;
	prerequisites: The5ESRDFeaturePrerequisite[];
	desc: string[];
	url: string;
	subclass?: The5ESRDWeaponProperties;
	reference?: string;
	feature_specific?: FeatureSpecific;
	parent?: The5ESRDWeaponProperties;
}

export interface FeatureSpecific {
	expertise_options?: ExpertiseOptions;
	subfeature_options?: LanguageOptionsElement;
	invocations?: The5ESRDWeaponProperties[];
}

export interface ExpertiseOptions {
	choose: number;
	type: string;
	from: ExpertiseOptionsFrom;
}

export interface ExpertiseOptionsFrom {
	option_set_type: OptionSetType;
	options: HilariousOption[];
}

export interface HilariousOption {
	option_type: FluffyOptionType;
	item?: The5ESRDWeaponProperties;
	choice?: LanguageOptionsElement;
	items?: HilariousOption[];
}

export interface The5ESRDFeaturePrerequisite {
	type: The5ESRDConditionType;
	spell?: string;
	feature?: string;
	level?: number;
}

export interface The5ESRDLanguages {
	index: string;
	name: string;
	type: The5ESRDLanguageType;
	typical_speakers: string[];
	script?: string;
	url: string;
	desc?: string;
}

export enum The5ESRDLanguageType {
	Exotic = 'Exotic',
	Standard = 'Standard'
}

export interface The5ESRDLevels {
	level: number;
	ability_score_bonuses?: number;
	prof_bonus?: number;
	features: The5ESRDWeaponProperties[];
	class_specific?: ClassSpecific;
	index: string;
	class: The5ESRDWeaponProperties;
	url: string;
	spellcasting?: { [key: string]: number };
	subclass?: The5ESRDWeaponProperties;
	subclass_specific?: SubclassSpecific;
}

export interface ClassSpecific {
	rage_count?: number;
	rage_damage_bonus?: number;
	brutal_critical_dice?: number;
	bardic_inspiration_die?: number;
	song_of_rest_die?: number;
	magical_secrets_max_5?: number;
	magical_secrets_max_7?: number;
	magical_secrets_max_9?: number;
	channel_divinity_charges?: number;
	destroy_undead_cr?: number;
	wild_shape_max_cr?: number;
	wild_shape_swim?: boolean;
	wild_shape_fly?: boolean;
	action_surges?: number;
	indomitable_uses?: number;
	extra_attacks?: number;
	martial_arts?: MartialArts;
	ki_points?: number;
	unarmored_movement?: number;
	aura_range?: number;
	favored_enemies?: number;
	favored_terrain?: number;
	sneak_attack?: MartialArts;
	sorcery_points?: number;
	metamagic_known?: number;
	creating_spell_slots?: CreatingSpellSlot[];
	invocations_known?: number;
	mystic_arcanum_level_6?: number;
	mystic_arcanum_level_7?: number;
	mystic_arcanum_level_8?: number;
	mystic_arcanum_level_9?: number;
	arcane_recovery_levels?: number;
}

export interface CreatingSpellSlot {
	spell_slot_level: number;
	sorcery_point_cost: number;
}

export interface MartialArts {
	dice_count: number;
	dice_value: number;
}

export interface SubclassSpecific {
	additional_magical_secrets_max_lvl?: number;
	aura_range?: number;
}

export interface The5ESRDMagicItems {
	index: string;
	name: string;
	equipment_category: The5ESRDWeaponProperties;
	rarity: Rarity;
	variants: The5ESRDWeaponProperties[];
	variant: boolean;
	desc: string[];
	url: string;
}

export interface Rarity {
	name: RarityName;
}

export enum RarityName {
	Artifact = 'Artifact',
	Common = 'Common',
	Legendary = 'Legendary',
	Rare = 'Rare',
	Uncommon = 'Uncommon',
	Varies = 'Varies',
	VeryRare = 'Very Rare'
}

export interface The5ESRDMonsters {
	index: string;
	name: string;
	size: Size;
	type: The5ESRDMonsterType;
	alignment: Alignment;
	armor_class: ArmorClassElement[];
	hit_points: number;
	hit_dice: string;
	hit_points_roll: string;
	speed: Speed;
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	proficiencies: Proficiency[];
	damage_vulnerabilities: string[];
	damage_resistances: string[];
	damage_immunities: string[];
	condition_immunities: The5ESRDWeaponProperties[];
	senses: Senses;
	languages: string;
	challenge_rating: number;
	proficiency_bonus: number;
	xp: number;
	special_abilities?: SpecialAbility[];
	actions?: The5ESRDMonsterAction[];
	legendary_actions?: LegendaryAction[];
	image?: string;
	url: string;
	desc?: string;
	subtype?: string;
	reactions?: Reaction[];
	forms?: The5ESRDWeaponProperties[];
}

export interface The5ESRDMonsterAction {
	name: string;
	multiattack_type?: MultiattackType;
	desc: string;
	actions?: ActionAction[];
	attack_bonus?: number;
	dc?: AttackDc;
	damage?: ActionDamage[];
	usage?: ActionUsage;
	options?: Options;
	attacks?: Attack[];
	action_options?: ActionOptions;
}

export interface ActionOptions {
	choose: number;
	type: ItemOptionType;
	from: ActionOptionsFrom;
}

export interface ActionOptionsFrom {
	option_set_type: OptionSetType;
	options: AmbitiousOption[];
}

export interface AmbitiousOption {
	option_type: ItemOptionType;
	items?: AmbitiousOption[];
	action_name?: string;
	count?: number;
	type?: AttackTypeEnum;
	desc?: string;
}

export enum ItemOptionType {
	Action = 'action',
	Multiple = 'multiple'
}

export enum AttackTypeEnum {
	Ability = 'ability',
	Magic = 'magic',
	Melee = 'melee',
	Ranged = 'ranged'
}

export interface ActionAction {
	action_name: string;
	count: number | string;
	type: AttackTypeEnum;
}

export interface Attack {
	name: string;
	dc: AttackDc;
	damage?: TwoHandedDamageElement[];
	option_type?: AttackOptionType;
}

export interface AttackDc {
	dc_type: The5ESRDWeaponProperties;
	dc_value: number;
	success_type: DcSuccess;
}

export enum DcSuccess {
	Half = 'half',
	None = 'none',
	Other = 'other'
}

export enum AttackOptionType {
	Breath = 'breath'
}

export interface ActionDamage {
	damage_type?: The5ESRDWeaponProperties;
	damage_dice?: string;
	dc?: AttackDc;
	choose?: number;
	type?: DamageType;
	from?: DamageFrom;
}

export interface DamageFrom {
	option_set_type: OptionSetType;
	options: CunningOption[];
}

export interface CunningOption {
	option_type: DamageType;
	damage_type: The5ESRDWeaponProperties;
	damage_dice: string;
	notes?: Notes;
}

export enum Notes {
	OneHanded = 'One handed',
	TwoHanded = 'Two handed',
	WithShillelagh = 'With shillelagh'
}

export enum DamageType {
	Damage = 'damage'
}

export enum MultiattackType {
	ActionOptions = 'action_options',
	Actions = 'actions'
}

export interface Options {
	choose: number;
	type: OptionsType;
	from: OptionsFrom;
}

export interface OptionsFrom {
	option_set_type: OptionSetType;
	options: Attack[];
}

export enum OptionsType {
	Attack = 'attack'
}

export interface ActionUsage {
	type: PurpleType;
	times?: number;
	dice?: Dice;
	min_value?: number;
	rest_types?: RESTType[];
}

export enum Dice {
	The1D6 = '1d6'
}

export enum RESTType {
	Long = 'long',
	Short = 'short'
}

export enum PurpleType {
	PerDay = 'per day',
	RechargeAfterREST = 'recharge after rest',
	RechargeOnRoll = 'recharge on roll'
}

export enum Alignment {
	AnyAlignment = 'any alignment',
	AnyChaoticAlignment = 'any chaotic alignment',
	AnyEvilAlignment = 'any evil alignment',
	AnyNonGoodAlignment = 'any non-good alignment',
	AnyNonLawfulAlignment = 'any non-lawful alignment',
	ChaoticEvil = 'chaotic evil',
	ChaoticGood = 'chaotic good',
	ChaoticNeutral = 'chaotic neutral',
	LawfulEvil = 'lawful evil',
	LawfulGood = 'lawful good',
	LawfulNeutral = 'lawful neutral',
	Neutral = 'neutral',
	NeutralEvil = 'neutral evil',
	NeutralGood = 'neutral good',
	NeutralGood50OrNeutralEvil50 = 'neutral good (50%) or neutral evil (50%)',
	Unaligned = 'unaligned'
}

export interface ArmorClassElement {
	type: ArmorClassType;
	value: number;
	condition?: The5ESRDWeaponProperties;
	spell?: The5ESRDWeaponProperties;
	armor?: The5ESRDWeaponProperties[];
	desc?: string;
}

export enum ArmorClassType {
	Armor = 'armor',
	Condition = 'condition',
	Dex = 'dex',
	Natural = 'natural',
	Spell = 'spell'
}

export interface LegendaryAction {
	name: string;
	desc: string;
	attack_bonus?: number;
	damage?: TwoHandedDamageElement[];
	dc?: AttackDc;
}

export interface Proficiency {
	value: number;
	proficiency: The5ESRDWeaponProperties;
}

export interface Reaction {
	name: string;
	desc: string;
	dc?: AttackDc;
}

export interface Senses {
	darkvision?: Blindsight;
	passive_perception: number;
	blindsight?: Blindsight;
	truesight?: Blindsight;
	tremorsense?: Blindsight;
}

export enum Blindsight {
	The10Ft = '10 ft.',
	The120Ft = '120 ft.',
	The30Ft = '30 ft.',
	The30FtBlindBeyondThisRadius = '30 ft. (blind beyond this radius)',
	The30FtOr10FtWhileDeafenedBlindBeyondThisRadius = '30 ft. or 10 ft. while deafened (blind beyond this radius)',
	The60Ft = '60 ft.',
	The60FtBlindBeyondThisRadius = '60 ft. (blind beyond this radius)',
	The90Ft = '90 ft.'
}

export enum Size {
	Gargantuan = 'Gargantuan',
	Huge = 'Huge',
	Large = 'Large',
	Medium = 'Medium',
	Small = 'Small',
	Tiny = 'Tiny'
}

export interface SpecialAbility {
	name: string;
	desc: string;
	dc?: AttackDc;
	spellcasting?: SpecialAbilitySpellcasting;
	usage?: SpecialAbilityUsage;
	damage?: TwoHandedDamageElement[];
	attack_bonus?: number;
}

export interface SpecialAbilitySpellcasting {
	level?: number;
	ability: The5ESRDWeaponProperties;
	dc?: number;
	modifier?: number;
	components_required: Component[];
	school?: School;
	slots?: { [key: string]: number };
	spells: SpellcastingSpell[];
}

export enum Component {
	M = 'M',
	S = 'S',
	V = 'V'
}

export enum School {
	Cleric = 'cleric',
	Druid = 'druid',
	Wizard = 'wizard'
}

export interface SpellcastingSpell {
	name: string;
	level: number;
	url: string;
	usage?: SpellUsage;
	notes?: string;
}

export interface SpellUsage {
	type: FluffyType;
	times?: number;
}

export enum FluffyType {
	AtWill = 'at will',
	PerDay = 'per day',
	PerREST = 'per rest'
}

export interface SpecialAbilityUsage {
	type: PurpleType;
	times?: number;
	rest_types?: RESTType[];
}

export interface Speed {
	walk?: Burrow;
	swim?: Climb;
	fly?: Climb;
	burrow?: Burrow;
	climb?: Climb;
	hover?: boolean;
}

export enum Burrow {
	The0Ft = '0 ft.',
	The10Ft = '10 ft.',
	The15Ft = '15 ft.',
	The20Ft = '20 ft.',
	The25Ft = '25 ft.',
	The30Ft = '30 ft.',
	The40Ft = '40 ft.',
	The50Ft = '50 ft.',
	The5Ft = '5 ft.',
	The60Ft = '60 ft.'
}

export enum Climb {
	The10Ft = '10 ft.',
	The120Ft = '120 ft.',
	The150Ft = '150 ft.',
	The20Ft = '20 ft.',
	The30Ft = '30 ft.',
	The40Ft = '40 ft.',
	The50Ft = '50 ft.',
	The60Ft = '60 ft.',
	The80Ft = '80 ft.',
	The90Ft = '90 ft.'
}

export enum The5ESRDMonsterType {
	Aberration = 'aberration',
	Beast = 'beast',
	Celestial = 'celestial',
	Construct = 'construct',
	Dragon = 'dragon',
	Elemental = 'elemental',
	Fey = 'fey',
	Fiend = 'fiend',
	Giant = 'giant',
	Humanoid = 'humanoid',
	Monstrosity = 'monstrosity',
	Ooze = 'ooze',
	Plant = 'plant',
	SwarmOfTinyBeasts = 'swarm of Tiny beasts',
	Undead = 'undead'
}

export interface The5ESRDProficiencies {
	index: string;
	type: The5ESRDProficiencyType;
	name: string;
	classes: The5ESRDWeaponProperties[];
	races: The5ESRDWeaponProperties[];
	url: string;
	reference: The5ESRDWeaponProperties;
}

export enum The5ESRDProficiencyType {
	Armor = 'Armor',
	ArtisanSTools = "Artisan's Tools",
	GamingSets = 'Gaming Sets',
	MusicalInstruments = 'Musical Instruments',
	Other = 'Other',
	SavingThrows = 'Saving Throws',
	Skills = 'Skills',
	Vehicles = 'Vehicles',
	Weapons = 'Weapons'
}

export interface The5ESRDRaces {
	index: string;
	name: string;
	speed: number;
	ability_bonuses: AbilityBonus[];
	alignment: string;
	age: string;
	size: Size;
	size_description: string;
	starting_proficiencies: The5ESRDWeaponProperties[];
	starting_proficiency_options?: LanguageOptionsElement;
	languages: The5ESRDWeaponProperties[];
	language_desc: string;
	traits: The5ESRDWeaponProperties[];
	subraces: The5ESRDWeaponProperties[];
	url: string;
	language_options?: LanguageOptionsElement;
	ability_bonus_options?: AbilityBonusOptions;
}

export interface AbilityBonusOptions {
	choose: number;
	type: string;
	from: AbilityBonusOptionsFrom;
}

export interface AbilityBonusOptionsFrom {
	option_set_type: OptionSetType;
	options: MagentaOption[];
}

export interface MagentaOption {
	option_type: string;
	ability_score: The5ESRDWeaponProperties;
	bonus: number;
}

export interface AbilityBonus {
	ability_score: The5ESRDWeaponProperties;
	bonus: number;
}

export interface The5ESRDSpells {
	index: string;
	name: string;
	desc: string[];
	higher_level?: string[];
	range: RangeEnum;
	components: Component[];
	material?: string;
	ritual: boolean;
	duration: string;
	concentration: boolean;
	casting_time: CastingTime;
	level: number;
	attack_type?: AttackTypeEnum;
	damage?: The5ESRDSpellDamage;
	school: The5ESRDWeaponProperties;
	classes: The5ESRDWeaponProperties[];
	subclasses: The5ESRDWeaponProperties[];
	url: string;
	dc?: The5ESRDSpellDc;
	heal_at_slot_level?: { [key: string]: string };
	area_of_effect?: AreaOfEffect;
}

export interface AreaOfEffect {
	type: AreaOfEffectType;
	size: number;
}

export enum AreaOfEffectType {
	Cone = 'cone',
	Cube = 'cube',
	Cylinder = 'cylinder',
	Line = 'line',
	Sphere = 'sphere'
}

export enum CastingTime {
	The10Minutes = '10 minutes',
	The12Hours = '12 hours',
	The1Action = '1 action',
	The1BonusAction = '1 bonus action',
	The1Hour = '1 hour',
	The1Minute = '1 minute',
	The1Reaction = '1 reaction',
	The24Hours = '24 hours',
	The8Hours = '8 hours'
}

export interface The5ESRDSpellDamage {
	damage_type?: The5ESRDWeaponProperties;
	damage_at_slot_level?: { [key: string]: string };
	damage_at_character_level?: { [key: string]: string };
}

export interface The5ESRDSpellDc {
	dc_type: The5ESRDWeaponProperties;
	dc_success: DcSuccess;
	desc?: string;
}

export enum RangeEnum {
	Self = 'Self',
	Sight = 'Sight',
	Special = 'Special',
	The100Feet = '100 feet',
	The10Feet = '10 feet',
	The120Feet = '120 feet',
	The150Feet = '150 feet',
	The1Mile = '1 mile',
	The300Feet = '300 feet',
	The30Feet = '30 feet',
	The500Feet = '500 feet',
	The500Miles = '500 miles',
	The5Feet = '5 feet',
	The60Feet = '60 feet',
	The90Feet = '90 feet',
	Touch = 'Touch',
	Unlimited = 'Unlimited'
}

export interface The5ESRDSubclasses {
	index: string;
	class: The5ESRDWeaponProperties;
	name: string;
	subclass_flavor: string;
	desc: string[];
	subclass_levels: string;
	url: string;
	spells?: The5ESRDSubclassSpell[];
}

export interface The5ESRDSubclassSpell {
	prerequisites: The5ESRDWeaponProperties[];
	spell: The5ESRDWeaponProperties;
}

export interface The5ESRDSubraces {
	index: string;
	name: string;
	race: The5ESRDWeaponProperties;
	desc: string;
	ability_bonuses: AbilityBonus[];
	starting_proficiencies: The5ESRDWeaponProperties[];
	languages: any[];
	racial_traits: The5ESRDWeaponProperties[];
	url: string;
	language_options?: LanguageOptionsElement;
}

export interface The5ESRDTraits {
	index: string;
	races: The5ESRDWeaponProperties[];
	subraces: The5ESRDWeaponProperties[];
	name: string;
	desc: string[];
	proficiencies: The5ESRDWeaponProperties[];
	url: string;
	proficiency_choices?: LanguageOptionsElement;
	trait_specific?: TraitSpecific;
	language_options?: LanguageOptionsElement;
	parent?: The5ESRDWeaponProperties;
}

export interface TraitSpecific {
	spell_options?: LanguageOptionsElement;
	subtrait_options?: LanguageOptionsElement;
	damage_type?: The5ESRDWeaponProperties;
	breath_weapon?: BreathWeapon;
}

export interface BreathWeapon {
	name: BreathWeaponName;
	desc: string;
	area_of_effect: AreaOfEffect;
	usage: SpellUsage;
	dc: BreathWeaponDc;
	damage: BreathWeaponDamage[];
}

export interface BreathWeaponDamage {
	damage_type: The5ESRDWeaponProperties;
	damage_at_character_level: { [key: string]: DamageAtCharacterLevel };
}

export enum DamageAtCharacterLevel {
	The2D6 = '2d6',
	The3D6 = '3d6',
	The4D6 = '4d6',
	The5D6 = '5d6'
}

export interface BreathWeaponDc {
	dc_type: The5ESRDWeaponProperties;
	success_type: DcSuccess;
}

export enum BreathWeaponName {
	BreathWeapon = 'Breath Weapon'
}
