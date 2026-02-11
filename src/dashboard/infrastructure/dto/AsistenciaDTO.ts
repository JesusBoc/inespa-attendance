import type { EstadoAsistencia } from "../../../model/asistencia"

export type AsistenciaDTO = {
    id: string
    materia: string
    nombre: string
    apellido: string
    fecha: string
    estado: EstadoAsistencia
}