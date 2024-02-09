const menuHorizontal = document.getElementById("menuHorizontal");
const imagenHeader = document.getElementById("imagenHeader");
const botonProductos = document.getElementById("boton-productos");
const botonSimulador = document.getElementById("boton-simulador");

botonProductos.addEventListener("click", async function () {
  const mainElement = document.querySelector("main");
  const respProductos = await fetch("/teclados", { method: "GET" });
  const respMarcas = await fetch("/tecladosMarcas", { method: "GET" });
  const productos = await respProductos.json();
  const prefix = "/Images/Products/";
  //TODO
  productos[3].image1 = prefix + productos[3].image1;

  const marcas = await respMarcas.json();
  const html = crearTeclados({ marcas: marcas, productos: productos });
  mainElement.innerHTML = html;
});
botonSimulador.addEventListener("click", async function () {
  const mainElement = document.querySelector("main");
  const enlaceSimulador =
    '<iframe src="https://keyboardsimulator.xyz/" title="Contenido incrustado" allowfullscreen="true" ></iframe>';
  mainElement.innerHTML = enlaceSimulador;
});

var menuHorizontalPosicionInicial = menuHorizontal.offsetTop;

window.addEventListener("scroll", function () {
  situarBotonesHorizontales();
});
window.addEventListener("load", function () {
  situarBotonesHorizontales();
});

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
