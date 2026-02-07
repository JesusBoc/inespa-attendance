export declare enum EstadoAsistencia {
    Presente = "presente",
    Ausente = "ausente",
    Tarde = "tarde",
    Excusa = "excusa"
}
export type Asistencia = {
    nombre: string;
    estado: EstadoAsistencia;
};
export type AsistenciaDTO = {
    estudiante_id: string;
    estado: EstadoAsistencia;
};
export declare const ORDEN_ESTADOS: readonly [EstadoAsistencia.Presente, EstadoAsistencia.Tarde, EstadoAsistencia.Ausente, EstadoAsistencia.Excusa];
export declare class AsistenciaStateMachine {
    static next(actual: EstadoAsistencia): EstadoAsistencia;
}
//# sourceMappingURL=asistencia.d.ts.map