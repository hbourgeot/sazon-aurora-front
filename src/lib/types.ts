import type { SupaDB } from "./database.types";

export type Product = SupaDB["public"]["Tables"]["products"]["Row"];

export type Provider = SupaDB["public"]["Tables"]["providers"]["Row"];