import { dummyData } from "../mockData"
import { ReporteAsistenciaMapper } from "./infrastructure/mappers/ReporteAsistenciaMapper"
import { DashboardController } from "./ui/controllers/DashboardController"
import { DashboardViewModel } from "./ui/viewmodels/DashboardViewModel"

const curso = '9A'

async function main() {
    const reportes =
        ReporteAsistenciaMapper.fromDTOs(dummyData)

    const vm = new DashboardViewModel(reportes)
    const controller = new DashboardController(vm)
    controller.init()
    document.body.style.opacity = "1"
}

main()