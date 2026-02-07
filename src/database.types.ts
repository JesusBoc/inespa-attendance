export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      alertas: {
        Row: {
          activa: boolean | null
          created_at: string | null
          estudiante_id: string | null
          id: string
          mensaje: string | null
          porcentaje: number | null
          tipo: string | null
        }
        Insert: {
          activa?: boolean | null
          created_at?: string | null
          estudiante_id?: string | null
          id?: string
          mensaje?: string | null
          porcentaje?: number | null
          tipo?: string | null
        }
        Update: {
          activa?: boolean | null
          created_at?: string | null
          estudiante_id?: string | null
          id?: string
          mensaje?: string | null
          porcentaje?: number | null
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alertas_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "estudiantes"
            referencedColumns: ["id"]
          },
        ]
      }
      asistencias: {
        Row: {
          clase_id: string | null
          created_at: string | null
          estado: string
          estudiante_id: string | null
          id: string
        }
        Insert: {
          clase_id?: string | null
          created_at?: string | null
          estado: string
          estudiante_id?: string | null
          id?: string
        }
        Update: {
          clase_id?: string | null
          created_at?: string | null
          estado?: string
          estudiante_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asistencias_clase_id_fkey"
            columns: ["clase_id"]
            isOneToOne: false
            referencedRelation: "clases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asistencias_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "estudiantes"
            referencedColumns: ["id"]
          },
        ]
      }
      clases: {
        Row: {
          created_at: string | null
          docente_id: string | null
          fecha: string
          grupo_id: string | null
          id: string
          materia_id: string | null
          periodo: string | null
        }
        Insert: {
          created_at?: string | null
          docente_id?: string | null
          fecha: string
          grupo_id?: string | null
          id?: string
          materia_id?: string | null
          periodo?: string | null
        }
        Update: {
          created_at?: string | null
          docente_id?: string | null
          fecha?: string
          grupo_id?: string | null
          id?: string
          materia_id?: string | null
          periodo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clases_docente_id_fkey"
            columns: ["docente_id"]
            isOneToOne: false
            referencedRelation: "perfiles_usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clases_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "grupos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clases_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "vista_clases_docente"
            referencedColumns: ["grupo_id"]
          },
          {
            foreignKeyName: "clases_materia_id_fkey"
            columns: ["materia_id"]
            isOneToOne: false
            referencedRelation: "materias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clases_materia_id_fkey"
            columns: ["materia_id"]
            isOneToOne: false
            referencedRelation: "vista_clases_docente"
            referencedColumns: ["materia_id"]
          },
        ]
      }
      docente_materia_grupo: {
        Row: {
          docente_id: string | null
          grupo_id: string | null
          id: string
          materia_id: string | null
        }
        Insert: {
          docente_id?: string | null
          grupo_id?: string | null
          id?: string
          materia_id?: string | null
        }
        Update: {
          docente_id?: string | null
          grupo_id?: string | null
          id?: string
          materia_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "docente_materia_grupo_docente_id_fkey"
            columns: ["docente_id"]
            isOneToOne: false
            referencedRelation: "perfiles_usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "docente_materia_grupo_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "grupos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "docente_materia_grupo_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "vista_clases_docente"
            referencedColumns: ["grupo_id"]
          },
          {
            foreignKeyName: "docente_materia_grupo_materia_id_fkey"
            columns: ["materia_id"]
            isOneToOne: false
            referencedRelation: "materias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "docente_materia_grupo_materia_id_fkey"
            columns: ["materia_id"]
            isOneToOne: false
            referencedRelation: "vista_clases_docente"
            referencedColumns: ["materia_id"]
          },
        ]
      }
      estudiantes: {
        Row: {
          activo: boolean | null
          apellido: string
          grupo_id: string | null
          id: string
          nombre: string
        }
        Insert: {
          activo?: boolean | null
          apellido: string
          grupo_id?: string | null
          id?: string
          nombre: string
        }
        Update: {
          activo?: boolean | null
          apellido?: string
          grupo_id?: string | null
          id?: string
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "estudiantes_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "grupos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estudiantes_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "vista_clases_docente"
            referencedColumns: ["grupo_id"]
          },
        ]
      }
      grupos: {
        Row: {
          director_id: string | null
          id: string
          nivel: number
          nombre: string
        }
        Insert: {
          director_id?: string | null
          id?: string
          nivel: number
          nombre: string
        }
        Update: {
          director_id?: string | null
          id?: string
          nivel?: number
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "grupos_director_id_fkey"
            columns: ["director_id"]
            isOneToOne: false
            referencedRelation: "perfiles_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      logs_eventos: {
        Row: {
          descripcion: string | null
          id: string
          timestamp: string | null
          tipo_evento: string | null
          usuario_id: string | null
        }
        Insert: {
          descripcion?: string | null
          id?: string
          timestamp?: string | null
          tipo_evento?: string | null
          usuario_id?: string | null
        }
        Update: {
          descripcion?: string | null
          id?: string
          timestamp?: string | null
          tipo_evento?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_eventos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "perfiles_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      materias: {
        Row: {
          id: string
          nombre: string
        }
        Insert: {
          id?: string
          nombre: string
        }
        Update: {
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      perfiles_usuarios: {
        Row: {
          activo: boolean | null
          apellido: string
          id: string
          nombre: string
          rol: string
        }
        Insert: {
          activo?: boolean | null
          apellido: string
          id: string
          nombre: string
          rol: string
        }
        Update: {
          activo?: boolean | null
          apellido?: string
          id?: string
          nombre?: string
          rol?: string
        }
        Relationships: []
      }
    }
    Views: {
      vista_clases_docente: {
        Row: {
          dmg_id: string | null
          docente_id: string | null
          grupo: string | null
          grupo_id: string | null
          materia: string | null
          materia_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "docente_materia_grupo_docente_id_fkey"
            columns: ["docente_id"]
            isOneToOne: false
            referencedRelation: "perfiles_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      guardar_asistencia_mvp: {
        Args: {
          p_asistencias: Json
          p_fecha: string
          p_grupo_id: string
          p_materia_id: string
        }
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
