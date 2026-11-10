export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AdminRole = 'owner' | 'admin' | 'editor';
export type AdminStatus = 'active' | 'suspended';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type LeadStatus = 'new' | 'in_review' | 'contacted' | 'closed';
export type QuoteStatus = 'new' | 'reviewing' | 'quoted' | 'declined' | 'won';
export type ConsultationStatus = 'pending' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';

export interface Database {
  public: {
    Tables: {
      admin_members: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          role: AdminRole;
          status: AdminStatus;
          invited_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          role: AdminRole;
          status?: AdminStatus;
          invited_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          role?: AdminRole;
          status?: AdminStatus;
          invited_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_description: string | null;
          description: string;
          content: Json;
          category: 'digital' | 'systems' | 'ai' | 'maintenance';
          category_label: string | null;
          division_slug: string;
          icon: string | null;
          featured_image: string | null;
          status: ContentStatus;
          display_order: number;
          seo_title: string | null;
          seo_description: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          short_description?: string | null;
          description: string;
          content?: Json;
          category?: 'digital' | 'systems' | 'ai' | 'maintenance';
          category_label?: string | null;
          division_slug?: string;
          icon?: string | null;
          featured_image?: string | null;
          status?: ContentStatus;
          display_order?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          short_description?: string | null;
          description?: string;
          content?: Json;
          category?: 'digital' | 'systems' | 'ai' | 'maintenance';
          category_label?: string | null;
          division_slug?: string;
          icon?: string | null;
          featured_image?: string | null;
          status?: ContentStatus;
          display_order?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      divisions: {
        Row: {
          id: string;
          slug: string;
          title: string;
          tagline: string | null;
          short_description: string | null;
          badge: string | null;
          mission: string | null;
          overview: string | null;
          capabilities: Json;
          deliverables: Json;
          tech_stack: Json;
          status: ContentStatus;
          display_order: number;
          seo_title: string | null;
          seo_description: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          tagline?: string | null;
          short_description?: string | null;
          badge?: string | null;
          mission?: string | null;
          overview?: string | null;
          capabilities?: Json;
          deliverables?: Json;
          tech_stack?: Json;
          status?: ContentStatus;
          display_order?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          tagline?: string | null;
          short_description?: string | null;
          badge?: string | null;
          mission?: string | null;
          overview?: string | null;
          capabilities?: Json;
          deliverables?: Json;
          tech_stack?: Json;
          status?: ContentStatus;
          display_order?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      industries: {
        Row: {
          id: string;
          slug: string;
          name: string;
          badge: string | null;
          tagline: string | null;
          overview: string;
          challenges: Json;
          solutions: Json;
          featured_capabilities: Json;
          recommended_services: Json;
          status: ContentStatus;
          display_order: number;
          seo_title: string | null;
          seo_description: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          badge?: string | null;
          tagline?: string | null;
          overview: string;
          challenges?: Json;
          solutions?: Json;
          featured_capabilities?: Json;
          recommended_services?: Json;
          status?: ContentStatus;
          display_order?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          badge?: string | null;
          tagline?: string | null;
          overview?: string;
          challenges?: Json;
          solutions?: Json;
          featured_capabilities?: Json;
          recommended_services?: Json;
          status?: ContentStatus;
          display_order?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      portfolio_projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          project_type: string;
          category: 'web' | 'systems' | 'ai';
          category_label: string | null;
          tagline: string | null;
          description: string;
          content: Json;
          features: Json;
          tech_stack: Json;
          architecture_highlights: Json;
          demo_url: string | null;
          github_url: string | null;
          verification_badge: string | null;
          thumbnail: string | null;
          images: Json;
          status: ContentStatus;
          featured: boolean;
          display_order: number;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          project_type?: string;
          category?: 'web' | 'systems' | 'ai';
          category_label?: string | null;
          tagline?: string | null;
          description: string;
          content?: Json;
          features?: Json;
          tech_stack?: Json;
          architecture_highlights?: Json;
          demo_url?: string | null;
          github_url?: string | null;
          verification_badge?: string | null;
          thumbnail?: string | null;
          images?: Json;
          status?: ContentStatus;
          featured?: boolean;
          display_order?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          project_type?: string;
          category?: 'web' | 'systems' | 'ai';
          category_label?: string | null;
          tagline?: string | null;
          description?: string;
          content?: Json;
          features?: Json;
          tech_stack?: Json;
          architecture_highlights?: Json;
          demo_url?: string | null;
          github_url?: string | null;
          verification_badge?: string | null;
          thumbnail?: string | null;
          images?: Json;
          status?: ContentStatus;
          featured?: boolean;
          display_order?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          featured_image: string | null;
          author_name: string;
          author_role: string | null;
          read_time: string | null;
          category: 'Engineering' | 'Architecture' | 'AI & Systems' | 'Performance';
          tags: Json;
          status: ContentStatus;
          published_at: string | null;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          featured_image?: string | null;
          author_name?: string;
          author_role?: string | null;
          read_time?: string | null;
          category?: 'Engineering' | 'Architecture' | 'AI & Systems' | 'Performance';
          tags?: Json;
          status?: ContentStatus;
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          featured_image?: string | null;
          author_name?: string;
          author_role?: string | null;
          read_time?: string | null;
          category?: 'Engineering' | 'Architecture' | 'AI & Systems' | 'Performance';
          tags?: Json;
          status?: ContentStatus;
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          subject: string | null;
          message: string;
          source_page: string;
          status: LeadStatus;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          subject?: string | null;
          message: string;
          source_page?: string;
          status?: LeadStatus;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          subject?: string | null;
          message?: string;
          source_page?: string;
          status?: LeadStatus;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      quote_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          service_slug: string | null;
          budget_range: string | null;
          timeline: string | null;
          project_details: string;
          status: QuoteStatus;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          service_slug?: string | null;
          budget_range?: string | null;
          timeline?: string | null;
          project_details: string;
          status?: QuoteStatus;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          service_slug?: string | null;
          budget_range?: string | null;
          timeline?: string | null;
          project_details?: string;
          status?: QuoteStatus;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      consultation_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          preferred_date: string | null;
          preferred_time: string | null;
          topic: string | null;
          notes: string | null;
          status: ConsultationStatus;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          preferred_date?: string | null;
          preferred_time?: string | null;
          topic?: string | null;
          notes?: string | null;
          status?: ConsultationStatus;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          preferred_date?: string | null;
          preferred_time?: string | null;
          topic?: string | null;
          notes?: string | null;
          status?: ConsultationStatus;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          status: 'subscribed' | 'unsubscribed';
          consent_timestamp: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          status?: 'subscribed' | 'unsubscribed';
          consent_timestamp?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          status?: 'subscribed' | 'unsubscribed';
          consent_timestamp?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      admin_audit_logs: {
        Row: {
          id: string;
          actor_user_id: string | null;
          actor_email: string;
          actor_role: string;
          action: string;
          entity_type: string;
          entity_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_user_id?: string | null;
          actor_email: string;
          actor_role: string;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_user_id?: string | null;
          actor_email?: string;
          actor_role?: string;
          action?: string;
          entity_type?: string;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_admin_role: {
        Args: Record<string, never>;
        Returns: string | null;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      is_owner: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      is_full_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
