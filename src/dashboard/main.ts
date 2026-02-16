import { dummyData } from "../mockData"
import { EstadoAsistencia } from "../model/asistencia"
import { supabase } from "../supabase"
import { ReporteAsistenciaEstudiante } from "./domain/reports/ReporteAsistenciaEstudiante"
import type { AsistenciaDTO } from "./infrastructure/dto/AsistenciaDTO"
import type { ReporteDTO } from "./infrastructure/dto/ReporteDTO"
import { ReporteAsistenciaFactory } from "./infrastructure/ReporteAsistenciaFactory"
import { ReportePorFechaMapper } from "./infrastructure/ReportePorFechaFactory"
import { dummyPorFechas } from "./testData/DummyPorFecha"
import { DashboardController } from "./ui/controllers/DashboardController"
import { DashboardViewModel } from "./ui/viewmodels/DashboardViewModel"

const params = new URLSearchParams(window.location.search)

const grupo_id = params.get('grupo_id')

async function main() {
    let reportes: AsistenciaDTO[]
    let resumen: ReporteDTO[]
    if (!grupo_id) {
        alert("Debe especificar una id de grupo")
        reportes = dummyPorFechas
        resumen = dummyData
        //return
    }
    else {
        const { data: asistencias, error: errorAsistencias } = await supabase
            .from('asistencias_por_dia')
            .select('*')
            .eq('grupo_id', grupo_id)

        if(errorAsistencias){
            alert(errorAsistencias.message)
        }

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
        const { data: reportesResumidos, error: errorReportes } = await supabase
            .from('asistencias_resumen')
            .select('*')
            .eq('grupo_id', grupo_id)
        
        if(errorReportes){
            alert(errorReportes.message)
        }
        if (!reportesResumidos) {
            resumen = dummyData
        }
        else {
            resumen = reportesResumidos?.map(
                a => {
                    return {
                        id: a.estudiante_id,
                        nombre: a.nombre,
                        apellido: a.apellido,
                        estado: a.estado,
                        materia: a.materia,
                        count: a.total
                    } as ReporteDTO
                }
            )
        }
    }

    const reporteResumen = ReporteAsistenciaFactory.buildAll(
        resumen
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