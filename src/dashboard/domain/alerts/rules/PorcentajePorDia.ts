import { LocalDate } from "../../../infrastructure/mappers/LocalDate"
import type { ReportePorFecha } from "../../reports/ReportePorFecha"
import type { CategoricalSeries } from "../../series/CategoricalSeries"
import { EstadoAsistencia } from "../../value-objects/EstadoAsistencia"
import { AlertRule, type AlertResult } from "../AlertRule"
import type { InsightResult } from "../InsightRule"
import type { CategoricalInsight } from "../interfaces"

type PorcentajePorDiaMetadata = {
    byDay: Map<string, number>
    maxDay: string
    materia: string
    cv: number
}

const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

export class PorcentajePorDia
extends AlertRule<ReportePorFecha, PorcentajePorDiaMetadata>
implements CategoricalInsight<PorcentajePorDiaMetadata>
{
    type: string = 'porcentaje_por_dia'
    private lowThreshold = 0.1
    private medThreshold = 0.2
    private highThreshold = 0.3

    protected shouldAlert(metadata: PorcentajePorDiaMetadata): boolean {
        return metadata.cv > this.lowThreshold
    }

    protected getSeverity(metadata: PorcentajePorDiaMetadata): "low" | "medium" | "high" {
        if(metadata.cv >= this.highThreshold) return 'high'
        if(metadata.cv >= this.medThreshold) return 'medium'
        return 'low'
    }

    protected buildMessage(metadata: PorcentajePorDiaMetadata): string {
        return `El día ${metadata.maxDay} concentra la mayor cantidad de inasistencias en ${metadata.materia}. (CV = ${metadata.cv.toFixed(2)})`
    }

    protected evaluateSubject([m, reports]: [string, ReportePorFecha[]]): InsightResult<PorcentajePorDiaMetadata>[] {
        const byDay = new Map<string,number>()

        const first = reports[0]
        if (!first) return []
        const datesMap = new Map<string, string>()
        first.getRecords().keys().forEach(
            h => {
                datesMap.set(h, weekDays[LocalDate.getWeekDay(h)]!)
            }
        )
        reports.forEach(
            r => {
                const records = r.getRecords()
                for (const [day, status] of records) {
                    const weekDay = datesMap.get(day)
                    if (!weekDay) continue
                    let current = byDay.get(weekDay)
                    if (!current) {
                        current = 0
                    }
                    if (status === EstadoAsistencia.Ausente) current++
                    byDay.set(weekDay, current)
                }
            }
        )
        const max = this.maxByDay(byDay)
        if(!max) return []

        const maxDay = max[0]
        const cv = this.calculateCV(byDay)

        return [
            {
                type: this.type,
                metadata: {
                    byDay,
                    maxDay,
                    materia: m,
                    cv
                }
            }
        ]
    }

    private maxByDay(map: Map<string, number>) {
        if (map.size === 0) return null

        return [...map.entries()].reduce(
            (max, current) => current[1] > max[1] ? current : max
        )
    }
    
    private calculateCV(map: Map<string, number>){
        const mean = map.values().reduce(
            (acc, s) => acc + s,
            0
        ) / map.size

        if(mean == 0) return 0

        const variance = map.values().reduce(
            (acc,v)=> acc + Math.pow(v - mean, 2),
            0
        ) / map.size

        const sd = Math.sqrt(variance)
        return sd/mean
    }
    toCategoricalSeries(metadata: PorcentajePorDiaMetadata): CategoricalSeries {
        const labels = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
        const values = labels.map(
            day => metadata.byDay.get(day) ?? 0
        )
        return {
            labels,
            values
        }
    }
}