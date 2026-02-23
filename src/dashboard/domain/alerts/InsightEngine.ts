import type { AbstractReport } from "../reports/AbstractReport"
import { Engine } from "./Engine"
import type { InsightContext, InsightResult, InsightRule } from "./InsightRule"

export class InsightEngine<
R extends AbstractReport<any,any,any>,
MetaType = unknown
> extends Engine<InsightRule<R, MetaType>,R, MetaType> {

    evaluate(ctx: InsightContext<R>){
        const alertMap = new Map<string, InsightResult<MetaType>[]>()
        this.rules.forEach(
            r => {
                alertMap.set(r.type,r.evaluate(ctx))
            }
        )
        return alertMap
    }

}