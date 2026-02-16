import { EstadoAsistencia } from "../value-objects/EstadoAsistencia";
import { AbstractReport } from "./AbstractReport";

export class ReportePorFecha
    extends AbstractReport<string, string, EstadoAsistencia> {
    protected static readonly baseHeaders = [
        'Nombre',
        'Apellido'
    ]

    constructor(
        id: string,
        readonly nombre: string,
        readonly apellido: string,
        protected readonly fechas: string[]
    ) {
        super(id, [nombre, apellido])

        fechas.forEach(
            f => {
                this.set(f, EstadoAsistencia.Ausente)
            }
        )
    }

    public toRow(): string[] {
        const values = this.fechas.map(
            f => (this.get(f) ?? EstadoAsistencia.Ausente).toUpperCase()
        )
        return [...this.labels, ...values]
    }

    public getHeaders(): string[] {
        return [...ReportePorFecha.baseHeaders, ...this.fechas]
    }

}