import { EstadoAsistencia } from "./asistencia"

export class Reporte {

    private estados: Record<EstadoAsistencia, number> = {
        [EstadoAsistencia.Presente]: 0,
        [EstadoAsistencia.Ausente]: 0,
        [EstadoAsistencia.Tarde]: 0,
        [EstadoAsistencia.Excusa]: 0
    }

    constructor(
        public nombre: string,
        public apellido: string
    ){}

    public set(estado: EstadoAsistencia, count: number){
        this.estados[estado] = count
    }
    static fromDTOs(data: ReporteDTO[]): Map<string,Map<string, Reporte>>{
        const map = new Map<string, Map<string,Reporte>>()

        data.forEach(r => {
            let materia = map.get(r.materia)
            if(!materia){
                // Si no hay materias se inicializa el mapa de reportes
                materia = new Map<string,Reporte>()
                materia.set(
                    r.id,
                    new Reporte(r.nombre, r.apellido)
                )
                map.set(r.materia, materia)
            }
            let rep = materia.get(r.id)
            if(!rep){
                rep = new Reporte(r.nombre, r.apellido)
                materia.set(r.id, rep)
            }
            rep.set(r.estado, r.count)
        })
        return map
    }
}

export type ReporteDTO = {
    id: string
    nombre: string
    apellido: string
    estado: EstadoAsistencia
    materia: string
    count: number
}