// Función Registrar Usuario 

// const registrarUsuario = () => {
//     usuario = prompt( 'Bienvenido  \nIngrese su nombre de usuario ');
//     mail = prompt ('ingrese su email');

//     console.log(`nombre de usuario: ${usuario} \nmail ${mail} `);
//     return usuario, mail 
// }

// const mostrarUsuario = () => alert(`Bienvenido ${usuario} `);


// Función Buscar Producto y agregar al carrito

// let buscarProducto = () => {
//     productoABuscar = prompt('Ingrese el producto que estás buscando');
//     productoEncontrado = false;
    
//     for (producto of productos) {
//         if (producto == productoABuscar) {
//             productoEncontrado = true;
//         }
//     } 

//     if(productoEncontrado) {
//         alert(`Encontramos el producto ${productoABuscar} y el mismo fue añadido al carrito`);
//         carrito.push(productoABuscar)

//     } else {
//         alert(`Lo siento, no tenemos disponible el producto ${productoABuscar}`)
//     }

//     return carrito
// }

// Funcion Eliminar Producto del  carrito 


/********************************************  
 * 
 * Inicialización del Programa
 * 
********************************************/

// const productos = ['Sushi Ebi', 'Sushi Maguro', 'Sushi Uni', 'Sushi California', 'Sushi Unagi', 'Sushi Ikura', 'Nigiri Variado', 'Sushi Inari', 'Sushi Biwi', 'Sushi Saba', 'Nigiri Hotate', 'Sushi Tobiko']

// let carrito = [] ; 

// registrarUsuario(); 
// mostrarUsuario();
// buscarProducto();


/********************************************  
 * 
 * Probando Eventos
 * 
********************************************/
const carrito3 = $("#carrito")

$(document).ready(function() {
    
    const carrito = document.getElementById('carrito');
    const carrito2 = $("#carrito");
    const sushis = document.getElementById('lista-sushi');
    const listaSushi = $('#lista-carrito tbody');
    const vaciarCarritoBtn =  document.getElementById('vaciar-carrito');

    cargarEventListeners();

    function cargarEventListeners() {
        sushis.addEventListener('click', comprarSushi);
        carrito.addEventListener('click', eliminarSushi);
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
        document.addEventListener('DOMContentLoaded', leerLocalStorage)
    }

    function comprarSushi(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')) {
            const sushi = e.target.parentElement.parentElement;
            LeerDatosSushi(sushi);
        }
    }

    function LeerDatosSushi(sushi){
        const infoSushi = {
            imagen: sushi.querySelector('img').src,
            tituto: sushi.querySelector('h4').textContent,
            precio: sushi.querySelector('.precio span').textContent,
            id:     sushi.querySelector('a').getAttribute('date-id')
        }
        insertarCarrito(infoSushi); 
    }

    function insertarCarrito(sushi) {
        const row = document.createElement('tr');
        row.innerHTML= `
            <td>
                <img src="${sushi.imagen}" width=100> 
            </td>
            <td>${sushi.titulo}</td>
            <td>${sushi.precio}</td>
            <td>
                <a href="#" class="borrar-sushi" data-id="${sushi.id}">X</a>
            </td>
        `;
        listaSushi.appendChild(row);
        guardarSushiLocalStorage(sushi);
    }

    function eliminarSushi(e) {
        e.preventDefault();

        let sushi, sushiId;

        if( e.target.classList.contains('borrar-sushi')) {
            e.target.parentElement.parentElement.remove();
            sushi = e.target.parentElement.parentElement;
            sushiId = sushi.querySelector('a').getAttribute('data-id');
        }
        eliminarSushiLocalStorage(sushiId);
    }

    function vaciarCarrito() {
        while(listaSushi.firstChild){
            listaSushi.removeChild(listaSushi.firstChild)
        }

        vaciarLocalStorage();
        return false;
    }

    function guardarSushiLocalStorage(sushi) {
        let sushis;
        sushis = obtenerSushisLocalStorage();
        sushis.push(sushi);
        localStorage.setItem('sushis', JSON.stringify(sushis))
    }

    function obtenerSushisLocalStorage() {
        let sushisLs;

        if(localStorage.getItem('sushis') === null){
            sushisLs = [];
        } else {
            sushisLs = JSON.parse(localStorage.getItem('sushis'))
        }
        return sushisLs;
    }

    function leerLocalStorage() {
        let sushisLs;

        sushisLs = obtenerSushisLocalStorage();

        sushisLs.forEach(function(sushi){
            const row = document.createElement('tr');
            row.innerHTML= `
            <td>
                <img src="${sushi.imagen}" width=100> 
            </td>
            <td>${sushi.titulo}</td>
            <td>${sushi.precio}</td>
            <td>
                <a href="#" class="borrar-sushi" data-id="${sushi.id}">X</a>
            </td>
            `;

            listaSushi.appendChild(row);
        });
    }

    function eliminarSushiLocalStorage (sushi) {
        let sushisLs;

        sushisLs = obtenerSushisLocalStorage();

        sushisLs.forEach(function (sushisLs, index){
            if(sushisLs.id === sushi){
                sushisLs.splice(index, 1)
            }
        });

        localStorage.setItem('sushis', JSON.stringify(sushisLs));
    }

    function vaciarLocalStorage() {
        localStorage.clear();
    }

})