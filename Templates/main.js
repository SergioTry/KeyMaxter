const imagenSticky = document.getElementById("imagenSticky");
const imagenHeader = document.getElementById("imagenHeader");

var alturaImagenHeader = imagenHeader.clientHeight;
var imagenPosicionInicial = imagenSticky.offsetTop;

window.addEventListener("scroll", function () {
  if (window.scrollY > alturaImagenHeader) {
    imagenSticky.style.position = "fixed";
    imagenSticky.style.top = "8px";
  } else {
    imagenSticky.style.position = "absolute";
    imagenSticky.style.top = imagenPosicionInicial + "px";
  }
});

(function () {
  if (!window.StyleFix) return;
  if (hasxmldatauri()) return;

  // Test unescaped XML data uri
  function hasxmldatauri() {
    var img = new Image();
    datauri =
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0 1,1" fill="#000"></svg>';
    img.src = datauri;
    return img.width == 1 && img.height == 1;
  }

  StyleFix.register(function (css) {
    return css.replace(
      RegExp(/url\(\'data:image\/svg\+xml,(.*)\'\)/gi),
      function ($0, svg) {
        return "url('data:image/svg+xml," + escape(svg) + "')";
      }
    );
  });
})();

/* Radial Gradient Syntax fix */
StyleFix.register(function (css, raw) {
  if (PrefixFree.functions.indexOf("radial-gradient") > -1) {
    css = css.replace(
      /radial-gradient\(([a-z-\s]+\s+)?at ([^,]+)(?=,)/g,
      function ($0, shape, center) {
        return "radial-gradient(" + center + (shape ? ", " + shape : "");
      }
    );
  }

  return css;
});
