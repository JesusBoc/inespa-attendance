import type { AbstractReport } from "../reports/AbstractReport"

export type InsightResult<T> = {
    type: string,
    metadata: T
}

export class InsightContext<R extends AbstractReport<any, any, any>> {
    constructor(
        private data: Map<string, Map<string, R>>
    ) { }

    getReport(subject: string, studentId: string) {
        return this.data.get(subject)?.get(studentId)
    }

    getReportsBySubject(subject: string) {
        return this.data.get(subject)?.values().toArray() ?? []
    }

    getSubjects() {
        return this.data.keys().toArray()
    }
}

export abstract class InsightRule<R extends AbstractReport<any, any, any>, MetaType = unknown> {
    abstract type: string
    evaluate(ctx: InsightContext<R>): InsightResult<MetaType>[] {
        
        const materias = ctx.getSubjects()
        const reportesPorMateria = materias.map(
            m => [m, ctx.getReportsBySubject(m)] as const
        )
        return reportesPorMateria.flatMap(
            ([m, reports]) => this.evaluateSubject([m, reports])
        )
    }

    protected abstract evaluateSubject([m, reports]: [string, R[]]): InsightResult<MetaType>[]
}