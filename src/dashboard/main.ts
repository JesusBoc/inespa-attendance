import { dummyData } from "../mockData"
import { EstadoAsistencia } from "../model/asistencia"
import { supabase } from "../supabase"
import { ReporteAsistenciaEstudiante } from "./domain/reports/ReporteAsistenciaEstudiante"
import type { AsistenciaDTO } from "./infrastructure/dto/AsistenciaDTO"
import { ReporteAsistenciaFactory } from "./infrastructure/ReporteAsistenciaFactory"
import { ReportePorFechaMapper } from "./infrastructure/ReportePorFechaFactory"
import { dummyPorFechas } from "./testData/DummyPorFecha"
import { DashboardController } from "./ui/controllers/DashboardController"
import { DashboardViewModel } from "./ui/viewmodels/DashboardViewModel"

const params = new URLSearchParams(window.location.search)

const grupo_id = params.get('grupo_id')

async function main() {
    let reportes: AsistenciaDTO[]
    if (!grupo_id) {
        alert("Debe especificar una id de grupo")
        reportes = dummyPorFechas
        //return
    }
    else {
        const { data: asistencias, error } = await supabase
            .from('asistencias_por_dia')
            .select('*')
            .eq('grupo_id', grupo_id)

        if (!asistencias) {
            reportes = dummyPorFechas
        }
        else {
            reportes = asistencias?.map(
                a => {
                    return {
                        nombre: a.nombre ?? '',
                        apellido: a.apellido ?? '',
                        estado: a.estado as EstadoAsistencia || EstadoAsistencia.Ausente,
                        fecha: a.fecha ?? '2026-01-01',
                        id: a.id ?? '',
                        materia: a.materia ?? '',
                    } as AsistenciaDTO
                }
            )
        }
    }

    const reporteResumen = ReporteAsistenciaFactory.build(
        dummyData,
        (id, n, a) => new ReporteAsistenciaEstudiante(id, n, a)
    )
    const reportePorFecha = ReportePorFechaMapper.build(
        reportes
    )
    const vm = new DashboardViewModel(reporteResumen, reportePorFecha)
    const controller = new DashboardController(vm)
    controller.init()
    document.body.style.opacity = "1"
}

main()