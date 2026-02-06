import { supabase } from './supabase.js'

const { data: { user } } = await supabase.auth.getUser()
if (!user) {
    window.location.href = 'index.html'
}

const { data: perfil } = await supabase
    .from('perfiles_usuarios')
    .select('*')
    .single()

document.getElementById('saludo').textContent =
    `Hola, ${perfil.nombre} ${perfil.apellido}`

const { data: clases } = await supabase
    .from('vista_clases_docente')
    .select('*')

const contClases = document.getElementById('clases')

if (clases.length === 0) {
    contClases.textContent = 'No tienes clases asignadas'
} else {
    clases.forEach(c => {
        const div = document.createElement('div')
        div.className = 'card'
        div.innerHTML = `
                  <strong>${c.grupo} - ${c.materia}</strong><br>
                  <button onclick="irAsistencia('${c.dmg_id}')">
                    Tomar asistencia
                  </button>
                `
        contClases.appendChild(div)
    })
}

const { data: gruposDir } = await supabase
    .from('grupos')
    .select('id, nombre')
    .eq('director_id', user.id)

const contDir = document.getElementById('direccion')

if (gruposDir.length === 0) {
    contDir.textContent = 'No eres director de grupo'
} else {
    gruposDir.forEach(g => {
        const div = document.createElement('div')
        div.className = 'card'
        div.innerHTML = `
                  <strong>${g.nombre}</strong><br>
                  <button onclick="irReporte('${g.id}')">
                    Ver reporte general
                  </button>
                `
        contDir.appendChild(div)
    })
}

window.irAsistencia = (dmg_id) => {
    window.location.href = `asistencia.html?dmg_id=${dmg_id}`
}

window.irReporte = (dmg_id) => {
    alert('Reporte aun no implementado')
}