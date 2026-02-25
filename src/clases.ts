import { supabase } from './supabase.js'
import { LogoutButton } from './util/LogoutButton.js'
import { runRouteGuard, type UserRole } from './util/RoleUtils.js'

const session = await runRouteGuard()
const user = session?.user
const perfil = session?.perfil

const header = document.getElementsByTagName('header').item(0)

if(!header) throw new Error("No header in this document");
const logout = new LogoutButton()

header.appendChild(logout.render())

async function main() {
    if (!user || !perfil) return
    const greetingHeader = document.getElementById('saludo')!
    greetingHeader.innerText = `Bienvenido/a, ${perfil.nombre} ${perfil.apellido}`
    const rol = perfil.rol as UserRole
    if(rol == 'docente'){
        await renderSection(
            'clasesMain',
            'clases',
            'Mis clases',
            renderClasses
        )
    }
    if(rol == 'docente' || rol == 'coordinador'){
        await renderSection(
            'clasesMain',
            'reportes',
            'Reportes',
            renderDashboards
        )
    }
    document.body.style.opacity = '1'
}

async function renderSection(rootid: string, id: string, title: string, callback: (a: HTMLElement) => Promise<void> | void) {
    const root = document.getElementById(rootid)
    if (!root) throw new Error(`Element ${rootid} not found`);

    const section = document.createElement('section')
    section.id = id

    const sectionTitle = document.createElement('h3')
    sectionTitle.textContent = title
    sectionTitle.className = 'sectionTitle'
    section.appendChild(sectionTitle)

    await callback(section)
    root.appendChild(section)
}

function createCard(
    title: string,
    buttonText: string,
    btnCallback: () => any
) {
    const div = document.createElement('div')
    div.className = 'card'

    const titulo = document.createElement('strong')
    titulo.innerText = `${title}`
    titulo.className = 'classInfo'

    const lineBreak = document.createElement('br')
    const btn = document.createElement('button')

    btn.innerText = buttonText
    btn.onclick = btnCallback
    btn.className = "goAttendance"

    div.appendChild(titulo)
    div.appendChild(lineBreak)
    div.appendChild(btn)

    return div
}

async function renderClasses(section: HTMLElement) {
    if (!user) return
    const classContainer = document.createElement('div')
    classContainer.className = 'cardContainer'
    const { data: clases, error } = await supabase
        .from('vista_clases_docente')
        .select('*')
        .eq('docente_id', user.id)
    if (error) {
        alert(error.message)
        return
    }
    if (!clases || clases.length === 0) {
        classContainer.textContent = 'No tienes clases asignadas'
        return
    }
    clases.forEach(
        c => {
            const card = createCard(
                `${c.grupo} - ${c.materia}`,
                'Tomar asistencia',
                () => irAsistencia(c.dmg_id ?? '')
            )
            classContainer.appendChild(card)
        }
    )
    section.appendChild(classContainer)
}

async function renderDashboards(section: HTMLElement) {
    if (!user) return
    const classContainer = document.createElement('div')
    classContainer.className = 'cardContainer'
    const { data: grupos, error } = await supabase
        .from('grupos')
        .select('*')
        .order('nivel')
        .order('nombre')
    if (error) {
        alert(error.message)
        return
    }
    if (!grupos || grupos.length === 0) {
        classContainer.textContent = 'No puedes ver reportes'
        return
    }
    grupos.forEach(
        g => {
            const card = createCard(
                g.nombre,
                'Ver reporte',
                () => irReporte(g.id)
            )
            classContainer.appendChild(card)
        }
    )
    section.appendChild(classContainer)
}

function irAsistencia(dmg_id: string) {
    if(dmg_id == '') return
    location.replace(`asistencia.html?dmg_id=${dmg_id}`)
}

function irReporte(dmg_id: string) {
    window.location.href = (`dashboard.html?grupo_id=${dmg_id}`)
}
main()