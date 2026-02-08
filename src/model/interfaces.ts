export abstract class tableableData<T extends string | number, V extends string | number | symbol, K> {
    protected records: Partial<Record<V, K>>
    protected static namesHeaders: string[] = []
    constructor(
        protected id:T,
        protected names: string[],
    ){
        this.records = {}
    }
    /**
     * toRow
     * Converts the record to a series of strings for rendering a HTMLTableRow
     */
    public getNames(): string[]{
        return this.names
    }
    public getName(i: number): string{
        const name = this.names[i]
        if(name) return name
        throw new Error(`No existe nombre en la posicion ${i}`);
    }
    public abstract toRow(): string[]
    public static getHeaders(): string[] {
        return []
    }
}

export abstract class TableView<T extends string, V extends string | number | symbol, K, R extends tableableData<T,V,K>> {
    constructor(
        protected data: Map<T, R>,
        protected readonly headers: string[]
    ){

    }

    protected rowMapper(item: R): string[]{
        return item.toRow()
    }

    private rowRenderer(data: string[], element: 'td' | 'th'): HTMLTableRowElement{
        const row = document.createElement('tr')
        data.forEach(d => {
            const dataRow = document.createElement(element)
            dataRow.innerText = d
            row.appendChild(dataRow)
        });
        return row
    }

    private headerRenderer(): HTMLTableSectionElement{
        const header = document.createElement('thead')

        const row = this.rowRenderer(this.headers, 'th')
        header.appendChild(row)

        return header
    }

    private bodyRenderer(): HTMLTableSectionElement{
        const body = document.createElement('tbody')

        this.data.forEach(
            (record, key) => {
                const mappedRow = this.rowMapper(record)
                const row = this.rowRenderer(mappedRow,'td')
                row.dataset.id = key

                body.appendChild(row)
            }
        )

        return body
    }

    public render(): HTMLTableElement{
        const table = document.createElement('table')

        const header = this.headerRenderer()
        table.appendChild(header)

        const body = this.bodyRenderer()
        table.appendChild(body)

        return table
    }
}