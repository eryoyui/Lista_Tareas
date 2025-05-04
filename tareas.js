const lista = document.getElementById("lista");
const botonAgregar = document.getElementById("agregar");
const inputTarea = document.getElementById("inputTarea");
const selectCategoria = document.getElementById("categoria");
const filtroCat = document.getElementById("filtroCat");
const botonFiltrar = document.getElementById("filtrar");

let tareas = [];

botonAgregar.addEventListener("click", () => {
    const texto = inputTarea.value.trim();
    const categoria = selectCategoria.value;

    if (texto === "") {
        alert("Por favor, escribe una tarea antes de agregar.");
        return;
    }

    const nuevaTarea = {
        texto: texto,
        categoria: categoria
    };

    tareas.push(nuevaTarea);
    mostrarTareas();
    inputTarea.value = "";
});

function mostrarTareas() {
    lista.innerHTML = "";

    tareas.forEach(tarea => {
        const nuevaTareaElement = document.createElement("li");

        const textoTarea = document.createElement("span");
        textoTarea.textContent = tarea.texto;

        const categoriaTarea = document.createElement("span");
        categoriaTarea.textContent = tarea.categoria;
        categoriaTarea.style.fontStyle = "italic";
        categoriaTarea.style.color = "#607d8b";

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
            tareas = tareas.filter(t => t !== tarea);
            mostrarTareas();
        });

        nuevaTareaElement.appendChild(textoTarea);
        nuevaTareaElement.appendChild(categoriaTarea);
        nuevaTareaElement.appendChild(contenedorBotones);
        contenedorBotones.appendChild(botonEditar);
        contenedorBotones.appendChild(botonEliminar);

        lista.appendChild(nuevaTareaElement);
    });
}

botonFiltrar.addEventListener("click", () => {
    const categoriaSeleccionada = filtroCat.value;

    let tareasFiltradas;
    if (categoriaSeleccionada === "todos") {
        tareasFiltradas = tareas;
    } else {
        tareasFiltradas = tareas.filter(tarea => tarea.categoria === categoriaSeleccionada);
    }

    lista.innerHTML = "";
    tareasFiltradas.forEach(tarea => {
        const nuevaTareaElement = document.createElement("li");

        const textoTarea = document.createElement("span");
        textoTarea.textContent = tarea.texto;

        const categoriaTarea = document.createElement("span");
        categoriaTarea.textContent = tarea.categoria;
        categoriaTarea.style.fontStyle = "italic";
        categoriaTarea.style.color = "#607d8b";

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
            tareas = tareas.filter(t => t !== tarea);
            mostrarTareas();
        });

        nuevaTareaElement.appendChild(textoTarea);
        nuevaTareaElement.appendChild(categoriaTarea);
        nuevaTareaElement.appendChild(contenedorBotones);
        contenedorBotones.appendChild(botonEditar);
        contenedorBotones.appendChild(botonEliminar);

        lista.appendChild(nuevaTareaElement);
    });
});

mostrarTareas();
