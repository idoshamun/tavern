import type { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Row'];
export type Insert<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Insert'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
// etc.
