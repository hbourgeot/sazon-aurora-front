import { SUPABASE_KEY, SUPABASE_URL } from "$env/static/private";
import type { SupaDB } from "$lib/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;

export const supabase = new SupabaseClient<SupaDB>(supabaseUrl, supabaseKey);