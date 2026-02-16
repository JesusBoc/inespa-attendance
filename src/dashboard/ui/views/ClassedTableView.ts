import type { AbstractReport } from "../../domain/reports/AbstractReport";
import { TableView } from "./TableView";

export class ClassedTableView extends TableView<AbstractReport<any,any,any>>{
    protected override renderCell(value: string, element: "td" | "th"): HTMLTableCellElement {
        const cell = document.createElement(element)
        cell.innerText = value
        cell.className = value.toLowerCase()
        return cell
    }
}