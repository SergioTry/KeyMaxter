const menuHorizontal = document.getElementById("menuHorizontal");
const imagenHeader = document.getElementById("imagenHeader");
const boton = document.getElementById("boton1");

boton.addEventListener("click", function () {
  const mainElement = document.querySelector("main");
  const nuevoContenidoHTML = `
            <search class="grid-search">
  <form action="aplicar a la vista">
    <fieldset>
      <p>Filtros:</p>
      <span>
        <label
          >Precio ascendente<input
            type="radio"
            name="ordenar_precio"
            value="radio1"
        /></label>
        <label
          >Precio descendente<input
            type="radio"
            name="ordenar_precio"
            value="radio2"
        /></label>
        <div>
          Marca:
          <select id="marca">
            <option value="marca1">Marca 1</option>
            <option value="marca2">Marca 2</option>
            <option value="marca3">Marca 3</option>
          </select>
        </div>
      </span>
    </fieldset>
  </form>
</search>
<article class="grid-layout-content">
  <div class="grid-box">
    <img
      class="imagen-teclado"
      src="/public/Images/teclado.avif"
      alt="Icono de rss"
    />

    <p class="modelo-teclado">Mars Gaming</p>
    <a class="enlace-teclado">Enlace</a>
    <p class="precio-teclado">Puntuación</p>
    <div class="me-gusta-contenedor">
      <label class="like">
        <input type="checkbox" />
        <div class="hearth"></div>
      </label>
    </div>
  </div>
  <div class="grid-box">
    <img
      class="imagen-teclado"
      src="/public/Images/teclado.avif"
      alt="Icono de rss"
    />

    <p class="modelo-teclado">Mars Gaming</p>
    <a class="enlace-teclado">Enlace</a>
    <p class="precio-teclado">Puntuación</p>
    <div class="me-gusta-contenedor">
      <label class="like">
        <input type="checkbox" />
        <div class="hearth"></div>
      </label>
    </div>
  </div>
  <div class="grid-box">
    <img
      class="imagen-teclado"
      src="/public/Images/teclado.avif"
      alt="Icono de rss"
    />

    <p class="modelo-teclado">Mars Gaming</p>
    <a class="enlace-teclado">Enlace</a>
    <p class="precio-teclado">Puntuación</p>
    <div class="me-gusta-contenedor">
      <label class="like">
        <input type="checkbox" />
        <div class="hearth"></div>
      </label>
    </div>
  </div>
  <div class="grid-box">
    <img
      class="imagen-teclado"
      src="/public/Images/teclado.avif"
      alt="Icono de rss"
    />

    <p class="modelo-teclado">Mars Gaming</p>
    <a class="enlace-teclado">Enlace</a>
    <p class="precio-teclado">Puntuación</p>
    <div class="me-gusta-contenedor">
      <label class="like">
        <input type="checkbox" />
        <div class="hearth"></div>
      </label>
    </div>
  </div>
  <div class="grid-box">
    <img
      class="imagen-teclado"
      src="/public/Images/teclado.avif"
      alt="Icono de rss"
    />

    <p class="modelo-teclado">Mars Gaming</p>
    <a class="enlace-teclado">Enlace</a>
    <p class="precio-teclado">Puntuación</p>
    <div class="me-gusta-contenedor">
      <label class="like">
        <input type="checkbox" />
        <div class="hearth"></div>
      </label>
    </div>
  </div>
  <div class="grid-box">
    <img
      class="imagen-teclado"
      src="/public/Images/teclado.avif"
      alt="Icono de rss"
    />

    <p class="modelo-teclado">Mars Gaming</p>
    <a class="enlace-teclado">Enlace</a>
    <p class="precio-teclado">Puntuación</p>
    <div class="me-gusta-contenedor">
      <label class="like">
        <input type="checkbox" />
        <div class="hearth"></div>
      </label>
    </div>
  </div>
  <div class="grid-box">
    <img
      class="imagen-teclado"
      src="/public/Images/teclado.avif"
      alt="Icono de rss"
    />

    <p class="modelo-teclado">Mars Gaming</p>
    <a class="enlace-teclado">Enlace</a>
    <p class="precio-teclado">Puntuación</p>
    <div class="me-gusta-contenedor">
      <label class="like">
        <input type="checkbox" />
        <div class="hearth"></div>
      </label>
    </div>
  </div>
  <div class="grid-box">
    <img
      class="imagen-teclado"
      src="/public/Images/teclado.avif"
      alt="Icono de rss"
    />

    <p class="modelo-teclado">Mars Gaming</p>
    <a class="enlace-teclado">Enlace</a>
    <p class="precio-teclado">Puntuación</p>
    <div class="me-gusta-contenedor">
      <label class="like">
        <input type="checkbox" />
        <div class="hearth"></div>
      </label>
    </div>
  </div>
  <div class="grid-box">
    <img
      class="imagen-teclado"
      src="/public/Images/teclado.avif"
      alt="Icono de rss"
    />

    <p class="modelo-teclado">Mars Gaming</p>
    <a class="enlace-teclado">Enlace</a>
    <p class="precio-teclado">Puntuación</p>
    <div class="me-gusta-contenedor">
      <label class="like">
        <input type="checkbox" />
        <div class="hearth"></div>
      </label>
    </div>
  </div>
</article>
`;
  mainElement.innerHTML = nuevoContenidoHTML;
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
