import type { DashboardConfig } from "../../application/DashboardConfig"
import type { DashboardScope } from "../../application/DashboardScope"
import { ReporteAsistenciaEstudiante } from "../../domain/reports/ReporteAsistenciaEstudiante"
import type { ReporteAsistenciaPorcentaje } from "../../domain/reports/ReporteAsistenciaPorcentaje"
import type { ReportePorFecha } from "../../domain/reports/ReportePorFecha"

export class DashboardViewModel {
  private reportMode: 'total' | 'porcentajes' = 'total'

  constructor(
    private scope: DashboardScope,
    private config: DashboardConfig,
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

  getAggregateReports() {
    return this.reportesPorMateria['total']
  }

  getTemporalReports() {
    return this.reportesPorFecha
  }

  getInsightsResult(){
    return this.config.strategy.execute(this)
  }

  getAlertRules(){
    return this.config.strategy.getAlertRules()
  }

  getInsightRules(){
    return this.config.strategy.getInsightRules()
  }
}
