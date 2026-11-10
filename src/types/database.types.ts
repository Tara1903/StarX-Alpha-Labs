export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      enquiries: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          email: string;
          company_name: string | null;
          service_category: string;
          budget_range: string | null;
          message: string;
          status: 'new' | 'contacted' | 'in_progress' | 'archived';
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          full_name: string;
          email: string;
          company_name?: string | null;
          service_category: string;
          budget_range?: string | null;
          message: string;
          status?: 'new' | 'contacted' | 'in_progress' | 'archived';
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          full_name?: string;
          email?: string;
          company_name?: string | null;
          service_category?: string;
          budget_range?: string | null;
          message?: string;
          status?: 'new' | 'contacted' | 'in_progress' | 'archived';
          metadata?: Json | null;
        };
      };
      consultation_requests: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          email: string;
          phone: string | null;
          preferred_date: string | null;
          preferred_time_slot: string | null;
          topic: string;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
        };
        Insert: {
          id?: string;
          created_at?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          preferred_date?: string | null;
          preferred_time_slot?: string | null;
          topic: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
        };
        Update: {
          id?: string;
          created_at?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          preferred_date?: string | null;
          preferred_time_slot?: string | null;
          topic?: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          is_active?: boolean;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
