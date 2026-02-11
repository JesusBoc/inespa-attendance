import { supabase } from './supabase.js'
import { EstadoAsistencia, AsistenciaStateMachine } from './model/asistencia.js'
import type { Asistencia, AsistenciaDTO } from './model/asistencia.js'

// --------------------
// Configuración
// --------------------
const state = {
  asistencias: new Map<string, Asistencia>()
}

const params = new URLSearchParams(window.location.search)

const dmg_id = params.get('dmg_id')

let grupo_id: string | null = null
let materia_id: string | null = null
let grupo = null
let materia = null

const hoy = new Date().toISOString().slice(0, 10)

// --------------------
// Inicialización
// --------------------
document.addEventListener('DOMContentLoaded', init)

document.getElementById('allPresent')!
  .addEventListener('click', todosPresentes)

document.getElementById('allAbsent')!
  .addEventListener('click', todosAusentes)

document.getElementById('saveButton')!
  .addEventListener('click', guardar)

document.getElementById('cancelButton')!
  .addEventListener('click',
    () => {
      location.replace('clases.html')
    }
  )

async function init() {
  if (!dmg_id) {
    alert('Falta el ID de asignación docente ')
    location.replace('clases.html')
    return
  }

  const { data: dmg, error } = await supabase
    .from('vista_clases_docente')
    .select('grupo_id, materia_id, grupo, materia')
    .eq('dmg_id', dmg_id)
    .single()

  if (error) {
    alert(error.message)
    return
  }

  grupo_id = dmg.grupo_id
  materia_id = dmg.materia_id
  grupo = dmg.grupo
  materia = dmg.materia

  if (!grupo_id) return

  document.getElementById('titulo')!.innerText =
    `Asistencia ${hoy} | Grupo: ${grupo} - Materia: ${materia}`

  await fetchStudents(grupo_id)
  render()
}

async function fetchStudents(grupo_id: string) {
  const { data: estudiantes, error } = await supabase
    .from('estudiantes')
    .select('id, nombre, apellido')
    .eq('grupo_id', grupo_id)
    .eq('activo', true)
    .order('apellido', { ascending: true })
    .order('nombre', { ascending: true })

  if (error) {
    alert(error.message)
    return
  }

  estudiantes.forEach(e => {
    state.asistencias.set(e.id,{
      nombre: `${e.apellido} ${e.nombre}`,
      estado: EstadoAsistencia.Presente
    })
  })
}

// --------------------
// Render
// --------------------
function render() {
  const cont = document.getElementById('lista') as HTMLDivElement
  cont.innerHTML = ''

  state.asistencias.forEach((a, id) => {
    const fila = document.createElement('div')
    fila.className = 'fila'

    const nombre = document.createElement('span')
    nombre.className = 'nombre'
    nombre.textContent = a.nombre

    const estado = document.createElement('span')
    estado.className = `estado ${a.estado}`
    estado.textContent = " " + a.estado.toUpperCase()
    estado.dataset.id = id

    fila.appendChild(nombre)
    fila.appendChild(estado)
    cont.appendChild(fila)
  })
  document.body.style.opacity = "1"
}

document.addEventListener('click', e => {
  const target = e.target as HTMLElement | null
  if (!target) {
    return
  }
  if (target.classList.contains('estado')) {
    const id = target.dataset.id
    if(!id) return
    cambiarEstado(id)
  }
})

// --------------------
// Botones globales
// --------------------
function todosPresentes() {
  state.asistencias.forEach(a => a.estado = EstadoAsistencia.Presente)
  render()
}

function todosAusentes() {
  state.asistencias.forEach(a => a.estado = EstadoAsistencia.Ausente)
  render()
}

// --------------------
// Guardar
// --------------------
async function guardar() {
  if (!grupo_id || !materia_id) return
  const { error } = await supabase.rpc('guardar_asistencia_mvp', {
    p_grupo_id: grupo_id,
    p_materia_id: materia_id,
    p_fecha: hoy,
    p_asistencias: asistenciasToJSON(state.asistencias)
  })
  if (!error) {
    alert("Asistencia guardada correctamente")
    location.replace("clases.html")
  }
  else {
    alert(error.message)
  }
}


function cambiarEstado(id: string) {
  const asistencia = state.asistencias.get(id)
  if (!asistencia) return
  asistencia.estado = AsistenciaStateMachine.next(asistencia.estado)
  updateAttendanceNode(id, asistencia.estado)
}

function updateAttendanceNode(id: string, estado: EstadoAsistencia) {
  const el = document.querySelector(`[data-id="${id}"]`) as HTMLSpanElement
  if (!el) return
  el.className = `estado ${estado}`
  el.innerText = estado.toUpperCase()
}

function asistenciasToJSON(
  asistencias: Map<string,Asistencia>
  ): AsistenciaDTO[]{
  const dtos: AsistenciaDTO[] = []
  asistencias.forEach(
    (a,id) => {
      dtos.push(
        {
          estudiante_id: id,
          estado: a.estado
        }
      )
    }
  )
  return dtos
}