import type { ReporteAsistenciaEstudiante } from "../../reports/ReporteAsistenciaEstudiante";
import { EstadoAsistencia } from "../../value-objects/EstadoAsistencia";
import { AlertContext, AlertRule, type AlertResult } from "../AlertRule";

export class PorcentajeBajoAlert extends AlertRule<ReporteAsistenciaEstudiante> {
    type = 'bajo_porcentaje_de_asistencia';

    readonly lowThreshold = 0.1
    readonly medThreshold = 0.2
    readonly highThreshold = 0.3

    protected evaluateSubject([m, reports]: [string, ReporteAsistenciaEstudiante[]]): AlertResult[] {
        return reports.flatMap(
            r => {
                const sum = Array.from(r.getRecords().values()).reduce(
                    (acc, s) => acc + s,
                    0
                )
                if (sum === 0) return []
                const percentage = (r.get(EstadoAsistencia.Ausente) ?? 0) / sum
                return this.evaluateMetric(percentage, r.getLabels(), m)
            }
        )
    }

    protected shouldAlert(percentage: number): boolean {
        return percentage >= this.lowThreshold
    }

    protected getSeverity(percentage: number): 'low' | 'medium' | 'high' {
        if (percentage >= this.highThreshold) return 'high'
        if (percentage >= this.medThreshold) return 'medium'
        return 'low'
    }

    protected buildAlert(
        percentage: number,
        labels: string[],
        materia: string
    ): AlertResult {
        return {
            type: this.type,
            severity: this.getSeverity(percentage),
            message: `${labels.join(' ')} ha faltado al ${(percentage * 100).toFixed(1)}% de las clases de ${materia}`
        }
    }
}