document.addEventListener("DOMContentLoaded", function() {
    const cerrarSesionBtn = document.querySelector(".cerrar-sesion");

    cerrarSesionBtn.addEventListener("click", function() {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then(response => response.json()) 
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect; 
            } else {
                console.error('Error al cerrar sesión:', data.message);
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
    });

    fetch('/usuario/info')
    .then(response => response.json())
    .then(data => {
        if (data.usuario) {
            document.querySelector(".usuario-nombre").textContent = `User: ${data.usuario.nombre}`;
            document.querySelector(".usuario-hora").textContent = `Último ingreso: ${data.usuario.hora_ingreso}`;
        }
    })
    .catch(error => console.error('Error:', error));

    const misProyectosDiv = document.querySelector(".opciones .opcion:first-child"); 
    misProyectosDiv.addEventListener("click", function() {
        window.location.href = '/mis_proyectos';
    });

    const baseTicketsDiv = document.querySelector(".opciones .opcion:nth-child(2)"); 
    baseTicketsDiv.addEventListener("click", function() {
        window.location.href = '/base_tickets';
    });
});