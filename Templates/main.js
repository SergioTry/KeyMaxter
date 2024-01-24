const imagenSticky = document.getElementById("menuHorizontal");
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
  if (window.getComputedStyle(imagenHeader).display != "none") {
    if (window.scrollY > alturaImagenHeader) {
      imagenSticky.style.position = "fixed";
      imagenSticky.style.top = "8px";
    } else {
      imagenSticky.style.position = "absolute";
      imagenSticky.style.right = "1px";
      imagenSticky.style.top = imagenPosicionInicial + "px";
    }
  } else {
    imagenSticky.style.position = "fixed";
    imagenSticky.style.top = "8px";
    imagenSticky.style.right = "0px";
  }
}
