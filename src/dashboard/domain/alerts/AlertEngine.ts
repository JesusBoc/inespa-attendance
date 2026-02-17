import type { AbstractReport } from "../reports/AbstractReport";
import type { AlertContext, AlertResult, AlertRule } from "./AlertRule";

export class AlertEngine<R extends AbstractReport<any,any,any>> {
    constructor(
        private rules: AlertRule<R>[]
    ){}

    evaluate(ctx: AlertContext<R>){
        const alertMap = new Map<string, AlertResult[]>()
        this.rules.forEach(
            r => {
                alertMap.set(r.type,r.evaluate(ctx))
            }
        )
        return alertMap
    }
}