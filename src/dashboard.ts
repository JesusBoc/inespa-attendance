import { EstadoAsistencia } from "./model/asistencia"
import { Reporte } from "./model/dashboard"
import { dummyData } from "./mockData"

const curso = '9A'

async function main() {
    const reportes = Reporte.fromDTOs(dummyData)
    console.log(reportes)
    const title = document.getElementById("dash-title") as HTMLHeadingElement

    title.innerText = `Reporte de asistencia - ${curso}`

    const panels = document.querySelectorAll('.tab-panel')
    document.body.style.opacity = "1"
}

main()