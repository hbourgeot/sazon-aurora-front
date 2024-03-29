export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface SupaDB {
  public: {
    Tables: {
      cart: {
        Row: {
          created_at: string
          id: number
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      cart_details: {
        Row: {
          cart_id: number
          food_id: number | null
          id: number
          quantity: number | null
          total_price: number | null
        }
        Insert: {
          cart_id: number
          food_id?: number | null
          id?: number
          quantity?: number | null
          total_price?: number | null
        }
        Update: {
          cart_id?: number
          food_id?: number | null
          id?: number
          quantity?: number | null
          total_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_details_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "cart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_details_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          }
        ]
      }
      food_products: {
        Row: {
          amount: number | null
          food_id: number
          id: number
          product_id: number
        }
        Insert: {
          amount?: number | null
          food_id: number
          id?: number
          product_id: number
        }
        Update: {
          amount?: number | null
          food_id?: number
          id?: number
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "food_products_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      foods: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          price: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          price?: number
        }
        Relationships: []
      }
      invoice_details: {
        Row: {
          food_id: number | null
          id: number
          invoice_id: number
          price: number
          quantity: number | null
        }
        Insert: {
          food_id?: number | null
          id?: number
          invoice_id: number
          price: number
          quantity?: number | null
        }
        Update: {
          food_id?: number | null
          id?: number
          invoice_id?: number
          price?: number
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_details_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_details_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          }
        ]
      }
      invoices: {
        Row: {
          created_at: string
          id: number
          status: string | null
          total: number
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          status?: string | null
          total: number
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          status?: string | null
          total?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          description: string | null
          id: number
          name: string | null
          provider_id: number | null
          stock: number | null
        }
        Insert: {
          description?: string | null
          id?: number
          name?: string | null
          provider_id?: number | null
          stock?: number | null
        }
        Update: {
          description?: string | null
          id?: number
          name?: string | null
          provider_id?: number | null
          stock?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          }
        ]
      }
      providers: {
        Row: {
          address: string | null
          contact: string | null
          contact_type: string | null
          id: number
          name: string | null
        }
        Insert: {
          address?: string | null
          contact?: string | null
          contact_type?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          address?: string | null
          contact?: string | null
          contact_type?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: number
          role: string
        }
        Insert: {
          id?: number
          role: string
        }
        Update: {
          id?: number
          role?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          document: string
          email: string
          id: number
          name: string
          password: string
          role: number
        }
        Insert: {
          document: string
          email: string
          id?: number
          name: string
          password: string
          role: number
        }
        Update: {
          document?: string
          email?: string
          id?: number
          name?: string
          password?: string
          role?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (SupaDB["public"]["Tables"] & SupaDB["public"]["Views"])
    | { schema: keyof SupaDB },
  TableName extends PublicTableNameOrOptions extends { schema: keyof SupaDB }
    ? keyof (SupaDB[PublicTableNameOrOptions["schema"]]["Tables"] &
        SupaDB[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof SupaDB }
  ? (SupaDB[PublicTableNameOrOptions["schema"]]["Tables"] &
      SupaDB[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (SupaDB["public"]["Tables"] &
      SupaDB["public"]["Views"])
  ? (SupaDB["public"]["Tables"] &
      SupaDB["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof SupaDB["public"]["Tables"]
    | { schema: keyof SupaDB },
  TableName extends PublicTableNameOrOptions extends { schema: keyof SupaDB }
    ? keyof SupaDB[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof SupaDB }
  ? SupaDB[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof SupaDB["public"]["Tables"]
  ? SupaDB["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof SupaDB["public"]["Tables"]
    | { schema: keyof SupaDB },
  TableName extends PublicTableNameOrOptions extends { schema: keyof SupaDB }
    ? keyof SupaDB[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof SupaDB }
  ? SupaDB[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof SupaDB["public"]["Tables"]
  ? SupaDB["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof SupaDB["public"]["Enums"]
    | { schema: keyof SupaDB },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof SupaDB }
    ? keyof SupaDB[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof SupaDB }
  ? SupaDB[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof SupaDB["public"]["Enums"]
  ? SupaDB["public"]["Enums"][PublicEnumNameOrOptions]
  : never
