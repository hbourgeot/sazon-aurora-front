// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { SupaDB } from "$lib/database.types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { AxiosInstance } from "axios";
  
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}

    interface Locals {
      svelxios: AxiosInstance;
      supa: SupabaseClient<SupaDB>;
      user: User
    }
  
		// interface PageData {}
		// interface Platform {}
	}
}

interface User {
    id: number;
    email: string;
    name: string;
    role: number;
    document: string;
}

export {};
