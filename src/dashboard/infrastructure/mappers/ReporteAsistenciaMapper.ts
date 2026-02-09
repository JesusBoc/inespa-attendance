import { ReporteAsistenciaEstudiante } from "../../domain/reports/ReporteAsistenciaEstudiante"
import { EstadoAsistencia } from "../../domain/value-objects/EstadoAsistencia"
import type { ReporteDTO } from "../dto/ReporteDTO"

export class ReporteAsistenciaMapper {
  static fromDTOs(
    data: ReporteDTO[]
  ): Map<string, Map<string, ReporteAsistenciaEstudiante>> {

    const map = new Map<string, Map<string, ReporteAsistenciaEstudiante>>()

    data.forEach(r => {
      let materia = map.get(r.materia)
      if (!materia) {
        materia = new Map()
        map.set(r.materia, materia)
      }

      let rep = materia.get(r.id)
      if (!rep) {
        rep = new ReporteAsistenciaEstudiante(
          r.id,
          r.nombre,
          r.apellido
        )
        materia.set(r.id, rep)
      }

      rep.set(r.estado as EstadoAsistencia, r.count)
    })

    return map
  }
}
