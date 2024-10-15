fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
        const productsContainer = document.getElementById("products_section")

        products.forEach(product => {
            const div = document.createElement("div")
            div.classList.add("product")
            div.innerHTML = `
                        <h3 class="h3">${product.title}</h3>
                        <img class="img" src="${product.image}" alt="${product.title}">
                        <p class="p_price">Precio: $${product.price}</p>
                        <button class="button" id="btn-${product.id}">Añadir al carrito <img src="/cart-add.svg" alt=""></button>
                        `
            productsContainer.appendChild(div)

            const button = document.getElementById(`btn-${product.id}`)
            button.addEventListener("click", () => {
                agregarAlCarrito(product)
            })
        })
    })


let listaDeCompra = []



function agregarAlCarrito(producto) {
    listaDeCompra.push(producto)
    // console.log("Producto añadido al carrito:", producto)
    Swal.fire({
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "bottom-end",
        icon: "success",
        title: "Producto añadido al carrito",
        text: `${producto.title} ha sido añadido al carrito.`,
    })
}

function resumenCompra() {
    let resumen = "<ul>"
    let total = 0

    listaDeCompra.forEach(producto => {
        resumen += `<li>${producto.title} - $${producto.price}</li>`
        total += producto.price
    })

    resumen += `</ul><p>Total: $${total.toFixed(2)}</p>`
    return resumen
}

function carritoDeCompras() {
    Swal.fire({
        title: "Formulario de Compra",
        html: `
    

      <input type="text" id="nombre" class="swal2-input" name="nombre" placeholder="Ingresa tu nombre" autofocus>
      

      <input type="tel" id="telefono" class="swal2-input" name="telefono" placeholder="Tel Ej. +34 600 123 456">
      

      <input type="text" id="direccion" class="swal2-input" name="direccion" placeholder="Calle y número">

      <hr>

      <h4>Resumen de Compra:</h4>
      ${resumenCompra()} 
        `,
        confirmButtonText: "Comprar",
        confirmButtonColor: "#006aff",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then((result) => {

        if (listaDeCompra.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "El carrito está vacío",
                text: "Añade productos al carrito antes de realizar la compra.",
                confirmButtonColor: "#006aff",
            })
            return
        } else if (result.isConfirmed) {
            let nombre = document.getElementById("nombre").value.trim()
            let telefono = parseInt(document.getElementById("telefono").value.trim())
            let direccion = document.getElementById("direccion").value.trim()

            if (isNaN(telefono) || telefono == "" || direccion == "" || nombre == "") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Datos no validos"
                })
                return
            }
            Swal.fire({
                icon: "success",
                title: "Listo, compra realizada",
                confirmButtonColor: "#006aff",
            })

            listaDeCompra = []

        }

    })
}

document.getElementById("btnCart").addEventListener("click", carritoDeCompras)