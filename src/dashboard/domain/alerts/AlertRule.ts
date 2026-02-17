import type { AbstractReport } from "../reports/AbstractReport"

export class AlertContext<R extends AbstractReport<any,any,any>> {
    constructor(
        private data: Map<string, Map<string, R>>
    ){}

    getReport(subject: string, studentId: string){
        return this.data.get(subject)?.get(studentId)
    }

    getReportsBySubject(subject: string){
        return this.data.get(subject)?.values().toArray() ?? []
    }

    getSubjects() {
        return this.data.keys().toArray()
    }
}

export type AlertResult = {
    type: string,
    severity: 'low' | 'medium' | 'high'
    message: string,
    metadata?: any
}

export abstract class AlertRule<R extends AbstractReport<any,any,any>> {
    static readonly type: string
    evaluate(ctx: AlertContext<R>): AlertResult[]{
        const alerts: AlertResult[] = []
        const materias = ctx.getSubjects()
        const reportesPorMateria = materias.map(
            m => [m, ctx.getReportsBySubject(m)] as const
        )
        return reportesPorMateria.flatMap(
            ([m, reports]) => this.evaluateSubject([m, reports])
        )
    }
    protected abstract evaluateSubject([m, reports]: [string, R[]]): AlertResult[]
    protected abstract shouldAlert(metric: number): boolean
    protected abstract getSeverity(metric: number): 'low' | 'medium' | 'high'
    protected abstract buildAlert(metric: number, labels: string[], materia: string): AlertResult
    protected evaluateMetric(
        metric: number,
        labels: string[],
        materia: string
    ): AlertResult[]{
        if(!this.shouldAlert(metric)) return []
        return [this.buildAlert(metric, labels, materia)]
    }
}