// Función para validar el formulario
function validarFormulario(event) {
    // Evitar que el formulario se envíe
    event.preventDefault();

    // Obtener valores de los campos
    const contrasena = document.getElementById('contrasena').value;
    const confirmarContrasena = document.getElementById('confirmarContrasena').value;

    // Verificar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden.");
        return false;
    }

    // Si las contraseñas coinciden, redirigir al usuario a la otra página
    // Redirigir a la página de "Client Connect"
    window.location.href = ""; // Cambia esta URL según sea necesario
    return true;
}

