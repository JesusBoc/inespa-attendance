import { supabase } from './supabase.js'

// --------------------
// Configuración
// --------------------
const estados = ['presente', 'ausente', 'tarde', 'excusa']
let asistencias = []

const params = new URLSearchParams(window.location.search)

const dmg_id = params.get('dmg_id')

let grupo_id = null
let materia_id = null
let grupo = null
let materia = null

const hoy = new Date().toISOString().slice(0, 10)

// --------------------
// Utilidades
// --------------------
function siguienteEstado(actual) {
  const i = estados.indexOf(actual)
  return estados[(i + 1) % estados.length]
}

// --------------------
// Inicialización
// --------------------
document.addEventListener('DOMContentLoaded', init)

async function init() {
  if (!dmg_id) {
    alert('Falta el ID de asignación docente ')
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

  document.getElementById('titulo').innerText =
    `Asistencia ${hoy} | Grupo: ${grupo} - Materia: ${materia}`

  await dummyClass()
  render()
}

async function dummyClass() {
  const {data: estudiantes, error} = await supabase
    .from('estudiantes')
    .select('id, nombre, apellido')
    .eq('grupo_id', grupo_id)
  
  if (error) {
    alert(error.message)
    return
  }

  asistencias = estudiantes.map(e => ({
    estudiante_id: e.id,
    nombre: `${e.apellido} ${e.nombre}`,
    estado: 'presente'
  }))
}

// --------------------
// Render
// --------------------
function render() {
  const cont = document.getElementById('lista')
  cont.innerHTML = ''

  asistencias.forEach((a, i) => {
    const fila = document.createElement('div')
    fila.className = 'fila'

    const nombre = document.createElement('span')
    nombre.className = 'nombre'
    nombre.textContent = a.nombre

    const estado = document.createElement('span')
    estado.className = `estado ${a.estado}`
    estado.textContent = " " + a.estado.toUpperCase()
    estado.dataset.index = i

    fila.appendChild(nombre)
    fila.appendChild(estado)
    cont.appendChild(fila)
  })
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('estado')) {
    const i = e.target.dataset.index
    cambiarEstado(i)
  }
})

// --------------------
// Cambiar estado
// --------------------
window.cambiarEstado = function (i) {
  asistencias[i].estado = siguienteEstado(asistencias[i].estado)
  render()
}

// --------------------
// Botones globales
// --------------------
window.todosPresentes = function () {
  asistencias.forEach(a => a.estado = 'presente')
  render()
}

window.todosAusentes = function () {
  asistencias.forEach(a => a.estado = 'ausente')
  render()
}

// --------------------
// Guardar
// --------------------
window.guardar = async function () {
  const {error} = await supabase.rpc('guardar_asistencia_mvp',{
    p_grupo_id: grupo_id,
    p_materia_id: materia_id,
    p_fecha: hoy,
    p_asistencias: asistencias
  })
  if(!error){
    alert("Asistencia guardada correctamente")
    window.location.href = "clases.html"
  }
}