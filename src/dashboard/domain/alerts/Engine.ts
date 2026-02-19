import type { AbstractReport } from "../reports/AbstractReport"
import type { InsightContext, InsightResult, InsightRule } from "./InsightRule"


export abstract class Engine<
InsightType extends InsightRule<ReportType, MetaType>,
ReportType extends AbstractReport<any,any,any>,
MetaType = unknown
> {
    abstract method: (ctx: InsightContext<ReportType>) => InsightResult<MetaType>[]
    constructor(
        private readonly rules: InsightType[],
        private readonly context: InsightContext<ReportType>
    ){}

    evaluate(){
        const alertMap = new Map<string, InsightResult<MetaType>[]>()
        this.rules.forEach(
            r => {
                alertMap.set(r.type,this.method(this.context))
            }
        )
        return alertMap
    }
}
