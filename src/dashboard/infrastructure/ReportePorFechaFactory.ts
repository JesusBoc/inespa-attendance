import { ReportePorFecha } from "../domain/reports/ReportePorFecha";
import type { AsistenciaDTO } from "./dto/AsistenciaDTO";


export class ReportePorFechaMapper {

    static build(
        reports: AsistenciaDTO[]
    ): Map<string, Map<string, ReportePorFecha>> {
        const map = new Map<string, Map<string, ReportePorFecha>>()
        const fechasPorMateria: Map<string, Set<string>> = new Map()
        reports.forEach(
            r => {
                let fechas = fechasPorMateria.get(r.materia)
                if(!fechas){
                    fechas = new Set()
                }
                fechas.add(r.fecha)
                fechasPorMateria.set(r.materia, fechas)
            }
        )
        reports.forEach(
            r => {
                let materia = map.get(r.materia)
                if (!materia) {
                    materia = new Map()
                    map.set(r.materia, materia)
                }
                let reporte = materia.get(r.id)
                if (!reporte) {
                    reporte = new ReportePorFecha(
                        r.id,
                        r.nombre,
                        r.apellido,
                        Array.from(fechasPorMateria.get(r.materia)!)
                    )
                    materia.set(r.id, reporte)
                }
                reporte.set(r.fecha, r.estado)
            })
        return map
    }
}