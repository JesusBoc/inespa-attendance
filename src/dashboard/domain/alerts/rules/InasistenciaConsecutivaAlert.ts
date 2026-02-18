import type { ReportePorFecha } from "../../reports/ReportePorFecha";
import { EstadoAsistencia } from "../../value-objects/EstadoAsistencia";
import { AlertRule, type AlertResult } from "../AlertRule";
import type { InsightResult } from "../InsightRule";

type Meta = {
    nombre: string,
    apellido: string,
    materia: string,
    consecutive: number
}

export class InasistenciaConsecutivaAlert extends AlertRule<ReportePorFecha, Meta> {
    type: string = 'inasistencia_consecutiva';

    protected shouldAlert(metadata: Meta): boolean {
        return metadata.consecutive >= 2
    }
    protected getSeverity(metadata: Meta): "low" | "medium" | "high" {
        if (metadata.consecutive === 3) return 'medium'
        if (metadata.consecutive > 3) return 'high'
        return 'low'
    }
    protected buildMessage(metadata: Meta): string {
        return `${metadata.nombre} ${metadata.apellido} ha faltado ${metadata.consecutive} veces seguidas a ${metadata.materia}`
    }
    protected evaluateSubject([m, reports]: [string, ReportePorFecha[]]): InsightResult<Meta>[] {
        return reports.flatMap(
            r => {
                let consecutive = 0
                const records = r.getRecords().values().toArray().reverse()

                for (const record of records) {
                    if (record === EstadoAsistencia.Presente || record === EstadoAsistencia.Tarde) break
                    consecutive++
                }
                return [{
                    type: this.type,
                    metadata: {
                        nombre: r.nombre,
                        apellido: r.apellido,
                        materia: m,
                        consecutive: consecutive
                    }
                }]
            }
        )
    }

    /* protected evaluateSubject([m, reports]: [string, ReportePorFecha[]]): AlertResult[] {
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
    } */
}