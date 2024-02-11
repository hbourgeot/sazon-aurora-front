import type { SupaDB } from "./database.types";

export type Product = SupaDB["public"]["Tables"]["products"]["Row"];

export type Provider = SupaDB["public"]["Tables"]["providers"]["Row"];

export type Food = SupaDB["public"]["Tables"]["foods"]["Row"];

export type User = SupaDB["public"]["Tables"]["users"]["Row"];

export interface Crumb {
  icon?: string;
  label?: string;
  href: string;
}
export interface FoodProduct{
    created_at: string;
    description: string | null;
    id: number;
    name: string;
    price: number;
    products: {
        amount: number | null;
        product: {id: number, name: string};
    }[];
};