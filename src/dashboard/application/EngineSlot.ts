import { AlertEngine } from "../domain/alerts/AlertEngine";
import type { AlertRule } from "../domain/alerts/AlertRule";
import type { Engine } from "../domain/alerts/Engine";
import { InsightEngine } from "../domain/alerts/InsightEngine";
import type { InsightContext, InsightRule } from "../domain/alerts/InsightRule";
import type { AbstractReport } from "../domain/reports/AbstractReport";

abstract class EngineBuilder<
InsightType extends InsightRule<ReportType, MetaType>,
ReportType extends AbstractReport<any, any, any>,
MetaType = unknown
> {
    protected rules: Array<InsightType> = []

    addRule(rule: InsightType){
        this.rules.push(rule)
        return this
    }

    abstract build(): Engine<InsightType, ReportType, MetaType>
}

export class AlertEngineBuilder<
R extends AbstractReport<any, any, any>
> extends EngineBuilder<AlertRule<R>, R>
{
    build(): AlertEngine<R> {
        return new AlertEngine(
            this.rules
        )
    }
}

export class InsightEngineBuilder<
R extends AbstractReport<any,any,any>,
MetaType = unknown
> extends EngineBuilder<InsightRule<R, MetaType>,R,MetaType> {

    build(): Engine<InsightRule<R, MetaType>, R, MetaType> {
        return new InsightEngine(
            this.rules
        )
    }
    
}

