import { AbstractReport } from "../../domain/reports/AbstractReport"

export class TableView<
    R extends AbstractReport<any, any, any>
> {

    protected rowRenderer(data: string[], element: 'td' | 'th'): HTMLTableRowElement {
        const row = document.createElement('tr')
        data.forEach(d => {
            row.appendChild(this.renderCell(d, element))
        });
        return row
    }

    protected renderCell(
        value: string,
        element: 'td' | 'th'
    ): HTMLTableCellElement{
        const cell = document.createElement(element)
        cell.innerText = value
        return cell
    }

    private headerRenderer(headers: string[]): HTMLTableSectionElement {
        const header = document.createElement('thead')

        const row = this.rowRenderer(headers, 'th')
        header.appendChild(row)

        return header
    }

    private bodyRenderer(data: Map<string, R>): HTMLTableSectionElement {
        const body = document.createElement('tbody')

        data.forEach(
            (record, key) => {
                const mappedRow = record.toRow()
                const row = this.rowRenderer(mappedRow, 'td')
                row.dataset.id = key

                body.appendChild(row)
            }
        )

        return body
    }

    public render(data: Map<string, R>): HTMLTableElement {

        const table = document.createElement('table')

        const [first] = data.values()
        if (!first) return table

        const header = this.headerRenderer(first.getHeaders())
        table.appendChild(header)

        const body = this.bodyRenderer(data)
        table.appendChild(body)

        return table
    }
}
