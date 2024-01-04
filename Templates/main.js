const imagenSticky = document.getElementById("imagenSticky");
const imagenHeader = document.getElementById("imagenHeader");

var alturaImagenHeader = imagenHeader.clientHeight;
var imagenPosicionInicial = imagenSticky.offsetTop;

window.addEventListener("scroll", function () {
  situarBotonesHorizontales();
});
window.addEventListener("load", function () {
  situarBotonesHorizontales();
});

function situarBotonesHorizontales() {
  if (window.scrollY > alturaImagenHeader) {
    imagenSticky.style.position = "fixed";
    imagenSticky.style.top = "8px";
  } else {
    imagenSticky.style.position = "absolute";
    imagenSticky.style.top = imagenPosicionInicial + "px";
    imagenSticky.style.right = "1px";
  }
}
