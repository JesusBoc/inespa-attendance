import { Reporte, ReportView } from "./model/dashboard"
import { dummyData } from "./mockData"

const curso = '9A'

async function main() {
    const reportes = Reporte.fromDTOs(dummyData)

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

main()