import { supabase } from './supabase.js'

const btn = document.getElementById('loginBtn')
const output = document.getElementById('output')

btn.addEventListener('click', async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    output.textContent = error.message
  } else {
    output.textContent = 'Login correcto'
    console.log(data.user)
    window.location.href = 'clases.html'
  }
})
