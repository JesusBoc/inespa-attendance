import type { AbstractReport } from "../reports/AbstractReport"
import type { InsightContext, InsightResult, InsightRule } from "./InsightRule"

export class InsightEngine<R extends AbstractReport<any,any,any>> {
    constructor(
        private rules: InsightRule<R, any>[]
    ){}

    evaluate(ctx: InsightContext<R>){
        const alertMap = new Map<string, InsightResult<any>[]>()
        this.rules.forEach(
            r => {
                alertMap.set(r.type,r.evaluate(ctx))
            }
        )
        return alertMap
    }
}