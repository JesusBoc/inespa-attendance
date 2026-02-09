import { EstadoAsistencia } from "./asistencia"
import { tableableData, TableView } from "./interfaces"

export class Reporte extends tableableData<string, EstadoAsistencia, number>
{
    static readonly namesHeaders = [
        'Nombre',
        'Apellido'
    ]
    constructor(
        id: string,
        nombre: string,
        apellido: string
    ) { 
        super(
            id,
            [
                nombre,
                apellido
            ]
        )
        this.records = {
            [EstadoAsistencia.Presente]: 0,
            [EstadoAsistencia.Ausente]: 0,
            [EstadoAsistencia.Tarde]: 0,
            [EstadoAsistencia.Excusa]: 0
        }
    }
    public toRow(): string[] {
        const entries = Object.entries(this.records)
        const data = entries.map(
            d => String(d[1])
        )
        return [...this.names, ...data]
    }
    public static getHeaders(): string[] {
        const entries = Object.entries(EstadoAsistencia)
        const data = entries.map(
            d => d[0].charAt(0).toUpperCase() + d[0].slice(1)
        )

        return [...this.namesHeaders, ...data]
    }
    public set(estado: EstadoAsistencia, count: number) {
        this.records[estado] = count
    }
    static fromDTOs(data: ReporteDTO[]): Map<string, Map<string, Reporte>> {
        const map = new Map<string, Map<string, Reporte>>()

        data.forEach(r => {
            let materia = map.get(r.materia)
            if (!materia) {
                // Si no hay materias se inicializa el mapa de reportes
                materia = new Map<string, Reporte>()
                materia.set(
                    r.id,
                    new Reporte(r.id, r.nombre, r.apellido)
                )
                map.set(r.materia, materia)
            }
            let rep = materia.get(r.id)
            if (!rep) {
                rep = new Reporte(r.id, r.nombre, r.apellido)
                materia.set(r.id, rep)
            }
            rep.set(r.estado, r.count)
        })
        return map
    }
}

export type ReporteDTO = {
    id: string
    nombre: string
    apellido: string
    estado: EstadoAsistencia
    materia: string
    count: number
}

export class ReportView extends TableView<string,EstadoAsistencia,number,Reporte>{
    constructor(reportMap: Map<string, Reporte>) {
        super(
            reportMap,
            Reporte.getHeaders()
        )
    }
}