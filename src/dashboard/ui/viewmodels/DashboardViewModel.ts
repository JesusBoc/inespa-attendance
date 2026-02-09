import { ReporteAsistenciaEstudiante } from "../../domain/reports/ReporteAsistenciaEstudiante"

export class DashboardViewModel {
  constructor(
    readonly reportesPorMateria: Map<
      string,
      Map<string, ReporteAsistenciaEstudiante>
    >
  ) {}

  getMaterias(): string[] {
    return Array.from(this.reportesPorMateria.keys())
  }

  getReportesDeMateria(materia: string) {
    return this.reportesPorMateria.get(materia)
  }
}
