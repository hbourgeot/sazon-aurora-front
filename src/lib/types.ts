import type { SupaDB } from "./database.types";

export type Product = SupaDB["public"]["Tables"]["products"]["Row"];

export type Provider = SupaDB["public"]["Tables"]["providers"]["Row"];

export type Food = SupaDB["public"]["Tables"]["foods"]["Row"];

export interface Crumb {
  icon?: string;
  label?: string;
  href: string;
}