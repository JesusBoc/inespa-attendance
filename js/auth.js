import { supabase } from './supabase.js'

const btn = document.getElementById('loginBtn')

const { data: { user } } = await supabase.auth.getUser()
if (user) {
  window.location.href = 'clases.html'
} else {
  document.body.style.opacity = '1'
}

btn.addEventListener('click', async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert(error.message)
  } else {
    alert("Bienvenido")
    window.location.href = 'clases.html'
  }
})
