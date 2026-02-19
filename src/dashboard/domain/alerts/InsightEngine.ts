import type { AbstractReport } from "../reports/AbstractReport"
import type { InsightContext, InsightResult, InsightRule } from "./InsightRule"

export class InsightEngine<R extends AbstractReport<any,any,any>, MetaType = unknown> {
    constructor(
        private rules: InsightRule<R, MetaType>[],
        private context: InsightContext<R>
    ){}

    evaluate(){
        const alertMap = new Map<string, InsightResult<MetaType>[]>()
        this.rules.forEach(
            r => {
                alertMap.set(r.type,r.evaluate(this.context))
            }
        )
        return alertMap
    }
    getRules(){
        return this.rules
    }
}