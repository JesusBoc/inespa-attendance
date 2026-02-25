export abstract class Table <IdType extends string, DataType>{
    protected abstract headers: string[]
    constructor(
        protected data: Map<IdType,DataType>
    ){}

    setData(data: Map<IdType,DataType>){
        this.data = data
    }

    create(): HTMLTableElement {
        const table = document.createElement('table')
        table.className = 'reportTable'
        const header = this.createHeader()
        const body = this.createBody()

        table.appendChild(header)
        table.appendChild(body)
        return table
    }

    protected createHeader(): HTMLTableSectionElement{
        const header = document.createElement('thead')

        const row = document.createElement('tr')
        for(const header of this.headers){
            const cell = document.createElement('th')
            cell.innerText = header
            row.appendChild(cell)
        }
        header.appendChild(row)
        return header
    }

    protected createBody(): HTMLTableSectionElement{
        const body = document.createElement('tbody')
        for(const [id, data] of this.data.entries()){
            const row = this.rowMapper(id, data)
            body.appendChild(row)
        }
        return body
    }
    protected abstract rowMapper(id: IdType, data: DataType): HTMLTableRowElement
}