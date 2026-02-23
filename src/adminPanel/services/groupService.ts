import { supabase } from "../../supabase";
import type { Group } from "../domain/Group";
import { BaseService, type TableTypes } from "./BaseService";

export class GroupService extends BaseService<string, Group> {
    protected tableName = 'grupos' as const

    private constructor() {
        super()
    }
    static async create() {
        const service = new this()
        await service.reload()
        return service
    }

    protected async fetchAll(): Promise<Map<string, Group>> {
        const map = new Map<string, Group>()
        const { data: groups, error } = await supabase
            .from(this.tableName)
            .select('*')
            .order('nivel')
            .order('nombre')

        if (error) throw new Error(error.message);

        if (!groups || groups.length === 0) return map

        for (const group of groups) {
            map.set(
                group.id,
                {
                    name: group.nombre,
                    grade: group.nivel,
                    directorId: group.director_id
                }
            )
        }
        return map
    }

    async insert(data: Group): Promise<string> {
        const { data: group, error } = await supabase.from(this.tableName)
            .insert(
                {
                    director_id: data.directorId,
                    nivel: data.grade,
                    nombre: data.name
                }
            )
            .select('*')
            .single()

        if (error) {
            throw new Error(error.message);
        }
        this.data.set(group.id, data)
        return group.id
    }

}
