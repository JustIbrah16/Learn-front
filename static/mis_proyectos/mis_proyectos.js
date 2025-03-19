const cargarProyectos = async () => {
    try {
        const respuesta = await fetch('/mis_proyectos/acceso');
        const data = await respuesta.json();

        if (respuesta.ok) {
            const proyectosContainer = document.getElementById('proyectos-container');
            proyectosContainer.innerHTML = ''; 

            if (data.proyectos.length > 0) {
                data.proyectos.forEach(proyecto => {
                    const proyectoElemento = document.createElement('div'); 
                    proyectoElemento.classList.add('proyecto-card'); 

                    proyectoElemento.innerHTML = `
                        <h3>${proyecto.nombre}</h3>
                        <p>${proyecto.descripcion}</p>
                        <button class="btn-resumen" data-id="${proyecto.id}">Resumen</button>
                    `;

                    proyectosContainer.appendChild(proyectoElemento); 
                });

                document.querySelectorAll('.btn-resumen').forEach(boton => {
                    boton.addEventListener('click', function() {
                        const proyectoId = this.getAttribute('data-id');
                        cargarResumenTickets(proyectoId);
                    });
                });

            } else {
                proyectosContainer.innerHTML = '<p>No tienes proyectos asociados.</p>';
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
    }
};



const filtrarProyectos = async () => {
    const nombreFiltro = document.getElementById('input-filtro').value;
    const url = `/mis_proyectos/listar?nombre=${nombreFiltro}`; 

    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();

        if (respuesta.ok) {
            const proyectosContainer = document.getElementById('proyectos-container');
            proyectosContainer.innerHTML = '';

            data.forEach(proyecto => {
                const proyectoElemento = `
                    <div class="proyecto-card">
                        <h3>${proyecto.nombre}</h3>
                        <p>${proyecto.descripcion}</p>
                    </div>
                `;
                proyectosContainer.innerHTML += proyectoElemento;
            });
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error al filtrar proyectos:', error);
    }
};


const cargarResumenTickets = async (proyectoId) => {
    try {
        const respuesta = await fetch(`/mis_proyectos/resumen_tickets?proyecto_id=${proyectoId}`);
        const data = await respuesta.json();

        if (respuesta.ok) {
            const resumenContainer = document.getElementById('resumen-tickets-container');
            resumenContainer.innerHTML = ''; 

            data.resumen.forEach(item => {
                if (item.proyecto_id == proyectoId) { 
                    const resumenElemento = `
                        <div class="resumen-card">
                            <h3>${item.proyecto_nombre}</h3>
                            <p>Abiertos: ${item.abiertos}</p>
                            <p>Pendientes: ${item.pendientes}</p>
                            <p>Atendidos: ${item.atendidos}</p>
                            <p>Cerrados: ${item.cerrados}</p>
                            <p>Devueltos: ${item.devueltos}</p>
                        </div>
                    `;
                    resumenContainer.innerHTML += resumenElemento;
                }
            });

        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error al cargar resumen tickets:', error);
    }
};