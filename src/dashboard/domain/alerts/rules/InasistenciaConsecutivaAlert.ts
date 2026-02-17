import type { ReportePorFecha } from "../../reports/ReportePorFecha";
import { EstadoAsistencia } from "../../value-objects/EstadoAsistencia";
import { AlertContext, AlertRule, type AlertResult } from "../AlertRule";

export class InasistenciaConsecutivaAlert extends AlertRule<ReportePorFecha> {
    type: string = 'inasistencia_consecutiva';
    protected evaluateSubject([m, reports]: [string, ReportePorFecha[]]): AlertResult[] {
        const alerts = reports.flatMap(
            r => {
                let consecutive = 0
                const records = r.getRecords().values().toArray().reverse()

                for (const record of records) {
                    if (record === EstadoAsistencia.Presente || record === EstadoAsistencia.Tarde) break
                    consecutive++
                }
                return this.evaluateMetric(consecutive, r.getLabels(), m)
            }
        )
        return alerts
    }

    protected shouldAlert(consecutive: number): boolean {
        return consecutive >= 2
    }

    protected getSeverity(consecutive: number): 'low' | 'medium' | 'high' {
        if (consecutive === 3) return 'medium'
        if (consecutive > 3) return 'high'
        return 'low'
    }

    protected buildAlert(
        consecutive: number,
        labels: string[],
        materia: string
    ): AlertResult {
        return {
            type: this.type,
            severity: this.getSeverity(consecutive),
            message: `${labels.join(' ')} ha faltado ${consecutive} veces seguidas a ${materia}`
        }
    }
}