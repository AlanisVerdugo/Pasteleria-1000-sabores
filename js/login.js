

// Se ejecuta cuando el usuario envía el formulario de login
function iniciarSesion() {
    let esValido = true;

    // Limpia todos los mensajes de error de intentos anteriores
    document.querySelectorAll('.error-mensaje').forEach(span => span.textContent = '');

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const recordarme = document.getElementById('remember');

    // Validación: correo obligatorio
    if (email.value.trim() === '') {
        document.getElementById('errEmail').textContent = 'El correo es obligatorio.';
        esValido = false;
    }

    // Validación: contraseña obligatoria
    if (password.value === '') {
        document.getElementById('errPassword').textContent = 'La contraseña es obligatoria.';
        esValido = false;
    }

    // Si falta algún campo, no sigue
    if (!esValido) {
        return false;
    }

    // Busca la lista de usuarios guardada por el registro
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Busca un usuario cuyo correo coincida (sin importar mayúsculas/minúsculas)
    const usuarioEncontrado = usuarios.find(u => u.correo.toLowerCase() === email.value.trim().toLowerCase());

    // Si no existe el correo, o la contraseña no coincide, muestra un error genérico
    // (No decimos cuál de los dos falló, por seguridad: así nadie puede "adivinar" qué correos están registrados)
    if (!usuarioEncontrado || usuarioEncontrado.password !== password.value) {
        document.getElementById('errLogin').textContent = 'Correo o contraseña incorrectos.';
        return false;
    }

    // Login correcto: guarda quién es el usuario activo
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));

    // Si marcó "Recordarme", no hace falta lógica extra: localStorage ya persiste
    // aunque cierre el navegador. Lo dejamos aquí como referencia por si más adelante
    // quieren diferenciarlo de una sesión que dure solo hasta cerrar la pestaña (sessionStorage).

    // Redirige a la página de pedidos, como acordamos
    window.location.href = 'pedidos.html';

    return false;
}

// Mostrar/ocultar la contraseña al hacer clic en el ícono del ojo
const togglePassword = document.getElementById('togglePassword');
const inputPassword = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const esVisible = inputPassword.type === 'text';
    inputPassword.type = esVisible ? 'password' : 'text';
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
});

















