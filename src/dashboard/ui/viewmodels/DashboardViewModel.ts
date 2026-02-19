import type { DashboardConfig } from "../../application/DashboardConfig"
import type { DashboardScope } from "../../application/DashboardScope"
import { AlertEngine } from "../../domain/alerts/AlertEngine"
import { InsightEngine } from "../../domain/alerts/InsightEngine"
import { InasistenciaConsecutivaAlert } from "../../domain/alerts/rules/InasistenciaConsecutivaAlert"
import { PorcentajeBajoAlert } from "../../domain/alerts/rules/PorcentajeBajo"
import { PorcentajePorDia } from "../../domain/alerts/rules/PorcentajePorDia"
import { ReporteAsistenciaEstudiante } from "../../domain/reports/ReporteAsistenciaEstudiante"
import type { ReporteAsistenciaPorcentaje } from "../../domain/reports/ReporteAsistenciaPorcentaje"
import type { ReportePorFecha } from "../../domain/reports/ReportePorFecha"

export class DashboardViewModel {
  private reportMode: 'total' | 'porcentajes' = 'total'
  /* private alertEngines = {
    aggregate: new AlertEngine([
      new PorcentajeBajoAlert()
    ]),
    temporal: new AlertEngine([
      new InasistenciaConsecutivaAlert(),
      new PorcentajePorDia()
    ])
  }
  private insightEngines = {
    temporal: new InsightEngine([
      new PorcentajePorDia(),
    ])
  } */

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
  
  getAlertEngines(){
    return this.config.alertEngines
  }

  getInsightEngines(){
    return this.config.insightEngines
  }
}
