export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      backups: {
        Row: {
          created_at: string | null
          created_by: string | null
          data: Json
          description: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          data: Json
          description?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          data?: Json
          description?: string | null
          id?: string
        }
        Relationships: []
      }
      crypto_wallets: {
        Row: {
          address: string
          balance: Json
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          address: string
          balance?: Json
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          address?: string
          balance?: Json
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crypto_wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company: string
          created_at: string | null
          description: string
          expires_at: string
          id: string
          location: string
          requirements: string[]
          salary_range: Json
          title: string
          type: string
        }
        Insert: {
          company: string
          created_at?: string | null
          description: string
          expires_at: string
          id?: string
          location: string
          requirements: string[]
          salary_range: Json
          title: string
          type: string
        }
        Update: {
          company?: string
          created_at?: string | null
          description?: string
          expires_at?: string
          id?: string
          location?: string
          requirements?: string[]
          salary_range?: Json
          title?: string
          type?: string
        }
        Relationships: []
      }
      monitoring_logs: {
        Row: {
          event_data: Json
          event_type: string
          id: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          event_data: Json
          event_type: string
          id?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          event_data?: Json
          event_type?: string
          id?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          title: string
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          title: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          title?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string | null
          price: number
          product_id: string
          quantity: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          price: number
          product_id: string
          quantity: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          price?: number
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          currency: string
          id: string
          payment_method: string
          shipping_address: Json
          status: string
          total: number
          tracking_number: string | null
          tracking_url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string
          id?: string
          payment_method: string
          shipping_address: Json
          status?: string
          total: number
          tracking_number?: string | null
          tracking_url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          id?: string
          payment_method?: string
          shipping_address?: Json
          status?: string
          total?: number
          tracking_number?: string | null
          tracking_url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          country_origin: string
          created_at: string | null
          currency: string
          description: string
          id: string
          images: string[]
          name: string
          price: number
          rating: number | null
          reviews_count: number | null
          shipping_countries: string[]
          stock: number
          supplier_id: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          country_origin: string
          created_at?: string | null
          currency?: string
          description: string
          id?: string
          images: string[]
          name: string
          price: number
          rating?: number | null
          reviews_count?: number | null
          shipping_countries: string[]
          stock?: number
          supplier_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          country_origin?: string
          created_at?: string | null
          currency?: string
          description?: string
          id?: string
          images?: string[]
          name?: string
          price?: number
          rating?: number | null
          reviews_count?: number | null
          shipping_countries?: string[]
          stock?: number
          supplier_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profit_transactions: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          id: string
          sale_id: string | null
          status: string
          transaction_hash: string | null
          wallet_address: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          sale_id?: string | null
          status?: string
          transaction_hash?: string | null
          wallet_address: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          sale_id?: string | null
          status?: string
          transaction_hash?: string | null
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "profit_transactions_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          category: string
          description: string
          difficulty: string
          id: string
          questions: Json
          reward_points: number
          title: string
        }
        Insert: {
          category: string
          description: string
          difficulty: string
          id?: string
          questions: Json
          reward_points?: number
          title: string
        }
        Update: {
          category?: string
          description?: string
          difficulty?: string
          id?: string
          questions?: Json
          reward_points?: number
          title?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          permissions: string[]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          permissions?: string[]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          permissions?: string[]
          updated_at?: string | null
        }
        Relationships: []
      }
      sales: {
        Row: {
          created_at: string | null
          id: string
          items: Json
          profit: number
          status: string
          total: number
          user_id: string | null
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          items: Json
          profit: number
          status?: string
          total: number
          user_id?: string | null
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          id?: string
          items?: Json
          profit?: number
          status?: string
          total?: number
          user_id?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          details: Json | null
          event_name: string
          event_type: string
          id: string
          ip_address: string | null
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          details?: Json | null
          event_name: string
          event_type: string
          id?: string
          ip_address?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          details?: Json | null
          event_name?: string
          event_type?: string
          id?: string
          ip_address?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      shopping_carts: {
        Row: {
          cart_items: Json | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cart_items?: Json | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cart_items?: Json | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          currency: string
          id: string
          status: string
          timestamp: string | null
          type: string
          wallet_id: string | null
        }
        Insert: {
          amount: number
          currency: string
          id?: string
          status?: string
          timestamp?: string | null
          type: string
          wallet_id?: string | null
        }
        Update: {
          amount?: number
          currency?: string
          id?: string
          status?: string
          timestamp?: string | null
          type?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "crypto_wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_consents: {
        Row: {
          analytics_consent: boolean
          created_at: string | null
          id: string
          is_active: boolean
          marketing_consent: boolean
          third_party_consent: boolean
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          analytics_consent?: boolean
          created_at?: string | null
          id?: string
          is_active?: boolean
          marketing_consent?: boolean
          third_party_consent?: boolean
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          analytics_consent?: boolean
          created_at?: string | null
          id?: string
          is_active?: boolean
          marketing_consent?: boolean
          third_party_consent?: boolean
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          country: string
          created_at: string | null
          crypto_wallet: string | null
          email: string
          full_name: string
          id: string
          language: string
          role: string
        }
        Insert: {
          avatar_url?: string | null
          country: string
          created_at?: string | null
          crypto_wallet?: string | null
          email: string
          full_name: string
          id?: string
          language?: string
          role?: string
        }
        Update: {
          avatar_url?: string | null
          country?: string
          created_at?: string | null
          crypto_wallet?: string | null
          email?: string
          full_name?: string
          id?: string
          language?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      begin_transaction: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      commit_transaction: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      rollback_transaction: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
