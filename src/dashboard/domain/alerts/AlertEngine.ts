import type { AbstractReport } from "../reports/AbstractReport";
import type { AlertResult, AlertRule } from "./AlertRule";
import { Engine } from "./Engine";
import type { InsightContext } from "./InsightRule";

export class AlertEngine<
R extends AbstractReport<any,any,any>,
> extends Engine<AlertRule<R>,R> {

    evaluate(ctx: InsightContext<R>){
        const alertMap = new Map<string, AlertResult[]>()
        this.rules.forEach(
            r => {
                alertMap.set(r.type,r.evaluateAlerts(ctx))
            }
        )
        return alertMap
    }
}