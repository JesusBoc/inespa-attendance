import { isAggregable } from "../domain/alerts/AggregableInsightRule";
import type { AlertResult, AlertRule } from "../domain/alerts/AlertRule";
import type { InsightEngine } from "../domain/alerts/InsightEngine";
import { InsightContext, type InsightRule } from "../domain/alerts/InsightRule";
import type { ReportePorFecha } from "../domain/reports/ReportePorFecha";
import type { DashboardViewModel } from "../ui/viewmodels/DashboardViewModel";
import type { DashboardResult, DashboardStrategy } from "./DashboardStrategy"
import { InsightEngineBuilder } from "./EngineSlot";
import { TeacherDashboardStrategy } from "./TeacherDashboardStrategy";

export class CoordinatorDashboardStrategy extends TeacherDashboardStrategy {

    execute(model: DashboardViewModel): DashboardResult {
        const results = super.execute(model)
        const alerts = results.alerts
        const insights = results.insights

        for(const rule of this.insightEngines.temporal.getRules()){
            if(isAggregable(rule)){
                const insightResult = results.insights.get(rule.type)
                if(insightResult)
                    insights.set(`+${rule.type}`,[rule.aggregate(insightResult)])
            }
        }
        return{
            alerts,
            insights
        }
    }
}   