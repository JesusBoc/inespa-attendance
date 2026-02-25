import type { Database } from "../../database.types";
import { supabase } from "../../supabase";
import type { Student } from "../domain/Student";
import { BaseService, type TableTypes } from "./BaseService";

export class StudentService extends BaseService<string, Student> {
    protected tableName = 'estudiantes' as const

    private constructor() {
        super()
    }

    static async create() {
        const service = new this()
        await service.reload()
        return service
    }

    override async delete(id: string): Promise<void> {
        const { data: student, error } = await supabase
            .from(this.tableName)
            .update(
                {
                    activo: false
                }
            )
            .eq('id', id)
            .select()
            .single()
        if (error) throw new Error(error.message);
        if (student) this.data.delete(student.id)
    }

    protected async fetchAll(): Promise<Map<string, Student>> {
        const map = new Map<string, Student>()
        const { data: students, error } = await supabase
            .from(this.tableName)
            .select('*')
            .eq('activo', true)
            .order('apellido')
            .order('nombre')

        if (error) throw new Error(error.message);

        if (!students || students.length === 0) return map

        for (const student of students) {
            map.set(
                student.id,
                {
                    name: student.nombre,
                    lastName: student.apellido,
                    active: student.activo ?? false,
                    groupId: student.grupo_id
                }
            )
        }
        return map
    }
    async insert(data: Student): Promise<string> {
        const { data: student, error } = await supabase
            .from(this.tableName)
            .insert(
                {
                    nombre: data.name,
                    apellido: data.lastName,
                    activo: data.active,
                    grupo_id: data.groupId
                }
            )
            .select('id')
            .single()
        if (error) throw new Error(error.message);
        if (!student) throw new Error("Couldnt retrieve id");

        this.data.set(student.id, data)
        return student.id
    }

    async updateName(id: string, newName: string): Promise<boolean> {
        const { data: student, error } = await supabase
            .from(this.tableName)
            .update(
                {
                    nombre: newName
                }
            )
            .eq('id', id)
            .select()
            .single()
        if (error) throw new Error(error.message);
        if (student) this.data.set(student.id, this.rowMapper(student))
        return student != null
    }
    async updateLastName(id: string, newName: string): Promise<boolean> {
        const { data: student, error } = await supabase
            .from(this.tableName)
            .update(
                {
                    apellido: newName
                }
            )
            .eq('id', id)
            .select()
            .single()
        if (error) throw new Error(error.message);
        if (student) this.data.set(student.id, this.rowMapper(student))
        return student != null
    }
    async updateGroup(id: string, newGroupId: string): Promise<boolean> {
        const { data: student, error } = await supabase
            .from(this.tableName)
            .update(
                {
                    grupo_id: newGroupId
                }
            )
            .eq('id', id)
            .select()
            .single()
        if (error) throw new Error(error.message);
        if (student) this.data.set(student.id, this.rowMapper(student))
        return student != null
    }
    private rowMapper(data: Database['public']['Tables']['estudiantes']['Row']) {
        return {
            name: data.nombre,
            lastName: data.apellido,
            active: data.activo ?? false,
            groupId: data.grupo_id
        } as Student
    }
}