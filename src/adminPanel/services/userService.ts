import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../supabase";
import type { Teacher } from "../domain/Teacher";
import { BaseService } from "./BaseService";
import type { UserRole } from "../../util/RoleUtils";
import type { Database } from "../../database.types";

export abstract class UserService extends BaseService<string, Teacher> {
    abstract readonly role: UserRole
    protected readonly tableName = 'perfiles_usuarios'

    static async getUserRole(id: string): Promise<UserRole>{
        const { data, error } = await supabase
            .from('perfiles_usuarios')
            .select('rol')
            .eq('id', id)
            .single()

        if(error) throw new Error(error.message);
        
        return data.rol as UserRole
    }

    protected async fetchAll(): Promise<Map<string, Teacher>> {
        const map = new Map<string, Teacher>()
        const { data: teachers, error } = await this.lookTable()
        if (error) throw new Error(error.message);

        if (!teachers || teachers.length === 0) return map

        for (const teacher of teachers) {
            map.set(
                teacher.id,
                {
                    idFK: teacher.id,
                    name: teacher.nombre,
                    lastName: teacher.apellido,
                }
            )
        }
        return map
    }
    async insert(data: Teacher): Promise<string> {
        const { data: user, error } = await supabase
            .from(this.tableName)
            .insert(
                {
                    id: data.idFK,
                    nombre: data.name,
                    apellido: data.lastName,
                    rol: this.role,
                    activo: true
                }
            )
            .select('id')
            .single()
        if(error) throw new Error(error.message);
        if(!user) throw new Error("Couldnt retrieve id");
        return user.id
    }

    protected abstract lookTable(): Promise<{
        data: Database['public']['Tables']['perfiles_usuarios']['Row'][] | null;
        error: PostgrestError | null;
    }> 
}