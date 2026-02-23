import type { AbstractReport } from "../reports/AbstractReport"
import type { InsightContext, InsightResult, InsightRule } from "./InsightRule"


export abstract class Engine<
InsightType extends InsightRule<ReportType, MetaType>,
ReportType extends AbstractReport<any,any,any>,
MetaType = unknown
> {
    constructor(
        protected readonly rules: InsightType[],
    ){}

    abstract evaluate(ctx: InsightContext<ReportType>): Map<string, InsightResult<MetaType>[]>
    getRules(){
        return this.rules
    }
}
