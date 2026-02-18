import type { ReporteAsistenciaEstudiante } from "../../reports/ReporteAsistenciaEstudiante";
import { EstadoAsistencia } from "../../value-objects/EstadoAsistencia";
import { AlertRule } from "../AlertRule";
import type { InsightResult } from "../InsightRule";

type Meta = {
    nombre: string,
    apellido: string,
    materia: string,
    percentage: number
}

export class PorcentajeBajoAlert extends AlertRule<ReporteAsistenciaEstudiante, Meta> {
    type = 'bajo_porcentaje_de_asistencia';

    readonly lowThreshold = 0.1
    readonly medThreshold = 0.2
    readonly highThreshold = 0.3

    protected shouldAlert(metadata: Meta): boolean {
        return metadata.percentage >= this.lowThreshold
    }
    protected getSeverity(metadata: Meta): "low" | "medium" | "high" {
        if (metadata.percentage >= this.highThreshold) return 'high'
        if (metadata.percentage >= this.medThreshold) return 'medium'
        return 'low'
    }
    protected buildMessage(metadata: Meta): string {
        return `${metadata.nombre} ${metadata.apellido} ha faltado al ${(metadata.percentage * 100).toFixed(1)}% de las clases de ${metadata.materia}`
    }
    protected evaluateSubject([m, reports]: [string, ReporteAsistenciaEstudiante[]]): InsightResult<Meta>[] {
        return reports.flatMap(
            r => {
                const sum = Array.from(r.getRecords().values()).reduce(
                    (acc, s) => acc + s,
                    0
                )
                if (sum === 0) return []
                const percentage = (r.get(EstadoAsistencia.Ausente) ?? 0) / sum
                return [
                    {
                        type: this.type,
                        metadata: {
                            nombre: r.nombre,
                            apellido: r.apellido,
                            percentage: percentage,
                            materia: m
                        }
                    }
                ]
            }
        )
    }
}