export type PaintingCategory = "historical" | "political" | "portraits";
export type PressType = "interview" | "article" | "publication";

export interface Database {
  public: {
    Tables: {
      paintings: {
        Row: {
          id: string;
          title_ku: string;
          title_en: string;
          title_ar: string;
          description_ku: string;
          description_en: string;
          description_ar: string;
          medium_ku: string;
          medium_en: string;
          medium_ar: string;
          image_url: string | null;
          category: PaintingCategory;
          year: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_ku: string;
          title_en: string;
          title_ar: string;
          description_ku?: string;
          description_en?: string;
          description_ar?: string;
          medium_ku?: string;
          medium_en?: string;
          medium_ar?: string;
          image_url?: string | null;
          category: PaintingCategory;
          year: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["paintings"]["Insert"]>;
        Relationships: [];
      };
      press_media: {
        Row: {
          id: string;
          title_ku: string;
          title_en: string;
          title_ar: string;
          excerpt_ku: string;
          excerpt_en: string;
          excerpt_ar: string;
          source: string;
          url: string;
          date: string;
          type: PressType;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_ku: string;
          title_en: string;
          title_ar: string;
          excerpt_ku?: string;
          excerpt_en?: string;
          excerpt_ar?: string;
          source: string;
          url: string;
          date: string;
          type: PressType;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["press_media"]["Insert"]>;
        Relationships: [];
      };
      exhibitions: {
        Row: {
          id: string;
          title_ku: string;
          title_en: string;
          title_ar: string;
          details_ku: string;
          details_en: string;
          details_ar: string;
          year: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_ku: string;
          title_en: string;
          title_ar: string;
          details_ku?: string;
          details_en?: string;
          details_ar?: string;
          year: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["exhibitions"]["Insert"]>;
        Relationships: [];
      };
      admins: {
        Row: { user_id: string; created_at: string };
        Insert: { user_id: string; created_at?: string };
        Update: Partial<Database["public"]["Tables"]["admins"]["Insert"]>;
        Relationships: [];
      };
      site_profile: {
        Row: {
          id: number;
          eyebrow_ku: string | null;
          eyebrow_en: string | null;
          eyebrow_ar: string | null;
          name_ku: string | null;
          name_en: string | null;
          name_ar: string | null;
          statement_ku: string | null;
          statement_en: string | null;
          statement_ar: string | null;
          hero_image_url: string | null;
          updated_at: string;
        };
        Insert: {
          id?: number;
          eyebrow_ku?: string | null;
          eyebrow_en?: string | null;
          eyebrow_ar?: string | null;
          name_ku?: string | null;
          name_en?: string | null;
          name_ar?: string | null;
          statement_ku?: string | null;
          statement_en?: string | null;
          statement_ar?: string | null;
          hero_image_url?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["site_profile"]["Insert"]>;
        Relationships: [];
      };
      biography_intro: {
        Row: {
          id: number;
          eyebrow_ku: string | null;
          eyebrow_en: string | null;
          eyebrow_ar: string | null;
          heading_ku: string | null;
          heading_en: string | null;
          heading_ar: string | null;
          intro_ku: string | null;
          intro_en: string | null;
          intro_ar: string | null;
          updated_at: string;
        };
        Insert: {
          id?: number;
          eyebrow_ku?: string | null;
          eyebrow_en?: string | null;
          eyebrow_ar?: string | null;
          heading_ku?: string | null;
          heading_en?: string | null;
          heading_ar?: string | null;
          intro_ku?: string | null;
          intro_en?: string | null;
          intro_ar?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["biography_intro"]["Insert"]>;
        Relationships: [];
      };
      biography_blocks: {
        Row: {
          id: string;
          body_ku: string;
          body_en: string;
          body_ar: string;
          image_url: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          body_ku?: string;
          body_en?: string;
          body_ar?: string;
          image_url?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["biography_blocks"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type PaintingRow = Database["public"]["Tables"]["paintings"]["Row"];
export type PaintingInsert = Database["public"]["Tables"]["paintings"]["Insert"];
export type PressMediaRow = Database["public"]["Tables"]["press_media"]["Row"];
export type PressMediaInsert = Database["public"]["Tables"]["press_media"]["Insert"];
export type ExhibitionRow = Database["public"]["Tables"]["exhibitions"]["Row"];
export type ExhibitionInsert = Database["public"]["Tables"]["exhibitions"]["Insert"];
export type SiteProfileRow = Database["public"]["Tables"]["site_profile"]["Row"];
export type SiteProfileInsert = Database["public"]["Tables"]["site_profile"]["Insert"];
export type BiographyIntroRow = Database["public"]["Tables"]["biography_intro"]["Row"];
export type BiographyIntroInsert = Database["public"]["Tables"]["biography_intro"]["Insert"];
export type BiographyBlockRow = Database["public"]["Tables"]["biography_blocks"]["Row"];
export type BiographyBlockInsert = Database["public"]["Tables"]["biography_blocks"]["Insert"];
