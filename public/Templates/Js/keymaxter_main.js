const menuHorizontal = document.getElementById("menuHorizontal");
const imagenHeader = document.getElementById("imagenHeader");
const botonesTeclados = document.getElementsByClassName("boton-teclados");
const botonesSwitchs = document.getElementsByClassName("boton-switchs");
const botonesSimulador = document.getElementsByClassName("boton-simulador");
const mainElement = document.querySelector("main");

document.addEventListener("DOMContentLoaded", function () {
  for (botonT of botonesTeclados) {
    botonT.addEventListener("click", cargarProductos);
  }
  for (botonS of botonesSwitchs) {
    botonS.addEventListener("click", cargarProductos);
  }
  for (botonSimu of botonesSimulador) {
    botonSimu.addEventListener("click", mostrarSimulador);
  }
  mainElement.addEventListener("click", outputClicado);

  window.addEventListener("scroll", situarBotonesHorizontales);
  window.addEventListener("load", situarBotonesHorizontales);
});

var menuHorizontalPosicionInicial = menuHorizontal.offsetTop;

function mostrarSimulador() {
  const enlaceSimulador =
    '<iframe src="https://keyboardsimulator.xyz/" title="Contenido incrustado" allowfullscreen="true" ></iframe>';
  mainElement.innerHTML = enlaceSimulador;
}

function esElementoNoVisible(elemento) {
  var rect = elemento.getBoundingClientRect();
  return rect.bottom <= 0 || rect.top >= window.innerHeight;
}

function situarBotonesHorizontales() {
  if (window.getComputedStyle(imagenHeader).display != "none") {
    if (esElementoNoVisible(imagenHeader)) {
      menuHorizontal.style.position = "fixed";
      menuHorizontal.style.top = "0.25rem";
      menuHorizontal.style.right = "0.5rem";
    } else {
      menuHorizontal.style.position = "absolute";
      menuHorizontal.style.right = "0.5rem";
      menuHorizontal.style.top = menuHorizontalPosicionInicial + "px";
    }
  } else {
    menuHorizontal.style.position = "fixed";
    menuHorizontal.style.top = "1rem";
    menuHorizontal.style.right = "0.5rem";
  }
}

async function cargarProductos() {
  const mainElement = document.querySelector("main");
  const respProductos = await fetch("/teclados", { method: "GET" });
  const respMarcas = await fetch("/tecladosMarcas", { method: "GET" });
  const productos = await respProductos.json();
  const prefix = "/Images/Products/";

  productos.forEach((producto) => {
    console.log(producto);
    if (producto.image1) {
      producto.image1 = prefix + producto.image1;
      if (producto.image2) {
        producto.image2 = prefix + producto.image2;
      }
    }
  });

  const marcas = await respMarcas.json();
  const html = crearTeclados({ marcas: marcas, productos: productos });
  mainElement.innerHTML = html;
}

async function outputClicado(evt) {
  if (evt.target.classList.contains("delete-button")) {
    const item = evt.target.closest(".grid-box");
    const id = item.dataset.id;

    const confir = confirm("¿Estás seguro de que quierers borrarlo?");
    if (confir == true) {
      const resp = await fetch(`/teclados/${id}`, {
        method: "DELETE",
        body: id,
      });
      const data = await resp.text();
      if (resp.ok) {
        cargarProductos();
      } else {
        alert(resp.status + ": " + data);
      }
    }
  }
}
