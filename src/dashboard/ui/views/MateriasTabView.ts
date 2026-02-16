import { View } from "./View";
import { DashboardViewModel } from "../viewmodels/DashboardViewModel";
import { TableView } from "./TableView";
import { ReporteAsistenciaEstudiante } from "../../domain/reports/ReporteAsistenciaEstudiante";

export class MateriaTabView extends View<DashboardViewModel> {
    private tableView = new TableView<ReporteAsistenciaEstudiante>()
    constructor(
        rootId: string,
        containerId?: string
    ) {
        super(rootId, containerId)
    }
    render(model: DashboardViewModel): void {
        this.clear()
        const materias = model.getMaterias()

        materias.forEach(
            m => {
                const section = this.createSection(m)
                const reporte = model.getReportesDeMateria(m)
                
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