// Mostrar el modal y su contenido
function mostrarModal(titulo, contenido) {
    document.getElementById('modal-content').innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${titulo}</h2>
        ${contenido}
    `;
    document.getElementById('modal-template').classList.remove('hidden');
}

// Cerrar el modal
function cerrarModal() {
    document.getElementById('modal-template').classList.add('hidden');
}

// Mostrar cargando
function mostrarCargando(mensaje) {
    Swal.fire({
        title: mensaje,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

// Notificar éxito
function notificarExito(mensaje) {
    Swal.fire({
        icon: 'success',
        title: 'Completado',
        text: mensaje,
    });
}

// Notificar error
function notificarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
    });
}

// Ejercicio 1: Productos Disponibles y Retirados
// Ejercicio 1: Productos disponibles y retirados
let productosDisponibles = [];
let productosRetirados = [];

function mostrarProductosModal() {
    let contenido = `
        <label for="nombreProducto" class="block text-lg font-bold mb-2 text-neon-green">Nombre del Producto:</label>
        <input id="nombreProducto" type="text" class="bg-dark-gray text-neon-blue px-3 py-2 rounded w-full" placeholder="Ingrese nombre del producto" />
        <button class="bg-neon-green text-black px-4 py-2 rounded mt-4" onclick="agregarProducto()">Agregar Producto</button>
        <button class="bg-neon-red text-black px-4 py-2 rounded mt-4 ml-2" onclick="retirarProducto()">Retirar Producto</button>
        <h3 class="text-xl font-bold text-neon-blue mt-4">Productos Disponibles:</h3>
        <ul id="lista-productos-disponibles" class="list-disc list-inside text-neon-green"></ul>
        <h3 class="text-xl font-bold text-neon-red mt-4">Productos Retirados:</h3>
        <ul id="lista-productos-retirados" class="list-disc list-inside text-neon-red"></ul>
    `;
    mostrarModal("Productos Disponibles y Retirados", contenido);
    actualizarListasProductos();
}
function agregarProducto() {
    let nombre = document.getElementById('nombreProducto').value;
    if (!nombre) {
        notificarError("Ingrese un nombre de producto.");
        return;
    }

    let cantidad = Math.floor(Math.random() * 10) + 1;
    let precio = (Math.random() * 100).toFixed(2);
    let producto = { nombre, cantidad, precio };

    mostrarCargando("Agregando producto...");
    setTimeout(() => {
        productosDisponibles.push(producto);
        actualizarListasProductos();
        notificarExito(`Producto ${nombre} añadido.`);
    }, 1000);
}

function retirarProducto() {
    let nombre = document.getElementById('nombreProducto').value;
    let indice = productosDisponibles.findIndex(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (indice === -1) {
        notificarError("Producto no encontrado.");
        return;
    }

    mostrarCargando("Retirando producto...");
    setTimeout(() => {
        let producto = productosDisponibles.splice(indice, 1)[0];
        productosRetirados.push(producto);
        actualizarListasProductos();
        notificarExito(`Producto ${producto.nombre} retirado.`);
    }, 1000);
}

function actualizarListasProductos() {
    let listaDisponibles = document.getElementById('lista-productos-disponibles');
    let listaRetirados = document.getElementById('lista-productos-retirados');

    listaDisponibles.innerHTML = productosDisponibles.length > 0
        ? productosDisponibles.map(p => `<li>${p.nombre} - Cantidad: ${p.cantidad}, Precio: $${p.precio}</li>`).join('')
        : "<li>No hay productos disponibles.</li>";

    listaRetirados.innerHTML = productosRetirados.length > 0
        ? productosRetirados.map(p => `<li>${p.nombre} - Cantidad: ${p.cantidad}, Precio: $${p.precio}</li>`).join('')
        : "<li>No hay productos retirados.</li>";
}

// Ejercicio 2: Pares e Impares
function mostrarParesImparesModal() {
    let contenido = `
        <label for="cantidad" class="block text-lg font-bold mb-2 text-neon-green">Cantidad de números aleatorios:</label>
        <input id="cantidad" type="number" class="bg-dark-gray text-neon-blue px-3 py-2 rounded w-full" placeholder="Ingrese un número" />
        <button class="bg-neon-green text-black px-4 py-2 rounded mt-4" onclick="generarNumeros()">Generar</button>
    `;
    mostrarModal("Pares e Impares", contenido);
}

function generarNumeros() {
    let cantidad = document.getElementById('cantidad').value;
    if (!cantidad || cantidad < 1) {
        notificarError("Ingrese una cantidad válida de números.");
        return;
    }

    mostrarCargando("Generando números...");
    setTimeout(() => {
        let pares = [];
        let impares = [];
        for (let i = 0; i < cantidad; i++) {
            let numero = Math.floor(Math.random() * 100) + 1;
            if (numero % 2 === 0) {
                pares.push(numero);
            } else {
                impares.push(numero);
            }
        }

        let contenido = `
            <h3 class="text-xl font-bold mt-4">Números Pares:</h3>
            <ul class="list-disc list-inside">${pares.map(num => `<li>${num}</li>`).join('')}</ul>
            <h3 class="text-xl font-bold mt-4">Números Impares:</h3>
            <ul class="list-disc list-inside">${impares.map(num => `<li>${num}</li>`).join('')}</ul>
        `;
        mostrarModal("Resultados de Pares e Impares", contenido);
        notificarExito("Generación completada.");
    }, 1000);
}

// Otros ejercicios se implementarían de manera similar...
// Ejercicio 3: Aprobados y Reprobados
let aprobados = [];
let reprobados = [];

function mostrarAprobadosModal() {
    let contenido = `
        <label for="nombre" class="block text-lg font-bold mb-2 text-neon-green">Nombre del estudiante:</label>
        <input id="nombre" type="text" class="bg-dark-gray text-neon-blue px-3 py-2 rounded w-full" placeholder="Ingrese nombre" />
        <label for="calificacion" class="block text-lg font-bold mb-2 mt-4 text-neon-blue">Calificación:</label>
        <input id="calificacion" type="number" class="bg-dark-gray text-neon-blue px-3 py-2 rounded w-full" placeholder="Ingrese calificación (0-10)" />
        <button class="bg-neon-green text-black px-4 py-2 rounded mt-4" onclick="agregarEstudiante()">Agregar Estudiante</button>
        <h3 class="text-xl font-bold text-neon-blue mt-4">Estudiantes Aprobados:</h3>
        <ul id="lista-aprobados" class="list-disc list-inside text-neon-green"></ul>
        <h3 class="text-xl font-bold text-neon-red mt-4">Estudiantes Reprobados:</h3>
        <ul id="lista-reprobados" class="list-disc list-inside text-neon-red"></ul>
    `;
    mostrarModal("Aprobados y Reprobados", contenido);
    actualizarListasEstudiantes();
}
function agregarEstudiante() {
    let nombre = document.getElementById('nombre').value;
    let calificacion = document.getElementById('calificacion').value;

    if (!nombre || calificacion === '' || calificacion < 0 || calificacion > 10) {
        notificarError("Ingrese un nombre y una calificación válida (0-10).");
        return;
    }

    mostrarCargando("Agregando estudiante...");
    setTimeout(() => {
        if (calificacion >= 7) {
            aprobados.push({ nombre, calificacion });
        } else {
            reprobados.push({ nombre, calificacion });
        }
        actualizarListasEstudiantes();
        notificarExito(`Estudiante ${nombre} añadido.`);
    }, 1000);
}

function actualizarListasEstudiantes() {
    let listaAprobados = document.getElementById('lista-aprobados');
    let listaReprobados = document.getElementById('lista-reprobados');

    listaAprobados.innerHTML = aprobados.map(e => `<li>${e.nombre} - ${e.calificacion}</li>`).join('');
    listaReprobados.innerHTML = reprobados.map(e => `<li>${e.nombre} - ${e.calificacion}</li>`).join('');
}
// Ejercicio 4: Eliminar y Ordenar Productos
let productos = [];

function mostrarEliminarProductosModal() {
    let contenido = `
        <label for="producto" class="block text-lg font-bold mb-2 text-neon-green">Nombre del Producto:</label>
        <input id="producto" type="text" class="bg-dark-gray text-neon-blue px-3 py-2 rounded w-full" placeholder="Ingrese nombre del producto" />
        <button class="bg-neon-green text-black px-4 py-2 rounded mt-4" onclick="agregarProductoLista()">Agregar Producto</button>
        <button class="bg-neon-red text-black px-4 py-2 rounded mt-4 ml-2" onclick="eliminarProducto()">Eliminar Producto</button>
        <button class="bg-neon-blue text-black px-4 py-2 rounded mt-4 ml-2" onclick="ordenarProductos()">Ordenar Productos</button>
        <h3 class="text-xl font-bold text-neon-blue mt-4">Lista de Productos:</h3>
        <ul id="lista-todos-productos" class="list-disc list-inside text-neon-green"></ul>
    `;
    mostrarModal("Eliminar y Ordenar Productos", contenido);
    actualizarListaProductos();
}

function agregarProductoLista() {
    let producto = document.getElementById('producto').value;
    if (!producto) {
        notificarError("Ingrese un nombre de producto.");
        return;
    }

    mostrarCargando("Agregando producto...");
    setTimeout(() => {
        productos.push(producto);
        actualizarListaProductos();
        notificarExito(`Producto ${producto} añadido.`);
    }, 1000);
}

function eliminarProducto() {
    let producto = document.getElementById('producto').value;
    let indice = productos.indexOf(producto);

    if (indice === -1) {
        notificarError("Producto no encontrado.");
        return;
    }

    mostrarCargando("Eliminando producto...");
    setTimeout(() => {
        productos.splice(indice, 1);
        actualizarListaProductos();
        notificarExito(`Producto ${producto} eliminado.`);
    }, 1000);
}

function ordenarProductos() {
    mostrarCargando("Ordenando productos...");
    setTimeout(() => {
        productos.sort();
        actualizarListaProductos();
        notificarExito("Productos ordenados alfabéticamente.");
    }, 1000);
}

function actualizarListaProductos() {
    let listaProductos = document.getElementById('lista-todos-productos');
    listaProductos.innerHTML = productos.map(p => `<li>${p}</li>`).join('');
}
// Ejercicio 5: Listar Palabras por Letra
let palabras = [];

function mostrarPalabrasModal() {
    let contenido = `
        <label for="palabra" class="block text-lg font-bold mb-2 text-neon-green">Palabra:</label>
        <input id="palabra" type="text" class="bg-dark-gray text-neon-blue px-3 py-2 rounded w-full" placeholder="Ingrese una palabra" />
        <button class="bg-neon-green text-black px-4 py-2 rounded mt-4" onclick="agregarPalabra()">Agregar Palabra</button>
        <label for="letra" class="block text-lg font-bold mb-2 mt-4 text-neon-blue">Filtrar por Letra:</label>
        <input id="letra" type="text" maxlength="1" class="bg-dark-gray text-neon-blue px-3 py-2 rounded w-full" placeholder="Ingrese una letra" />
        <button class="bg-neon-blue text-black px-4 py-2 rounded mt-4" onclick="filtrarPorLetra()">Filtrar</button>
        <h3 class="text-xl font-bold text-neon-blue mt-4">Palabras Filtradas:</h3>
        <ul id="lista-palabras" class="list-disc list-inside text-neon-green"></ul>
    `;
    mostrarModal("Listar Palabras por Letra", contenido);
    actualizarListaPalabras();
}

function agregarPalabra() {
    let palabra = document.getElementById('palabra').value;
    if (!palabra) {
        notificarError("Ingrese una palabra.");
        return;
    }

    mostrarCargando("Agregando palabra...");
    setTimeout(() => {
        palabras.push(palabra);
        actualizarListaPalabras();
        notificarExito(`Palabra ${palabra} añadida.`);
    }, 1000);
}

function filtrarPorLetra() {
    let letra = document.getElementById('letra').value.toLowerCase();
    if (!letra || letra.length !== 1) {
        notificarError("Ingrese una letra válida.");
        return;
    }

    let palabrasFiltradas = palabras.filter(p => p.toLowerCase().startsWith(letra));
    let listaPalabras = document.getElementById('lista-palabras');
    listaPalabras.innerHTML = palabrasFiltradas.length > 0
        ? palabrasFiltradas.map(p => `<li>${p}</li>`).join('')
        : "<li>No se encontraron palabras con esa letra.</li>";
}

function actualizarListaPalabras() {
    let listaPalabras = document.getElementById('lista-palabras');
    listaPalabras.innerHTML = palabras.map(p => `<li>${p}</li>`).join('');
      }
