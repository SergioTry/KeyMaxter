const tipoAccion = document.getElementById("tipo-accion");
const boton = document.getElementById("button");
const inputImg = document.getElementById("image");
const imgLocation = document.getElementById("image-location");
const form = document.querySelector("form");
const radio1 = document.getElementById("radio1");
const radio2 = document.getElementById("radio2");

var image1;
var image2;

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("load", borrarBanner);
  window.addEventListener("resize", borrarBanner);
  inputImg.addEventListener("change", saveImg);
  form.addEventListener("submit", enviarFormulario);
  radio1.addEventListener("change", radioChanged);
  radio2.addEventListener("change", radioChanged);
  tipoAccion.addEventListener("change", changeAction);
});

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
    console.log("add");
    resp = await fetch("/teclados", {
      method: "POST",
      body: formData,
    });
  } else {
    console.log("mod");
    resp = await fetch(`/teclados/${formData.get("modelo")}`, {
      method: "PUT",
      body: formData,
    });
  }
  const data = await resp.text();

  console.log(data);
  if (resp.ok) {
    alert("Todo ha ido bien");
    form.reset();
  } else {
    alert(resp.status + ": " + data);
  }
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
  var newImage = document.getElementById("newImage");
  if (radio1.checked) {
    if (image1) {
      cargarPreview(image1, newImage);
    } else {
      newImage.src = "/Images/add_photo.png";
      imgLocation.style.border = "dashed";
    }
  } else {
    if (radio2.checked) {
      if (image2) {
        cargarPreview(image2, newImage);
      } else {
        newImage.src = "/Images/add_photo.png";
        imgLocation.style.border = "dashed";
      }
    }
  }
}

function cargarPreview(file, imgElement) {
  const reader = new FileReader();
  reader.onload = function (e) {
    imgElement.src = e.target.result;
    imgLocation.style.border = "none";
  };
  // Leer el archivo como una URL de datos
  reader.readAsDataURL(file);
}

function changeAction() {
  if (tipoAccion.value == "1") {
    boton.childNodes[1].textContent = "Modificar";
  } else {
    boton.childNodes[1].textContent = "Añadir";
  }
}

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
