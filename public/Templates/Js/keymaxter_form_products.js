const tipoAccion = document.getElementById("tipo-accion");

var textoBoton = document.getElementById("buttonText");

window.addEventListener("load", function () {
  borrarBanner();
});
window.addEventListener("resize", function () {
  borrarBanner();
});

tipoAccion.addEventListener("change", function () {
  textoBoton = document.getElementById("buttonText");
  if (tipoAccion.value == "1") {
    textoBoton.textContent = "Modificar";
  } else {
    textoBoton.textContent = "Añadir";
  }
});

function borrarBanner() {
  const anchoVentana = document.documentElement.clientWidth;
  const altoVentana = document.documentElement.clientHeight;
  const imagenHeader = document.getElementById("headerPrincipal");
  let formulario = document.querySelector("form");
  let titulo = document.querySelector("h1");
  if (anchoVentana <= 950) {
    imagenHeader.style.display = "none";
    if (anchoVentana > altoVentana) {
      titulo.style.fontSize = "0.875rem";
      formulario.style.overflowY = "scroll";
      formulario.style.gridTemplateRows = "none";
      formulario.style.marginBottom = "0.3rem";
    } else {
    }
  } else {
    imagenHeader.style.display = "flex";
    titulo.style.fontSize = "1.2rem";
    formulario.style.overflowY = "hidden";
    formulario.style.marginBottom = "none";
  }
}
