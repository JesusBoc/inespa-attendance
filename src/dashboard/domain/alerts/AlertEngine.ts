import type { AbstractReport } from "../reports/AbstractReport";
import type { AlertResult, AlertRule } from "./AlertRule";
import type { InsightContext } from "./InsightRule";

export class AlertEngine<R extends AbstractReport<any,any,any>> {
    constructor(
        private readonly rules: AlertRule<R>[],
        private readonly context: InsightContext<R>
    ){}

    evaluate(){
        const alertMap = new Map<string, AlertResult[]>()
        this.rules.forEach(
            r => {
                alertMap.set(r.type,r.evaluateAlerts(this.context))
            }
        )
        return alertMap
    }
}