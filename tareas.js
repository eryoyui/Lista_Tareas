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

    const contenedorBotones = document.createElement("div");
    contenedorBotones.classList.add("botones");

    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.classList.add("editar");

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("eliminar");

    botonEditar.addEventListener("click", () => {
        if (botonEditar.textContent === "Editar") {
            textoTarea.contentEditable = "true";
            textoTarea.style.backgroundColor = "#f7f7f7";
            textoTarea.focus();
            botonEditar.textContent = "Guardar";
        } else {
            textoTarea.contentEditable = "false";
            textoTarea.style.backgroundColor = "transparent";
            botonEditar.textContent = "Editar";
        }
    });

    botonEliminar.addEventListener("click", () => {
        lista.removeChild(nuevaTarea);
    });

    contenedorBotones.appendChild(botonEditar);
    contenedorBotones.appendChild(botonEliminar);

    nuevaTarea.appendChild(textoTarea);
    nuevaTarea.appendChild(contenedorBotones);
    lista.appendChild(nuevaTarea);

    inputTarea.value = "";
});
