import { supabase } from "../../supabase";
import type { Assignment } from "../domain/Assignment";
import { BaseService, type TableTypes } from "./BaseService";

export class AssignmentService extends BaseService<string, Assignment> {
    tableName: TableTypes = 'docente_materia_grupo'

    private constructor() {
        super()
    }

    static async create() {
        const service = new this()
        await service.reload()
        return service
    }
    async reload() {
        this.data = await this.fetchAll()
    }

    protected async fetchAll() {
        const map = new Map<string, Assignment>()
        const { data: assignments, error } = await supabase
            .from('assignment_view')
            .select('*')

        if (error) {
            throw new Error(error.message)
        }
        if (!assignments || assignments.length === 0) return map
        for (const assignment of assignments) {
            
            if (!assignment.id) continue
            map.set(
                assignment.id,
                {
                    teacherId: assignment.docente_id,
                    teacherName: assignment.nombre_docente,
                    teacherLastName: assignment.apellido_docente,
                    subjectId: assignment.materia_id ?? '',
                    subjectName: assignment.materia ?? '',
                    groupId: assignment.grupo_id ?? '',
                    groupName: assignment.grupo ?? ''
                }
            )
        }
        return map
    }

    async delete(id: string) {
        const { error } = await supabase
            .from(this.tableName)
            .delete()
            .eq('id', id)

        if (error) throw new Error(error.message);
        this.data.delete(id)
    }

    async insert(data: { groupId: string, subjectId: string }) {
        const { data: assignment, error } = await supabase
            .from(this.tableName)
            .insert({
                grupo_id: data.groupId,
                materia_id: data.subjectId
            })
            .select()
            .single()
        if (error) {
            throw new Error(error.message);
        }
        await this.reload()
        return assignment.id
    }

    async updateAssignmentTeacher(assignmtentId: string, newTeacherId: string) {
        const { error } = await supabase.from(this.tableName)
            .update({ 'docente_id': newTeacherId })
            .eq('id', assignmtentId)

        if (error) {
            throw new Error(error.message);
        }
        await this.reload()
    }
}