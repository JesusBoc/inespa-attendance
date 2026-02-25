import { supabase } from "../../supabase";
import type { UserRole } from "../../util/RoleUtils";
import { UserService } from "./UserService";

export class TeacherService extends UserService {
    role: UserRole = 'docente';

    static async create(){
        const service = new this()
        await service.reload()
        return service
    }

    protected async lookTable(){
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*')
            .neq('rol', 'admin')
            .neq('rol', 'coordinador')
            .eq('activo', true)
            .order('apellido')
            .order('nombre')

        return { data, error }
    }
}
