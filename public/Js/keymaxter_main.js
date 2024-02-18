const menuHorizontal = document.getElementById("menuHorizontal");
const imagenHeader = document.getElementById("imagenHeader");
let settingItem = document.getElementById("settingsItem");
const imagenSideBar = document.getElementById("imagenSideBar");
const audioEtiqueta = document.querySelector("audio");
const menuDesplegable = document.getElementById("menuDesplegable");
const botonesInfo = document.getElementsByClassName("boton-info");
const botonesTeclados = document.getElementsByClassName("boton-teclados");
const botonesSwitchs = document.getElementsByClassName("boton-switchs");
const botonesSimulador = document.getElementsByClassName("boton-simulador");
const output = document.querySelector("output");
const loader = document.getElementById("loader");

let ordenAscendente;
let ordenDescendente;
let selectFiltro;

let isAdmin;

document.addEventListener("DOMContentLoaded", function () {
  validateAdmin();
  imagenSideBar.addEventListener("click", reproducirSonido);
  for (botonI of botonesInfo) {
    botonI.addEventListener("click", mostrarInformacion);
  }
  for (botonT of botonesTeclados) {
    botonT.addEventListener("click", getTeclados);
  }
  for (botonS of botonesSwitchs) {
    botonS.addEventListener("click", getSwitchs);
  }
  for (botonSimu of botonesSimulador) {
    botonSimu.addEventListener("click", mostrarSimulador);
  }
  output.addEventListener("click", outputClicado);
  window.addEventListener("load", situarBotonesHorizontales);
  window.addEventListener("scroll", situarBotonesHorizontales);
  window.addEventListener("wheel", situarBotonesHorizontales);
});

function validateAdmin() {
  const urlParams = new URLSearchParams(window.location.search);
  const adminValue = urlParams.get("admin");
  if (adminValue) {
    if (adminValue == "true") {
      isAdmin = true;
      settingItem.style.display = "block";
    } else {
      alert("Username or password incorrects");
    }
  }
}

var menuHorizontalPosicionInicial = menuHorizontal.offsetTop;

async function mostrarInformacion() {
  cerrarDesplegable();
  try {
    const response = await fetch("info.html");
    const html = await response.text();
    output.innerHTML = html;
  } catch (error) {
    alert("Error al cargar el archivo:", error);
  }
}

function mostrarSimulador() {
  cerrarDesplegable();
  const enlaceSimulador =
    '<iframe src="https://keyboardsimulator.xyz/" title="Contenido incrustado" allowfullscreen="true" ></iframe>';
  output.innerHTML = enlaceSimulador;
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
    menuHorizontal.style.right = "0.5rem";
    menuHorizontal.style.top = "3rem";
  }
}

async function getTeclados() {
  cerrarDesplegable();
  loader.className = "cargando";
  const respProductos = await fetch("/teclados", { method: "GET" });
  const respAutores = await fetch("/teclados/autores", { method: "GET" });
  await cargarProductos(respProductos, respAutores);
}

async function getSwitchs() {
  cerrarDesplegable();
  const respSwitchs = await fetch("/switchs", { method: "GET" });
  const respMarcas = await fetch("/switchs/marcas", { method: "GET" });
  await cargarProductos(respSwitchs, respMarcas);
}

async function cargarProductos(respProductos, respFiltro) {
  let productos = await respProductos.json();
  productos = asociarImagenesProductos(productos);

  const filtros = await respFiltro.json();

  const html = isAdmin
    ? crearTeclados({ filtros: filtros, productos: productos, admin: true })
    : crearTeclados({ filtros: filtros, productos: productos, admin: false });
  loader.className = "";
  output.innerHTML = html;

  ordenAscendente = document.getElementById("ordenAsc");
  ordenDescendente = document.getElementById("ordenDes");
  selectFiltro = document.getElementById("filtro");
  selectFiltro.addEventListener("change", aplicarFiltro);
  ordenAscendente.addEventListener("change", aplicarFiltro);
  ordenDescendente.addEventListener("change", aplicarFiltro);
}

async function aplicarFiltro(evt) {
  // Este método valida si el radio pulsado está ya seleccionado
  // y en caso positivo lo deselecciona.
  validarActivacion(evt);
  loader.className = "cargando";
  const direccion =
    selectFiltro.dataset.name == "autor" ? "teclados" : "switchs";
  let ruta;
  if (ordenAscendente.checked) {
    ruta = `/${direccion}?orden=0`;
    if (selectFiltro.value != "") {
      ruta = ruta + `&${selectFiltro.dataset.name}=${selectFiltro.value}`;
    }
  } else {
    if (ordenDescendente.checked) {
      ruta = `/${direccion}?orden=1`;
      if (selectFiltro.value != "") {
        ruta = ruta + `&${selectFiltro.dataset.name}=${selectFiltro.value}`;
      }
    } else {
      ruta = `/${direccion}`;
      if (selectFiltro.value != "") {
        ruta = ruta + `?${selectFiltro.dataset.name}=${selectFiltro.value}`;
      }
    }
  }
  const articleLocation = document.querySelector("article");
  const respProductos = await fetch(ruta, { method: "GET" });
  let productos = await respProductos.json();

  productos = asociarImagenesProductos(productos);

  const html = isAdmin
    ? cargarTecladosFiltrados({ productos: productos, admin: true })
    : cargarTecladosFiltrados({ productos: productos, admin: false });
  loader.className = "";
  articleLocation.innerHTML = html;
}

function asociarImagenesProductos(productos) {
  const prefix = "/Media/Products/";
  productos.forEach((producto) => {
    if (producto.image1) {
      producto.image1 = prefix + producto.image1;
      if (producto.image2) {
        producto.image2 = prefix + producto.image2;
      }
    }
  });
  return productos;
}

function cerrarDesplegable() {
  if (menuDesplegable.checked) {
    menuDesplegable.checked = false;
  }
}

function validarActivacion(evt) {
  const checkBoxSelected = evt.target.id;
  if (checkBoxSelected == "ordenAsc") {
    if (ordenDescendente.checked) {
      ordenDescendente.checked = false;
    }
  } else {
    if (ordenAscendente.checked) {
      ordenAscendente.checked = false;
    }
  }
}

async function outputClicado(evt) {
  if (evt.target.classList.contains("delete-button")) {
    const item = evt.target.closest(".grid-box");
    const id = item.dataset.id;

    const direccion =
      selectFiltro.dataset.name == "autor" ? "teclados" : "switchs";
    const confir = confirm("¿Estás seguro de que quieres borrarlo?");
    console.log(direccion);
    if (confir == true) {
      const resp = await fetch(`/${direccion}/${id}`, {
        method: "DELETE",
        body: id,
      });
      const data = await resp.text();
      if (resp.ok) {
        aplicarFiltro(evt);
      } else {
        alert(resp.status + ": " + data);
      }
    }
  }
}

function reproducirSonido() {
  audioEtiqueta.setAttribute("src", "/Media/cat_sound.mp3");
  audioEtiqueta.play();
}
