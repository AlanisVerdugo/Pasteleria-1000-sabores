
document.addEventListener("DOMContentLoaded", function () {

  const dropdownUsuario = document.getElementById("dropdownUsuario");
  if (!dropdownUsuario) return; // por si alguna página aún no tiene el dropdown actualizado

  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (usuarioActivo) {
    // Hay sesión: muestra el nombre y la opción de cerrar sesión
    dropdownUsuario.innerHTML = `
      <li class="dropdown-item-texto">
        Sesión iniciada como<br><strong>${usuarioActivo.nombre}</strong>
      </li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="pedidos.html"><i class="bi bi-bag-check"></i> Mis Pedidos</a></li>
      <li><a class="dropdown-item" href="#" id="btnCerrarSesion"><i class="bi bi-box-arrow-right"></i> Cerrar Sesión</a></li>
    `;

    document.getElementById("btnCerrarSesion").addEventListener("click", (evento) => {
      evento.preventDefault();
      localStorage.removeItem("usuarioActivo");
      window.location.href = "home.html";
    });

  } else {
    // No hay sesión: muestra las opciones de entrar o crear cuenta
    dropdownUsuario.innerHTML = `
      <li><a class="dropdown-item" href="login.html"><i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión</a></li>
      <li><a class="dropdown-item" href="registro.html"><i class="bi bi-person-plus"></i> Crear Cuenta</a></li>
    `;
  }

});
