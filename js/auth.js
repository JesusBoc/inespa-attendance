import { supabase } from './supabase.js';
async function main() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        location.replace('clases.html');
    }
    else {
        const btn = document.getElementById('loginBtn');
        btn.addEventListener('click', login);
        document.body.style.opacity = '1';
    }
}
async function login() {
    async () => {
        const emailField = document.querySelector('#email');
        const passwordField = document.querySelector('#password');
        const { error } = await supabase.auth.signInWithPassword({
            email: emailField.value,
            password: passwordField.value
        });
        if (error) {
            alert(error.message);
        }
        else {
            alert("Bienvenido");
            location.replace('clases.html');
        }
    };
}
main();
//# sourceMappingURL=auth.js.map