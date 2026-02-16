import { ReporteAsistenciaEstudiante } from "../../domain/reports/ReporteAsistenciaEstudiante"
import type { ReporteAsistenciaPorcentaje } from "../../domain/reports/ReporteAsistenciaPorcentaje"
import type { ReportePorFecha } from "../../domain/reports/ReportePorFecha"

export class DashboardViewModel {
  private reportMode: 'total' | 'porcentajes' = 'total'

  constructor(
    private reportesPorMateria: {
        total: Map<string, Map<string, ReporteAsistenciaEstudiante>>
        porcentajes: Map<string, Map<string, ReporteAsistenciaPorcentaje>>
      },
      private reportesPorFecha: Map<
      string,
      Map<string, ReportePorFecha>
      >
  ) {}

  toggleMode() {
    
    this.reportMode = this.reportMode === 'total'
      ? 'porcentajes'
      : 'total'
  }

  getMaterias(): string[] {
    return Array.from(this.reportesPorMateria[this.reportMode].keys())
  }

  getReportesDeMateria(materia: string) {
    return this.reportesPorMateria[this.reportMode].get(materia)
  }

  getReportesPorFecha(materia: string) {
    return this.reportesPorFecha.get(materia)
  }
}
