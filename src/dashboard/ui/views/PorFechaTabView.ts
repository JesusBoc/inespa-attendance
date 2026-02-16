import { View } from "./View";
import { DashboardViewModel } from "../viewmodels/DashboardViewModel";
import { ClassedTableView } from "./ClassedTableView";

export class PorFechaTabView extends View<DashboardViewModel> {
    private tableView = new ClassedTableView()
    constructor(
        rootId: string,
    ) {
        super(rootId)
    }
    render(model: DashboardViewModel): void {
        this.clear()
        const materias = model.getMaterias()

        materias.forEach(
            m => {
                const section = this.createSection(m)
                const reporte = model.getReportesPorFecha(m)

                if (reporte) {
                    const table = this.tableView.render(reporte)
                    table.className = "reportTable"
                    section.appendChild(table)
                }

                this.root.appendChild(section)
            }
        )
    }

    private createSection(title: string): HTMLElement {
        const section = document.createElement('section')

        const titleEl = document.createElement('h2')
        titleEl.innerText = title
        titleEl.className = "sectionTitle"

        section.appendChild(titleEl)

        return section
    }
}