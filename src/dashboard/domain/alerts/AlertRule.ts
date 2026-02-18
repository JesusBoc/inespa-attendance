import type { AbstractReport } from "../reports/AbstractReport"
import { InsightRule, type InsightContext, type InsightResult } from "./InsightRule"

export type AlertResult<MetaType = unknown> = InsightResult<MetaType> & {
    severity: 'low' | 'medium' | 'high'
    message: string,
}

export abstract class AlertRule<R extends AbstractReport<any,any,any>, MetaType = unknown> extends InsightRule<R, MetaType> {
    abstract readonly type: string
    evaluateAlerts(ctx: InsightContext<R>): AlertResult<MetaType>[]{
        const insights = this.evaluate(ctx)

        return insights
        .filter(i => this.shouldAlert(i.metadata))
        .map(i=>({
            ...i,
            severity: this.getSeverity(i.metadata),
            message: this.buildMessage(i.metadata)
        }))
    }
    protected abstract shouldAlert(metadata: MetaType): boolean
    protected abstract getSeverity(metadata: MetaType): 'low' | 'medium' | 'high'
    protected abstract buildMessage(metadata: MetaType): string

}