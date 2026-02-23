import type { AbstractReport } from "../reports/AbstractReport";
import type { InsightResult, InsightRule } from "./InsightRule";

export interface AggregableInsightRule<
ReportType extends AbstractReport<any, any, any>,
MetaType = unknown>
extends InsightRule <ReportType, MetaType> {
    aggregate(
        result: InsightResult<MetaType>[]
    ): InsightResult<MetaType>
}

export function isAggregable(
    rule: InsightRule<any,any>
): rule is AggregableInsightRule<any,any> {
    return 'aggregate' in rule
}