import type { AlertResult, AlertRule } from "../domain/alerts/AlertRule"
import type { InsightResult, InsightRule } from "../domain/alerts/InsightRule"
import type { DashboardViewModel } from "../ui/viewmodels/DashboardViewModel"

export type DashboardResult = {
    alerts: Map<string, AlertResult[]>
    insights: Map<string, InsightResult<any>[]>
}

export type DashboardStrategy = {
    execute(model: DashboardViewModel): DashboardResult
    getAlertRules(): AlertRule<any, any>[]
    getInsightRules(): InsightRule<any, any>[]
}