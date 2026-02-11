import { EstadoAsistencia } from "../value-objects/EstadoAsistencia";
import { ReporteAsistenciaEstudiante } from "./ReporteAsistenciaEstudiante";

export class ReporteAsistenciaPorcentaje extends ReporteAsistenciaEstudiante{

    public override toRow(): string[]{
        const status = Object.values(EstadoAsistencia)
        let suma = 0
        const total = status.reduce(
            (acc, s) => acc + (this.get(s) ?? 0),
            0
        )
        const percentages = status.map(s => {
            const value = this.get(s) ?? 0
            return total > 0 
            ? String(value / total) 
            : '0'
        })

        return [...this.labels, ...percentages]
    }
}