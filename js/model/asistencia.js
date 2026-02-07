export var EstadoAsistencia;
(function (EstadoAsistencia) {
    EstadoAsistencia["Presente"] = "presente";
    EstadoAsistencia["Ausente"] = "ausente";
    EstadoAsistencia["Tarde"] = "tarde";
    EstadoAsistencia["Excusa"] = "excusa";
})(EstadoAsistencia || (EstadoAsistencia = {}));
export const ORDEN_ESTADOS = [
    EstadoAsistencia.Presente,
    EstadoAsistencia.Tarde,
    EstadoAsistencia.Ausente,
    EstadoAsistencia.Excusa
];
export class AsistenciaStateMachine {
    static next(actual) {
        switch (actual) {
            case EstadoAsistencia.Presente:
                return EstadoAsistencia.Ausente;
            case EstadoAsistencia.Ausente:
                return EstadoAsistencia.Tarde;
            case EstadoAsistencia.Tarde:
                return EstadoAsistencia.Excusa;
            case EstadoAsistencia.Excusa:
                return EstadoAsistencia.Presente;
        }
    }
}
//# sourceMappingURL=asistencia.js.map