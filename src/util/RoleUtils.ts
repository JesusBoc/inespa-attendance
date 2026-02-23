import { supabase } from "../supabase"

export type UserRole = 'docente' | 'coordinador' | 'admin'

export async function runRouteGuard() {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        location.replace('index.html')
        return null
    }

    const { data: perfil } = await supabase
        .from('perfiles_usuarios')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!perfil) {
        location.replace('index.html')
        return null
    }

    const role = perfil.rol as UserRole
    const currentPage = window.location.pathname.split('/').pop()

    // --- Reglas de navegación ---
    switch (currentPage) {

        case 'clases.html':
            if (role === 'admin') {
                redirectToDefault(role)
                return null
            }
            break

        case 'adminPanel.html':
            if (role !== 'admin') {
                redirectToDefault(role)
                return null
            }
            break

        case 'dashboard.html':
            if (role === 'admin') {
                redirectToDefault(role)
                return null
            }
            break
        case 'asistencia.html':
            if (role !== 'docente') {
                redirectToDefault(role)
                return null
            }
            break
        default:
            throw new Error("This page is not guarded yet");
            
    }

    return { user, perfil }
}

function defaultPageFor(role: UserRole) {
    switch (role) {
        case 'admin': return 'adminPanel.html'
        case 'coordinador': return 'clases.html'
        case 'docente': return 'clases.html'
    }
}

function redirectToDefault(role: UserRole) {
    location.replace(defaultPageFor(role))
}