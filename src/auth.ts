import { UserService } from './adminPanel/services/UserService.js'
import { supabase } from './supabase.js'
import { redirectToDefault, runRouteGuard } from './util/RoleUtils.js'

async function main() {
  await runRouteGuard()

  const btn = document.getElementById('loginBtn')!
  btn.addEventListener('click', login)
  document.body.style.opacity = '1'
}

async function login() {
  const emailField = document.querySelector<HTMLInputElement>('#email')!
  const passwordField = document.querySelector<HTMLInputElement>('#password')!
  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailField.value,
    password: passwordField.value
  })

  if (error) {
    alert(error.message)
  } else {
    const userRole = await UserService.getUserRole(data.user.id)
    alert("Bienvenido")
    redirectToDefault(userRole)
  }
}

main()