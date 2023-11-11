export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			classes: {
				Row: {
					hit_die: number;
					id: string;
					proficiencies: string[];
					saving_throws: string[];
					spellcasting_ability: string | null;
					subclasses: string[];
				};
				Insert: {
					hit_die: number;
					id: string;
					proficiencies?: string[];
					saving_throws?: string[];
					spellcasting_ability?: string | null;
					subclasses?: string[];
				};
				Update: {
					hit_die?: number;
					id?: string;
					proficiencies?: string[];
					saving_throws?: string[];
					spellcasting_ability?: string | null;
					subclasses?: string[];
				};
				Relationships: [
					{
						foreignKeyName: 'classes_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'entities';
						referencedColumns: ['id'];
					}
				];
			};
			entities: {
				Row: {
					description: string | null;
					fts: unknown | null;
					id: string;
					name: string;
					type: string;
				};
				Insert: {
					description?: string | null;
					fts?: unknown | null;
					id: string;
					name: string;
					type: string;
				};
				Update: {
					description?: string | null;
					fts?: unknown | null;
					id?: string;
					name?: string;
					type?: string;
				};
				Relationships: [];
			};
			features: {
				Row: {
					class: string;
					feature_specific: Json | null;
					id: string;
					level: number;
					parent: string | null;
					prerequisites: Json | null;
					subclass: string | null;
				};
				Insert: {
					class: string;
					feature_specific?: Json | null;
					id: string;
					level: number;
					parent?: string | null;
					prerequisites?: Json | null;
					subclass?: string | null;
				};
				Update: {
					class?: string;
					feature_specific?: Json | null;
					id?: string;
					level?: number;
					parent?: string | null;
					prerequisites?: Json | null;
					subclass?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'features_class_fkey';
						columns: ['class'];
						isOneToOne: false;
						referencedRelation: 'classes';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'features_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'entities';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'features_parent_fkey';
						columns: ['parent'];
						isOneToOne: false;
						referencedRelation: 'features';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'features_subclass_fkey';
						columns: ['subclass'];
						isOneToOne: false;
						referencedRelation: 'subclasses';
						referencedColumns: ['id'];
					}
				];
			};
			levels: {
				Row: {
					ability_score_bonuses: number | null;
					cantrips_known: number | null;
					class: string;
					class_specific: Json | null;
					id: string;
					level: number;
					prof_bonus: number | null;
					slot_level_1: number | null;
					slot_level_2: number | null;
					slot_level_3: number | null;
					slot_level_4: number | null;
					slot_level_5: number | null;
					slot_level_6: number | null;
					slot_level_7: number | null;
					slot_level_8: number | null;
					slot_level_9: number | null;
					spells_known: number | null;
					subclass: string | null;
					subclass_specific: Json | null;
				};
				Insert: {
					ability_score_bonuses?: number | null;
					cantrips_known?: number | null;
					class: string;
					class_specific?: Json | null;
					id: string;
					level: number;
					prof_bonus?: number | null;
					slot_level_1?: number | null;
					slot_level_2?: number | null;
					slot_level_3?: number | null;
					slot_level_4?: number | null;
					slot_level_5?: number | null;
					slot_level_6?: number | null;
					slot_level_7?: number | null;
					slot_level_8?: number | null;
					slot_level_9?: number | null;
					spells_known?: number | null;
					subclass?: string | null;
					subclass_specific?: Json | null;
				};
				Update: {
					ability_score_bonuses?: number | null;
					cantrips_known?: number | null;
					class?: string;
					class_specific?: Json | null;
					id?: string;
					level?: number;
					prof_bonus?: number | null;
					slot_level_1?: number | null;
					slot_level_2?: number | null;
					slot_level_3?: number | null;
					slot_level_4?: number | null;
					slot_level_5?: number | null;
					slot_level_6?: number | null;
					slot_level_7?: number | null;
					slot_level_8?: number | null;
					slot_level_9?: number | null;
					spells_known?: number | null;
					subclass?: string | null;
					subclass_specific?: Json | null;
				};
				Relationships: [
					{
						foreignKeyName: 'levels_class_fkey';
						columns: ['class'];
						isOneToOne: false;
						referencedRelation: 'classes';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'levels_subclass_fkey';
						columns: ['subclass'];
						isOneToOne: false;
						referencedRelation: 'subclasses';
						referencedColumns: ['id'];
					}
				];
			};
			levels_features: {
				Row: {
					feature: string;
					level: string;
				};
				Insert: {
					feature: string;
					level: string;
				};
				Update: {
					feature?: string;
					level?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'levels_features_feature_fkey';
						columns: ['feature'];
						isOneToOne: false;
						referencedRelation: 'features';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'levels_features_level_fkey';
						columns: ['level'];
						isOneToOne: false;
						referencedRelation: 'levels';
						referencedColumns: ['id'];
					}
				];
			};
			spells: {
				Row: {
					aoe_size: number | null;
					aoe_type: string | null;
					attack_type: string | null;
					casting_time: string;
					classes: string[];
					components: string[];
					damage_at_character_level: Json | null;
					damage_at_slot_level: Json | null;
					damage_type: string | null;
					dc_description: string | null;
					dc_success: string | null;
					dc_type: string | null;
					duration: string;
					heal_at_slot_level: Json | null;
					higher_level: string[];
					id: string;
					is_concentration: boolean;
					is_ritual: boolean;
					level: number;
					material: string | null;
					range: string;
					school: string;
					subclasses: string[];
				};
				Insert: {
					aoe_size?: number | null;
					aoe_type?: string | null;
					attack_type?: string | null;
					casting_time: string;
					classes?: string[];
					components?: string[];
					damage_at_character_level?: Json | null;
					damage_at_slot_level?: Json | null;
					damage_type?: string | null;
					dc_description?: string | null;
					dc_success?: string | null;
					dc_type?: string | null;
					duration: string;
					heal_at_slot_level?: Json | null;
					higher_level?: string[];
					id: string;
					is_concentration: boolean;
					is_ritual: boolean;
					level: number;
					material?: string | null;
					range: string;
					school: string;
					subclasses?: string[];
				};
				Update: {
					aoe_size?: number | null;
					aoe_type?: string | null;
					attack_type?: string | null;
					casting_time?: string;
					classes?: string[];
					components?: string[];
					damage_at_character_level?: Json | null;
					damage_at_slot_level?: Json | null;
					damage_type?: string | null;
					dc_description?: string | null;
					dc_success?: string | null;
					dc_type?: string | null;
					duration?: string;
					heal_at_slot_level?: Json | null;
					higher_level?: string[];
					id?: string;
					is_concentration?: boolean;
					is_ritual?: boolean;
					level?: number;
					material?: string | null;
					range?: string;
					school?: string;
					subclasses?: string[];
				};
				Relationships: [
					{
						foreignKeyName: 'spells_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'entities';
						referencedColumns: ['id'];
					}
				];
			};
			subclass_spells: {
				Row: {
					feature: string | null;
					id: string;
					level: number;
					spell: string;
					subclass: string;
				};
				Insert: {
					feature?: string | null;
					id?: string;
					level: number;
					spell: string;
					subclass: string;
				};
				Update: {
					feature?: string | null;
					id?: string;
					level?: number;
					spell?: string;
					subclass?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'subclass_spells_feature_fkey';
						columns: ['feature'];
						isOneToOne: false;
						referencedRelation: 'features';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'subclass_spells_spell_fkey';
						columns: ['spell'];
						isOneToOne: false;
						referencedRelation: 'spells';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'subclass_spells_subclass_fkey';
						columns: ['subclass'];
						isOneToOne: false;
						referencedRelation: 'subclasses';
						referencedColumns: ['id'];
					}
				];
			};
			subclasses: {
				Row: {
					class: string;
					id: string;
					subclass_flavor: string;
				};
				Insert: {
					class: string;
					id: string;
					subclass_flavor: string;
				};
				Update: {
					class?: string;
					id?: string;
					subclass_flavor?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'subclasses_class_fkey';
						columns: ['class'];
						isOneToOne: false;
						referencedRelation: 'classes';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'subclasses_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'entities';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	storage: {
		Tables: {
			buckets: {
				Row: {
					allowed_mime_types: string[] | null;
					avif_autodetection: boolean | null;
					created_at: string | null;
					file_size_limit: number | null;
					id: string;
					name: string;
					owner: string | null;
					public: boolean | null;
					updated_at: string | null;
				};
				Insert: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id: string;
					name: string;
					owner?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Update: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id?: string;
					name?: string;
					owner?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'buckets_owner_fkey';
						columns: ['owner'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			migrations: {
				Row: {
					executed_at: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Insert: {
					executed_at?: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Update: {
					executed_at?: string | null;
					hash?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			objects: {
				Row: {
					bucket_id: string | null;
					created_at: string | null;
					id: string;
					last_accessed_at: string | null;
					metadata: Json | null;
					name: string | null;
					owner: string | null;
					path_tokens: string[] | null;
					updated_at: string | null;
					version: string | null;
				};
				Insert: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Update: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'objects_bucketId_fkey';
						columns: ['bucket_id'];
						isOneToOne: false;
						referencedRelation: 'buckets';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'objects_owner_fkey';
						columns: ['owner'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			can_insert_object: {
				Args: {
					bucketid: string;
					name: string;
					owner: string;
					metadata: Json;
				};
				Returns: undefined;
			};
			extension: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			filename: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			foldername: {
				Args: {
					name: string;
				};
				Returns: unknown;
			};
			get_size_by_bucket: {
				Args: Record<PropertyKey, never>;
				Returns: {
					size: number;
					bucket_id: string;
				}[];
			};
			search: {
				Args: {
					prefix: string;
					bucketname: string;
					limits?: number;
					levels?: number;
					offsets?: number;
					search?: string;
					sortcolumn?: string;
					sortorder?: string;
				};
				Returns: {
					name: string;
					id: string;
					updated_at: string;
					created_at: string;
					last_accessed_at: string;
					metadata: Json;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
