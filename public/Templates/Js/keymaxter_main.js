const menuHorizontal = document.getElementById("menuHorizontal");
const imagenHeader = document.getElementById("imagenHeader");
const icons = document.getElementsByClassName("rss-icon");
const footer = document.querySelector("footer");

var menuHorizontalPosicionInicial = menuHorizontal.offsetTop;

window.addEventListener("scroll", function () {
  situarBotonesHorizontales();
});
window.addEventListener("load", function () {
  situarBotonesHorizontales();
});

for (const icon of icons) {
  icon.addEventListener("mouseover", function () {
    footer.style = "backdrop-filter: blur(2.5px)";
  });

  icon.addEventListener("mouseout", function () {
    footer.style = "none";
  });
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
