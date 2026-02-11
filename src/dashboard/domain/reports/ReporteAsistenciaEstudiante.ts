import { AbstractReport } from "./AbstractReport"
import { EstadoAsistencia } from "../value-objects/EstadoAsistencia"

export class ReporteAsistenciaEstudiante
  extends AbstractReport<string, EstadoAsistencia, number> {
  static readonly baseHeaders = ["Nombre", "Apellido"]

  constructor(
    id: string,
    readonly nombre: string,
    readonly apellido: string
  ) {
    super(id, [nombre, apellido])

    Object.values(EstadoAsistencia).forEach(e => {
      this.set(e, 0)
    })
  }

  toRow(): string[] {
    const counts = Object.values(EstadoAsistencia).map(
      e => String(this.get(e) ?? 0)
    )
    return [...this.labels, ...counts]
  }

  getHeaders(): string[] {
    const estados = Object.values(EstadoAsistencia).map(
      e => e.charAt(0).toUpperCase() + e.slice(1)
    )
    return [...ReporteAsistenciaEstudiante.baseHeaders, ...estados]
  }
}
