const lista = document.getElementById("lista");
const botonAgregar = document.getElementById("agregar");
const inputTarea = document.getElementById("inputTarea");

botonAgregar.addEventListener("click", () => {
    const texto = inputTarea.value.trim();

    if (texto === "") {
        alert("Por favor, escribe una tarea antes de agregar.");
        return;
    }

    const nuevaTarea = document.createElement("li");

    const textoTarea = document.createElement("span");
    textoTarea.textContent = texto;

    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.classList.add("editar");

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("eliminar");

    botonEditar.addEventListener("click", () => {
        if (botonEditar.textContent === "Editar") {
            textoTarea.contentEditable = "true";  // Hacemos editable el texto
            textoTarea.style.backgroundColor = "#f7f7f7";  // Cambio de fondo para indicar edición
            textoTarea.focus();  // Focus en el campo editable
            botonEditar.textContent = "Guardar";
        } else {
            textoTarea.contentEditable = "false";  // Deshabilitamos la edición
            textoTarea.style.backgroundColor = "transparent";  // Restaura el fondo original
            botonEditar.textContent = "Editar";
        }
    });

    botonEliminar.addEventListener("click", () => {
        lista.removeChild(nuevaTarea);
    });

    nuevaTarea.appendChild(textoTarea);
    nuevaTarea.appendChild(botonEditar);
    nuevaTarea.appendChild(botonEliminar);
    lista.appendChild(nuevaTarea);

    inputTarea.value = "";
});
