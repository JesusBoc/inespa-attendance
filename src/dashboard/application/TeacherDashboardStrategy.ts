import type { AlertEngine } from "../domain/alerts/AlertEngine"
import type { AlertResult, AlertRule } from "../domain/alerts/AlertRule"
import type { InsightEngine } from "../domain/alerts/InsightEngine"
import { InsightContext, InsightRule } from "../domain/alerts/InsightRule"
import { InasistenciaConsecutivaAlert } from "../domain/alerts/rules/InasistenciaConsecutivaAlert"
import { PorcentajeBajoAlert } from "../domain/alerts/rules/PorcentajeBajo"
import { PorcentajePorDia } from "../domain/alerts/rules/PorcentajePorDia"
import type { ReporteAsistenciaEstudiante } from "../domain/reports/ReporteAsistenciaEstudiante"
import type { ReportePorFecha } from "../domain/reports/ReportePorFecha"
import type { DashboardViewModel } from "../ui/viewmodels/DashboardViewModel"
import type { DashboardResult, DashboardStrategy } from "./DashboardStrategy"
import { AlertEngineBuilder, InsightEngineBuilder } from "./EngineSlot"

export class TeacherDashboardStrategy implements DashboardStrategy {
    protected alertEngines: {
        aggregate: AlertEngine<ReporteAsistenciaEstudiante>,
        temporal: AlertEngine<ReportePorFecha>
    }

    protected insightEngines: {
        temporal: InsightEngine<ReportePorFecha, any>
    }
    constructor(
    ) { 
        this.alertEngines = this.buildAlertEngines()
        this.insightEngines = this.buildInsightEngines()
    }

    protected buildAlertEngines() {
        const aggregateAlertBuilder = new AlertEngineBuilder()
            .addRule(new PorcentajeBajoAlert())

        const temporalAlertBuilder = new AlertEngineBuilder()
            .addRule(new InasistenciaConsecutivaAlert())
            .addRule(new PorcentajePorDia())
        
        return {
            aggregate: aggregateAlertBuilder.build(),
            temporal: temporalAlertBuilder.build()
        }
    }

    protected buildInsightEngines() {
        const temporalInsightBuilder = new InsightEngineBuilder<ReportePorFecha, any>()
            .addRule(new PorcentajePorDia())

        return {
            temporal: temporalInsightBuilder.build()
        }
    }
    getAlertRules(): AlertRule<any, any>[] {
        const rules: Array<AlertRule<any,any>> = []

        for(const engine of Object.values(this.alertEngines)){
            for(const rule of engine.getRules()){
                rules.push(rule)
            }
        }
        return rules
    }
    getInsightRules(): InsightRule<any, any>[] {
        const insights: Array<InsightRule<any,any>> = []

        for(const engine of Object.values(this.insightEngines)){
            for(const insight of engine.getRules()){
                insights.push(insight)
            }
        }
        return insights
    }

    execute(model: DashboardViewModel): DashboardResult {

        const aggregateContext =
            new InsightContext(model.getAggregateReports())

        const temporalContext =
            new InsightContext(model.getTemporalReports())

        const alerts = new Map<string, AlertResult[]>()

        for (const [k, v] of
            this.alertEngines.aggregate
                .evaluate(aggregateContext).entries()
        ) {
            alerts.set(k, v)
        }

        for (const [k, v] of
            this.alertEngines.temporal
                .evaluate(temporalContext).entries()
        ) {
            if (!alerts.has(k)) alerts.set(k, [])
            alerts.get(k)!.push(...v)
        }

        return {
            alerts,
            insights: this.insightEngines.temporal
                .evaluate(temporalContext)
        }
    }
}