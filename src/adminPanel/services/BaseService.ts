import { type Database } from "../../database.types"
import { supabase } from "../../supabase"

export type TableTypes = keyof (Database['public']['Tables'])
export abstract class BaseService<IDType extends string, DataType> {
    protected abstract readonly tableName: TableTypes
    protected data: Map<IDType, DataType> = new Map()

    protected abstract fetchAll(): Promise<Map<IDType, DataType>>
    async delete(id: IDType): Promise<void> {
        const { error } = await supabase
            .from(this.tableName)
            .delete()
            .eq('id', id)
        if (error) throw new Error(error.message)

        this.data.delete(id)
    }
    abstract insert(data: Partial<DataType>): Promise<IDType>

    getAll(): Map<IDType, DataType> {
        return this.data
    }
    getById(id: IDType): DataType | undefined {
        return this.data.get(id)
    }

    async reload() {
        this.data = await this.fetchAll()
    }
}