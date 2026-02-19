import type { CategoricalSeries } from "../series/CategoricalSeries";

export interface CategoricalInsight<MetaType> {
    toCategoricalSeries(metadata: MetaType): CategoricalSeries
}