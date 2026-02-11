import { ReporteAsistenciaEstudiante } from "../../domain/reports/ReporteAsistenciaEstudiante"
import type { ReportePorFecha } from "../../domain/reports/ReportePorFecha"

export class DashboardViewModel {
  constructor(
    private reportesPorMateria: Map<
      string,
      Map<string, ReporteAsistenciaEstudiante>
      >,
      private reportesPorFecha: Map<
      string,
      Map<string, ReportePorFecha>
      >
  ) {}

  getMaterias(): string[] {
    return Array.from(this.reportesPorMateria.keys())
  }

  setReportesPorMateria(
    data:Map<
      string,
      Map<string, ReporteAsistenciaEstudiante>
      >
  ){
    this.reportesPorMateria = data
  }

  getReportesDeMateria(materia: string) {
    return this.reportesPorMateria.get(materia)
  }

  getReportesPorFecha(materia: string) {
    return this.reportesPorFecha.get(materia)
  }
}
