const lista = document.getElementById("lista");
const botonAgregar = document.getElementById("agregar");
const inputTarea = document.getElementById("inputTarea");
const selectCategoria = document.getElementById("categoria");
const filtroCat = document.getElementById("filtroCat");
const botonFiltrar = document.getElementById("filtrar");
const botonVaciar = document.getElementById("vaciar");

let tareas = [];
let idCounter = 1;

botonVaciar.addEventListener("click", () => {
    tareas = [];
    mostrarTareas();
});

botonAgregar.addEventListener("click", () => {
    const texto = inputTarea.value.trim();
    const categoria = selectCategoria.value;

    if (texto === "") {
        alert("Por favor, escribe una tarea antes de agregar.");
        return;
    }

    const nuevaTarea = {
        id: idCounter++,
        texto: texto,
        categoria: categoria
    };

    tareas.push(nuevaTarea);
    mostrarTareas();
    inputTarea.value = "";
});

function mostrarTareas(listaTareas = tareas) {
    lista.innerHTML = "";

    listaTareas.forEach(tarea => {
        const nuevaTareaElement = document.createElement("li");

        const textoTarea = document.createElement("span");
        textoTarea.textContent = tarea.texto;

        const categoriaTarea = document.createElement("span");
        categoriaTarea.textContent = " [" + tarea.categoria + "]";
        categoriaTarea.style.fontStyle = "italic";
        categoriaTarea.style.color = "#607d8b";
        categoriaTarea.style.marginLeft = "10px";

        const contenedorBotones = document.createElement("div");
        contenedorBotones.classList.add("botones");

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.classList.add("editar");

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("eliminar");

        const botonExportarJSON = document.createElement("button");
        botonExportarJSON.textContent = "Exportar JSON";
        botonExportarJSON.addEventListener("click", () => exportarTarea(tarea.id, "json"));

        const botonExportarCSV = document.createElement("button");
        botonExportarCSV.textContent = "Exportar CSV";
        botonExportarCSV.addEventListener("click", () => exportarTarea(tarea.id, "csv"));

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
                tarea.texto = textoTarea.textContent.trim(); // Actualiza el texto si se edita
            }
        });

        botonEliminar.addEventListener("click", () => {
            tareas = tareas.filter(t => t !== tarea);
            mostrarTareas();
        });

        contenedorBotones.appendChild(botonEditar);
        contenedorBotones.appendChild(botonEliminar);
        contenedorBotones.appendChild(botonExportarJSON);
        contenedorBotones.appendChild(botonExportarCSV);

        nuevaTareaElement.appendChild(textoTarea);
        nuevaTareaElement.appendChild(categoriaTarea);
        nuevaTareaElement.appendChild(contenedorBotones);

        lista.appendChild(nuevaTareaElement);
    });
}

botonFiltrar.addEventListener("click", () => {
    const categoriaSeleccionada = filtroCat.value;
    const tareasFiltradas = categoriaSeleccionada === "todos"
        ? tareas
        : tareas.filter(t => t.categoria === categoriaSeleccionada);
    mostrarTareas(tareasFiltradas);
});

function exportarTarea(id, tipo) {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;

    if (tipo === "json") {
        const blob = new Blob([JSON.stringify(tarea, null, 2)], { type: "application/json" });
        descargarArchivo(blob, `tarea-${id}.json`);
    } else if (tipo === "csv") {
        const encabezado = "ID,Texto,Categoria\n";
        const fila = `${tarea.id},"${tarea.texto}","${tarea.categoria}"\n`;
        const blob = new Blob([encabezado + fila], { type: "text/csv" });
        descargarArchivo(blob, `tarea-${id}.csv`);
    }
}

function descargarArchivo(blob, nombreArchivo) {
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = nombreArchivo;
    enlace.click();
    URL.revokeObjectURL(url);
}

mostrarTareas();

const inputImportar = document.getElementById("importar");

inputImportar.addEventListener("change", (evento) => {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = () => {
        try {
            const tareasImportadas = JSON.parse(lector.result);
            if (Array.isArray(tareasImportadas)) {
                tareas = tareasImportadas;
                idCounter = tareas.length ? Math.max(...tareas.map(t => t.id)) + 1 : 1; // Asigna el próximo ID disponible
                mostrarTareas();
            } else {
                alert("El archivo JSON no contiene una lista de tareas válida.");
            }
        } catch (error) {
            alert("Hubo un error al leer el archivo JSON.");
        }
    };
    lector.readAsText(archivo);
});

