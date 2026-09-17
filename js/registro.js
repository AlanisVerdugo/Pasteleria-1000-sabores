
// se ejecuta cuando se envía el formulario
function envioFormulario() {
    let esValido = true;

    // Limpia los mensajes de errores anteriores
    document.querySelectorAll('.error-mensaje').forEach(span => span.textContent = '');

    // Obtiene los valores de los campos del formulario
    const nombre = document.getElementById('txtNombre');
    const correo = document.getElementById('txtCorreo');
    const fecha = document.getElementById('txtFecha');
    const correoDuoc = document.getElementById('txtCorreoDuoc');
    const pass = document.getElementById('txtPass');
    const passConfirm = document.getElementById('txtPassConfirm');
    const codigo = document.getElementById('txtCodigo');
    const terminos = document.getElementById('chkTerminos');

    // nombre no vacio
    if (nombre.value.trim() === '') {
        document.getElementById('errNombre').textContent = 'El nombre es obligatorio.';
        esValido = false;
    }

    // correo no vacio y formato válido
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo.value.trim() === '') {
        document.getElementById('errCorreo').textContent = 'El correo es obligatorio.';
        esValido = false;
    } else if (!regexCorreo.test(correo.value.trim())) {
        document.getElementById('errCorreo').textContent = 'Ingrese un correo válido.';
        esValido = false;
    }

    // fecha no vacia y mayor de 50 años
    let esMayor50 = false;
    if (fecha.value === '') {
        document.getElementById('errFecha').textContent = 'La fecha de nacimiento es obligatoria.';
        esValido = false;
    } else {
        // calculo edad
        const hoy = new Date();
        const Nacimiento = new Date(fecha.value);
        let edad = hoy.getFullYear() - Nacimiento.getFullYear();
        const mes = hoy.getMonth() - Nacimiento.getMonth();
        // mes/dia de cumpleaños
        if (mes < 0 || (mes === 0 && hoy.getDate() < Nacimiento.getDate())) {
            edad--;
        }
        // true o false
        esMayor50 = edad >= 50;
    }

    // correo duoc opcional, pero si se ingresa debe ser válido
    let esEstudianteDuoc = false;
    if (correoDuoc.value.trim() !== '') {
        if (!correoDuoc.value.trim().toLowerCase().endsWith('@duocuc.cl')) {
            document.getElementById('errCorreoDuoc').textContent = 'Ingrese un correo válido de Duoc UC.';
            esValido = false;
        } else {
            esEstudianteDuoc = true;
        }
    }

    // Validación de contraseña
    if (pass.value.length < 6) {
        document.getElementById('errPass').textContent = 'mínimo 6 caracteres.';
        esValido = false;
    }

    if (pass.value !== passConfirm.value) {
        document.getElementById('errPassConfirm').textContent = 'Las contraseñas no coinciden.';
        esValido = false;
    }

    // Validación de código de descuento
    const codigoIngresado = codigo.value.trim().toUpperCase();
    const tieneDescuento10 = codigoIngresado === 'FELICES50';

    // Validación aceptacion de términos y condiciones
    if (!terminos.checked) {
        document.getElementById('errTerminos').textContent = 'Debe aceptar los términos y condiciones.';
        esValido = false;
    }

    // si algo falla, no se envía el formulario (no continua)
    if (!esValido) {
        return false;
    }

    // armar objeto con los datos del formulario
    const nuevoUsuario = {
        nombre: nombre.value.trim(),
        correo: correo.value.trim(),
        fecha: fecha.value,
        correoDuoc: correoDuoc.value.trim(),
        password: pass.value,
        esMayor50: esMayor50,
        esEstudianteDuoc: esEstudianteDuoc,
        tieneDescuento10: tieneDescuento10
    };

    // Recupera lista de usuarios guardados (o arranca lista vacia al ser el primero)
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioExiste = usuarios.some(u => u.correo.toLowerCase() === nuevoUsuario.correo.toLowerCase());
    if (usuarioExiste) {
        document.getElementById('errCorreo').textContent = 'El correo ya está registrado.';
        return false;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    windows.location.href = 'login.html';

    // Evita que el formulario se envíe de la manera tradicional
    return false; 

}

























