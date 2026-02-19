import { InsightContext, type InsightResult } from "../../domain/alerts/InsightRule";
import type { CategoricalSeries } from "../../domain/series/CategoricalSeries";
import type { DashboardViewModel } from "../viewmodels/DashboardViewModel";
import { typeName } from "./AlertView";
import { BarPlot } from "./BarPlot";
import { View } from "./View";

export class InsightsView extends View<DashboardViewModel> {

    render(model: DashboardViewModel): void {
        const insightContext = new InsightContext(model.getTemporalReports())
        const insightEngines = model.getInsightEngines()

        for (const rule of insightEngines.temporal.getRules()) {
            const results = rule.evaluate(insightContext)
            if(results.length === 0) continue
            if (!rule.supportsCategorical()) continue
            const series: CategoricalSeries[] = []
            const labels: string[] = []
            results.forEach(
                r => {
                    labels.push(r.metadata.materia)
                    series.push(rule.toCategoricalSeries(r.metadata))
                }
            )
            this.renderBarPlot(rule.type, series, labels)
        }
    }

    private renderBarPlot(ruleType: string, series: CategoricalSeries[], labels: string[]) {
        const section = document.createElement('section')

        const titleEl = document.createElement('h2')
        titleEl.innerText = typeName(ruleType)
        titleEl.className = "sectionTitle"

        section.appendChild(titleEl)

        const canvas = document.createElement('canvas')
        const plot = new BarPlot(canvas)
        plot.plot(series, labels)

        section.appendChild(canvas)

        this.root.appendChild(section)
    }
}

