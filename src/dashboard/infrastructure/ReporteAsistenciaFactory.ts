import { ReporteAsistenciaEstudiante } from "../domain/reports/ReporteAsistenciaEstudiante";
import { ReporteAsistenciaPorcentaje } from "../domain/reports/ReporteAsistenciaPorcentaje";
import type { EstadoAsistencia } from "../domain/value-objects/EstadoAsistencia";
import type { ReporteDTO } from "./dto/ReporteDTO";

type ReportConstructor = (
    id: string,
    nombre: string,
    apellido: string
) => ReporteAsistenciaEstudiante

export class ReporteAsistenciaFactory{
    private reports: ReporteDTO[] = [];
    static build(
        reports: ReporteDTO[],
        ctor: ReportConstructor
    ): Map<string, Map<string, ReporteAsistenciaEstudiante>>{
        const map = new Map<string, Map<string, ReporteAsistenciaEstudiante>>()

        reports.forEach(r=> {
            let materia = map.get(r.materia)
            if(!materia) {
                materia = new Map()
                map.set(r.materia, materia)
            }
            let rep = materia.get(r.id)
            if(!rep) {
                rep = ctor(r.id, r.nombre, r.apellido)
                materia.set(r.id, rep)
            }
            rep.set(r.estado as EstadoAsistencia, r.count)
        })
        return map
    }

    static buildAll(
        reports: ReporteDTO[]
    ){
        return {
            total: ReporteAsistenciaFactory.build(
                reports,
                (id,n,a) => new ReporteAsistenciaEstudiante(id,n,a)
            ),
            porcentajes: ReporteAsistenciaFactory.build(
                reports,
                (id,n,a) => new ReporteAsistenciaPorcentaje(id,n,a)
            )
        }
    }
}
