import { supabase } from './supabase.js'

async function main() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        location.replace('index.html')
        return
    }
    const { data: perfil } = await supabase
        .from('perfiles_usuarios')
        .select('*')
        .single()
    
    if(!perfil) return

    document.getElementById('saludo')!.textContent =
        `Hola, ${perfil.nombre} ${perfil.apellido}`

    const { data: clases } = await supabase
        .from('vista_clases_docente')
        .select('*')
        .eq('docente_id', user.id)

    const { data: grupos, error } = await supabase
        .from('grupos')
        .select('*')
        .order('nivel')
        .order('nombre')

    if(error) alert(error.message)
    

    const contClases = document.getElementById('clases')!
    if (!clases || clases.length === 0) {
        contClases.textContent = 'No tienes clases asignadas'
    } else {
        clases.forEach(c => {
            const div = document.createElement('div')
            div.className = 'card'

            const titulo = document.createElement('strong')
            titulo.innerText = `${c.grupo} - ${c.materia}`
            titulo.className = 'classInfo'

            const lineBreak = document.createElement('br')

            const btn = document.createElement('button')
            btn.innerText = 'Tomar asistencia'
            btn.onclick = () => irAsistencia(c.dmg_id)
            btn.className = "goAttendance"

            div.appendChild(titulo)
            div.appendChild(lineBreak)
            div.appendChild(btn)

            contClases.appendChild(div)
        })
    }

    const contDir = document.getElementById('direccion')!

    if (!grupos || grupos.length === 0) {
        contDir.textContent = 'No eres director de grupo'
    } else {
        grupos.forEach(g => {
            const div = document.createElement('div')
            div.className = 'card'

            const titulo = document.createElement('strong')
            titulo.innerText = `${g.nombre}`
            titulo.className = 'classInfo'

            const lineBreak = document.createElement('br')

            const btn = document.createElement('button')
            btn.innerText = 'Ver reporte general'
            btn.onclick = () => irReporte(g.id)
            btn.className = "goAttendance"

            div.appendChild(titulo)
            div.appendChild(lineBreak)
            div.appendChild(btn)
            contDir.appendChild(div)
        })
    }
    document.body.style.opacity = '1'

    function irAsistencia(dmg_id: string | null) {
        location.replace(`asistencia.html?dmg_id=${dmg_id}`)
    }

    function irReporte(dmg_id: string) {
        window.location.href = (`dashboard.html?grupo_id=${dmg_id}`)
    }
}

main()