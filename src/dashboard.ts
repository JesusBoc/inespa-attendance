import { Reporte, ReportView } from "./model/dashboard"
import { dummyData } from "./mockData"
import { TableView } from "./model/interfaces"
import type { EstadoAsistencia } from "./model/asistencia"

const curso = '9A'

async function main() {
    const reportes = Reporte.fromDTOs(dummyData)
    console.log(reportes)
    const title = document.getElementById("dash-title") as HTMLHeadingElement

    title.innerText = `Reporte de asistencia - ${curso}`
    const materias = document.getElementById("tab-materias")
    if(materias){
        reportes.forEach(
            (reporte, materia) => {
                const view = new ReportView(reporte)
                const section = document.createElement('section')

                const title = document.createElement('h1')
                title.className = "sectionTitle"
                title.innerText = materia

                section.appendChild(title)

                const table = view.render()
                table.className = 'reportTable'

                materias.appendChild(section)
                materias.appendChild(table)
            }
        )
    }
    document.body.style.opacity = "1"
}

function createTableRow(data: any[], header: boolean = false): HTMLTableRowElement{
    const row = document.createElement('tr')
    data.forEach(d => {
        let dataRow
        if(header){
            dataRow = document.createElement('th')
        } else{
            dataRow = document.createElement('td')
        }
        dataRow.innerText = d
        row.appendChild(dataRow)
    });
    return row
}

main()