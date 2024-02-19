const TIEMPO_DEBOUNCE_MS = 700;

let tipoAccion;
let tipoProducto;
let boton;

let inputImg;
let inputModelo;
let inputAutor;
let inputPrecio;
let inputColor;
let inputEnlace;

let imgLocation;
let newImage;
let form;
let radio1;
let radio2;

let image1;
let image2;

document.addEventListener("DOMContentLoaded", function () {
  tipoAccion = document.getElementById("tipoAccion");
  tipoProducto = document.getElementById("tipoProducto");
  boton = document.getElementById("button");
  inputImg = document.getElementById("image");
  inputModelo = document.getElementById("modelo");
  inputAutor = document.getElementById("autor");
  inputPrecio = document.getElementById("precio");
  inputColor = document.getElementById("color");
  inputEnlace = document.getElementById("enlace");
  imgLocation = document.getElementById("image-location");
  newImage = document.getElementById("newImage");
  form = document.querySelector("form");
  radio1 = document.getElementById("radio1");
  radio2 = document.getElementById("radio2");

  window.addEventListener("load", borrarBanner);
  window.addEventListener("resize", borrarBanner);
  window.addEventListener("wheel", borrarBanner);
  inputModelo.addEventListener("keyup", (evt) => debounce(buscarProducto, evt));
  inputImg.addEventListener("change", saveImg);
  form.addEventListener("submit", enviarFormulario);
  radio1.addEventListener("change", radioChanged);
  radio2.addEventListener("change", radioChanged);
  tipoAccion.addEventListener("change", changeAction);
  tipoProducto.addEventListener("change", changeProducto);
});

let timeout;
function debounce(funcion, args) {
  if (tipoAccion.value == "1") {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => funcion(args), TIEMPO_DEBOUNCE_MS);
  }
}

async function buscarProducto() {
  let direccion = tipoProducto.value == "1" ? "switchs" : "teclados";
  const modelo = inputModelo.value;
  if (inputModelo.value != "") {
    const resp = await fetch(`/${direccion}/${modelo}`, {
      method: "GET",
    });

    const producto = await resp.json();
    if (resp.ok && producto.length == 1) {
      rellenarCampos(producto[0]);
    }
  }
}

function rellenarCampos(producto) {
  inputAutor.value = producto.autor ? producto.autor : producto.marca;
  inputPrecio.value = producto.precio;
  inputEnlace.value = producto.enlace;
  inputColor.value = producto.color ? producto.color : null;
  if (producto.image1) {
    const prefix = "/Media/Products/";
    image1 = prefix + producto.image1;
    image2 = producto.image2 ? prefix + producto.image2 : null;
    newImage.src = image1;
    imgLocation.style.border = "none";
  }
  inputAutor.disabled = false;
  inputImg.disabled = false;
  inputPrecio.disabled = false;
  inputEnlace.disabled = false;
  if (tipoProducto.value == "1") {
    inputColor.disabled = false;
  } else {
    inputColor.disabled = true;
  }
  inputModelo.readOnly = true;
}

async function enviarFormulario(evt) {
  evt.preventDefault();
  const formData = new FormData(form);
  formData.delete("imagenes");
  const precio = formData.get("precio");
  const precioFormateado = precio.replace(".", ",");
  formData.set("precio", precioFormateado);

  if (image1) formData.append("imagen1", image1);
  if (image2) formData.append("imagen2", image2);

  let resp;
  if (tipoAccion.value == "0") {
    if (tipoProducto.value == "0") {
      resp = await fetch("/teclados", {
        method: "POST",
        body: formData,
      });
    } else {
      resp = await fetch("/switchs", {
        method: "POST",
        body: formData,
      });
    }
  } else {
    if (tipoProducto.value == "0") {
      resp = await fetch(`/teclados/${formData.get("modelo")}`, {
        method: "PUT",
        body: formData,
      });
    } else {
      resp = await fetch(`/switchs/${formData.get("modelo")}`, {
        method: "PUT",
        body: formData,
      });
    }
  }
  const data = await resp.text();

  if (resp.ok) {
    resetInputs();
    if (tipoAccion.value == "1") {
      changeAction();
    }
    alert("Todo ha ido bien");
  } else {
    alert(resp.status + ": " + data);
  }
}

function resetInputs() {
  // Hago esto en vez de resetear el formulario entero
  // para no resetear los select
  var fieldsToReset = document.querySelectorAll("input");
  for (var i = 0; i < fieldsToReset.length; i++) {
    fieldsToReset[i].value = null;
  }
  radio1.checked = true;
  radio2.checked = false;
  image1 = undefined;
  image2 = undefined;
  inputModelo.readOnly = false;
  newImage.src = "/Media/add_photo.png";
  imgLocation.style.border = "dashed";
}

function saveImg() {
  if (inputImg.files && inputImg.files[0]) {
    if (radio1.checked) {
      image1 = inputImg.files[0];
    } else {
      image2 = inputImg.files[0];
    }
    cargarPreview(inputImg.files[0], newImage);
  }
}

function radioChanged() {
  if (radio1.checked) {
    if (image1) {
      cargarPreview(image1, newImage);
    } else {
      newImage.src = "/Media/add_photo.png";
      imgLocation.style.border = "dashed";
    }
  } else {
    if (radio2.checked) {
      if (image2) {
        cargarPreview(image2, newImage);
      } else {
        newImage.src = "/Media/add_photo.png";
        imgLocation.style.border = "dashed";
      }
    }
  }
}

function cargarPreview(file, imgElement) {
  if (file instanceof File) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgElement.src = e.target.result;
      imgLocation.style.border = "none";
    };
    // Leer el archivo como una URL de datos
    reader.readAsDataURL(file);
  } else {
    imgElement.src = file;
    imgLocation.style.border = "none";
  }
}

function changeAction() {
  resetInputs();
  if (tipoAccion.value == "1") {
    boton.childNodes[1].textContent = "Modificar";
    inputAutor.disabled = true;
    inputImg.disabled = true;
    inputPrecio.disabled = true;
    inputEnlace.disabled = true;
    inputColor.disabled = true;
  } else {
    boton.childNodes[1].textContent = "Añadir";
    inputAutor.disabled = false;
    inputImg.disabled = false;
    inputPrecio.disabled = false;
    inputEnlace.disabled = false;
    if (tipoProducto.value == "1") {
      inputColor.disabled = false;
    } else {
      inputColor.disabled = true;
    }
  }
}

function changeProducto() {
  const inputDesigner = document.getElementById("autor");
  const labelDesigner = document.getElementById("autorLabel");
  const inputColor = document.getElementById("color");
  const colorContenedor = document.getElementsByClassName("campo-color");
  const enlaceContenedor = document.getElementsByClassName("enlace");

  resetInputs();
  if (tipoAccion.value == "1") {
    inputAutor.disabled = true;
    inputImg.disabled = true;
    inputPrecio.disabled = true;
    inputEnlace.disabled = true;
  }
  if (tipoProducto.value == "1") {
    enlaceContenedor[0].style.gridColumn = "2 / 3";
    colorContenedor[0].style.display = "flex";
    labelDesigner.textContent = "Marca*:";
    inputDesigner.setAttribute("name", "marca");
    inputDesigner.setAttribute("placeholder", "Gateron");
    if (tipoAccion.value == "1") {
      inputColor.disabled = true;
    } else {
      inputColor.disabled = false;
    }
  } else {
    enlaceContenedor[0].style.gridColumn = "1 / 3";
    colorContenedor[0].style.display = "none";
    labelDesigner.textContent = "Autor*:";
    inputDesigner.setAttribute("name", "autor");
    inputDesigner.setAttribute("placeholder", "Alberto Álvarez");
    inputColor.disabled = true;
  }
}

function borrarBanner() {
  const anchoVentana = document.documentElement.clientWidth;
  const altoVentana = document.documentElement.clientHeight;
  const imagenHeader = document.getElementById("headerPrincipal");
  const formulario = document.querySelector("form");
  const titulo = document.querySelector("h1");
  const unidadRemAncho = remToPixels(29.67);
  const unidadRemVentana = remToPixels(32.5);
  if (anchoVentana <= unidadRemAncho || altoVentana <= unidadRemVentana) {
    imagenHeader.style.display = "none";
    if (anchoVentana > altoVentana) {
      titulo.style.fontSize = "0.875rem";
      formulario.style.overflowY = "scroll";
      formulario.style.gridTemplateRows = "none";
      formulario.style.marginBottom = "0.3rem";
    }
  } else {
    imagenHeader.style.display = "flex";
    titulo.style.fontSize = "1.2rem";
    formulario.style.overflowY = "hidden";
    formulario.style.marginBottom = "none";
  }
}

function remToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
