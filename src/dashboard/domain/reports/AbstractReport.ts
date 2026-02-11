export abstract class AbstractReport<RowKey extends string | number, MetricKey extends string | number | symbol, Value> {
    
    protected records: Map<MetricKey, Value>
    protected static baseHeaders: string[] = []

    constructor(
        protected id:RowKey,
        protected labels: string[],
    ){
        this.records = new Map()
    }

    public getLabels(): string[]{
        return this.labels
    }

    set(metric: MetricKey, value: Value){
        this.records.set(metric,value)
    }

    get(metric: MetricKey): Value | undefined{
        return this.records.get(metric)
    }

    getRecords(): Map<MetricKey, Value>{
        return this.records
    }

    public abstract toRow(): string[]
    abstract getHeaders(): string[] 
}