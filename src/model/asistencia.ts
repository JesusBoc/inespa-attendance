export enum EstadoAsistencia {
  Presente = 'presente',
  Ausente = 'ausente',
  Tarde = 'tarde',
  Excusa = 'excusa'
}

export type Asistencia = {
    nombre: string,
    estado: EstadoAsistencia
}

export type AsistenciaDTO = {
    estudiante_id: string,
    estado: EstadoAsistencia
}

export const ORDEN_ESTADOS = [
  EstadoAsistencia.Presente,
  EstadoAsistencia.Tarde,
  EstadoAsistencia.Ausente,
  EstadoAsistencia.Excusa
] as const

export class AsistenciaStateMachine {
  static next(actual: EstadoAsistencia): EstadoAsistencia {
    switch (actual){
        case EstadoAsistencia.Presente:
            return EstadoAsistencia.Ausente
        case EstadoAsistencia.Ausente:
            return EstadoAsistencia.Tarde
        case EstadoAsistencia.Tarde:
            return EstadoAsistencia.Excusa
        case EstadoAsistencia.Excusa:
            return EstadoAsistencia.Presente
    }
  }
}
