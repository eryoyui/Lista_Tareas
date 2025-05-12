const lista = document.getElementById("lista");
const botonAgregar = document.getElementById("agregar");
const inputTarea = document.getElementById("inputTarea");
const selectCategoria = document.getElementById("categoria");
const filtroCat = document.getElementById("filtroCat");
const botonFiltrar = document.getElementById("filtrar");
const botonVaciar = document.getElementById("vaciar");
const tiempoEstimado = document.getElementById("tiempoEstimado");
const unidadTiempoEstimado = document.getElementById("unidadTiempoEstimado");
const tiempoReal = document.getElementById("tiempoReal");
const unidadTiempoReal = document.getElementById("unidadTiempoReal");

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
        categoria: categoria,
        tiempoEstimado: {
            valor: parseInt(tiempoEstimado.value) || 0,
            unidad: unidadTiempoEstimado.value
        },
        tiempoReal: {
            valor: parseInt(tiempoReal.value) || 0,
            unidad: unidadTiempoReal.value
        }
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

        const tiempoEstimadoElement = document.createElement("span");
        tiempoEstimadoElement.textContent = ` ⏳ ${tarea.tiempoEstimado.valor}${tarea.tiempoEstimado.unidad === 'dias' ? ' días' : tarea.tiempoEstimado.unidad === 'horas' ? ' horas' : ' minutos'}`;
        tiempoEstimadoElement.style.color = "#4CAF50";
        tiempoEstimadoElement.style.marginLeft = "10px";

        const tiempoRealElement = document.createElement("span");
        tiempoRealElement.textContent = ` ⏱️ ${tarea.tiempoReal.valor}${tarea.tiempoReal.unidad === 'dias' ? ' días' : tarea.tiempoReal.unidad === 'horas' ? ' horas' : ' minutos'}`;
        tiempoRealElement.style.color = "#2196F3";
        tiempoRealElement.style.marginLeft = "10px";

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
                const inputTexto = document.createElement("input");
                inputTexto.type = "text";
                inputTexto.value = tarea.texto;
                textoTarea.replaceWith(inputTexto);

                const inputTiempoEst = document.createElement("input");
                inputTiempoEst.type = "number";
                inputTiempoEst.value = tarea.tiempoEstimado.valor;
                inputTiempoEst.style.width = "60px";

                const selectUnidadEst = document.createElement("select");
                ["minutos", "horas", "dias"].forEach(u => {
                    const opt = document.createElement("option");
                    opt.value = u;
                    opt.textContent = u.charAt(0).toUpperCase() + u.slice(1);
                    if (u === tarea.tiempoEstimado.unidad) opt.selected = true;
                    selectUnidadEst.appendChild(opt);
                });
                tiempoEstimadoElement.replaceChildren(inputTiempoEst, selectUnidadEst);

                const inputTiempoReal = document.createElement("input");
                inputTiempoReal.type = "number";
                inputTiempoReal.value = tarea.tiempoReal.valor;
                inputTiempoReal.style.width = "60px";

                const selectUnidadReal = document.createElement("select");
                ["minutos", "horas", "dias"].forEach(u => {
                    const opt = document.createElement("option");
                    opt.value = u;
                    opt.textContent = u.charAt(0).toUpperCase() + u.slice(1);
                    if (u === tarea.tiempoReal.unidad) opt.selected = true;
                    selectUnidadReal.appendChild(opt);
                });
                tiempoRealElement.replaceChildren(inputTiempoReal, selectUnidadReal);

                botonEditar.textContent = "Guardar";
            } else {
                const inputTexto = nuevaTareaElement.querySelector("input[type='text']");
                const inputTiempoEst = tiempoEstimadoElement.querySelector("input[type='number']");
                const selectUnidadEst = tiempoEstimadoElement.querySelector("select");
                const inputTiempoReal = tiempoRealElement.querySelector("input[type='number']");
                const selectUnidadReal = tiempoRealElement.querySelector("select");

                tarea.texto = inputTexto.value.trim();
                tarea.tiempoEstimado.valor = parseInt(inputTiempoEst.value) || 0;
                tarea.tiempoEstimado.unidad = selectUnidadEst.value;
                tarea.tiempoReal.valor = parseInt(inputTiempoReal.value) || 0;
                tarea.tiempoReal.unidad = selectUnidadReal.value;

                mostrarTareas();
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
        nuevaTareaElement.appendChild(tiempoEstimadoElement);
        nuevaTareaElement.appendChild(tiempoRealElement);
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
        const encabezado = "ID,Texto,Categoria,Tiempo Estimado Valor,Tiempo Estimado Unidad,Tiempo Real Valor,Tiempo Real Unidad\n";
        const fila = `${tarea.id},"${tarea.texto}","${tarea.categoria}",${tarea.tiempoEstimado.valor},${tarea.tiempoEstimado.unidad},${tarea.tiempoReal.valor},${tarea.tiempoReal.unidad}\n`;
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
                idCounter = tareas.length ? Math.max(...tareas.map(t => t.id)) + 1 : 1;
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
