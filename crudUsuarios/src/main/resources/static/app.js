// URL base de la API REST (puedes cambiarla si cambias el endpoint en tu controlador)
const API = "/api/usuarios";

// Espera a que todo el contenido de la página esté cargado
document.addEventListener("DOMContentLoaded", () => {
    // Carga los usuarios existentes al cargar la página
    cargarUsuarios();

    // Agrega el evento al formulario para crear o actualizar usuarios
    document.getElementById("userForm").addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que se recargue la página al enviar el formulario

        // Obtiene los valores de los campos del formulario
        const id = document.getElementById("id").value;
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;

        // Crea un objeto usuario con esos datos
        const usuario = { nombre, correo };

        try{
            let res;
            // Si hay un ID, se actualiza (PUT), si no hay, se crea (POST)
            if (id) {
                res = await fetch(`${API}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(usuario)
                });
            } else {
                res = await fetch(API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(usuario)
                });
            }
            // si la respuesta tiene errores (por validaciones)
            if(!res.ok){
                const errorData = await res.json();
                mostrarErrores(errorData);
                return;
            }

            // Limpia el formulario y vuelve a cargar la tabla de usuarios
            document.getElementById("userForm").reset();
            cargarUsuarios();
        } catch (error) {
            alert("Error inesperado: " + error.message);
        }
    });
});

// Función que obtiene los usuarios del backend y los muestra en la tabla
async function cargarUsuarios() {
    const res = await fetch(API); // Llama al backend con GET
    const usuarios = await res.json(); // Convierte la respuesta JSON en un array
    const tabla = document.getElementById("tablaUsuarios");

    tabla.innerHTML = ""; // Limpia el contenido anterior de la tabla

    // Recorre la lista de usuarios y los añade a la tabla
    usuarios.forEach(u => {
        const tr = document.createElement("tr"); // Crea una fila <tr>
        tr.innerHTML = `
            <td>${u.nombre}</td>
            <td>${u.correo}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editar(${u.id}, '${u.nombre}', '${u.correo}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminar(${u.id})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(tr); // Añade la fila a la tabla
    });
}

// Rellena el formulario con los datos del usuario para editarlo
function editar(id, nombre, correo, edad) {
    document.getElementById("id").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("correo").value = correo;
}

// Elimina un usuario según su ID
async function eliminar(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" }); // Llama al backend con DELETE
    cargarUsuarios(); // Recarga la tabla después de eliminar
}

// manejo de errores
function mostrarErrores(errores) {
    const contenedorErrores = document.getElementById("errores");
    contenedorErrores.innerHTML = ""; // limpia errores anteriores

    for (const campo in errores) {
        const mensaje = document.createElement("p");
        mensaje.textContent = `${campo}: ${errores[campo]}`;
        mensaje.style.color = "red";
        contenedorErrores.appendChild(mensaje);
    }
}
