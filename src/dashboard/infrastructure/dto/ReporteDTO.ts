import { EstadoAsistencia } from "../../../model/asistencia"

export type ReporteDTO = {
    id: string
    nombre: string
    apellido: string
    estado: EstadoAsistencia
    materia: string
    count: number
}