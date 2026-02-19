import { AlertEngine } from "../domain/alerts/AlertEngine";
import type { AlertRule } from "../domain/alerts/AlertRule";
import { InsightEngine } from "../domain/alerts/InsightEngine";
import type { InsightContext, InsightRule } from "../domain/alerts/InsightRule";
import type { AbstractReport } from "../domain/reports/AbstractReport";

abstract class EngineBuilder<
InsightType extends InsightRule<ReportType, MetaType>,
ReportType extends AbstractReport<any, any, any>,
MetaType = unknown
> {
    private rules: Array<InsightType> = []
    constructor(
        private readonly context: InsightContext<ReportType>
    ){}

    addRule(rule: InsightType){
        this.rules.push(rule)
        return this
    }

    abstract build()
}

export class AlertEngineBuilder<
    R extends AbstractReport<any, any, any>
> {
    private rules: Array<AlertRule<R>> = []
    constructor(
        private readonly context: InsightContext<R>
    ){}

    addRule(rule: AlertRule<R>){
        this.rules.push(rule)
    }

    build(): AlertEngine<R> {
        return new AlertEngine(
            this.rules,
            this.context
        )
    }
}

export interface InsightEngineSlot<
    R extends AbstractReport<any, any, any>,
    MetaType = unknown
> {
    engine: InsightEngine<R, MetaType>
}

export function createAlertSlot<
    R extends AbstractReport<any, any, any>,
>(
    rules: AlertRule<R>[]
): AlertEngineSlot<R> {
    return {
        engine: new AlertEngine(rules)
    }
}

export function createInsightSlot<
    R extends AbstractReport<any, any, any>,
    MetaType = unknown
>(
    rules: InsightRule<R, MetaType>[]
): InsightEngineSlot<R,MetaType> {
    return {
        engine: new InsightEngine(rules)
    }
}