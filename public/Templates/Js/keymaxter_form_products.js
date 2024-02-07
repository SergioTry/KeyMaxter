const tipoAccion = document.getElementById("tipo-accion");
const boton = document.getElementById("button");
const addImg = document.getElementById("image");

const radio1 = document.getElementById("radio1");
const radio2 = document.getElementById("radio2");

var image1;
var image2;

window.addEventListener("load", function () {
  borrarBanner();
});
window.addEventListener("resize", function () {
  borrarBanner();
});
addImg.addEventListener("change", function () {
  imagesPreview();
});
radio1.addEventListener("change", mostrarPreviewImage);
radio2.addEventListener("change", mostrarPreviewImage);

function mostrarPreviewImage() {
  var newImage = document.getElementById("newImage");
  if (radio1.checked) {
    if (image1) {
      var reader = new FileReader();
      reader.onload = function (e) {
        newImage.src = image1;
      };
      // Leer el archivo como una URL de datos
      reader.readAsDataURL(addImg.files[0]);
    } else {
      newImage.src = "/public/Images/add_photo.png";
    }
  } else {
    if (radio2.checked) {
      if (image2) {
        var reader = new FileReader();
        reader.onload = function (e) {
          newImage.src = image2;
        };
        reader.readAsDataURL(addImg.files[0]);
      } else {
        newImage.src = "/public/Images/add_photo.png";
      }
    }
  }
}

tipoAccion.addEventListener("change", function () {
  if (tipoAccion.value == "1") {
    boton.childNodes[1].textContent = "Modificar";
  } else {
    boton.childNodes[1].textContent = "Añadir";
  }
});

var imagesPreview = function () {
  if (addImg.files && addImg.files[0]) {
    var reader = new FileReader();
    var newImage = document.getElementById("newImage");
    reader.onload = function (e) {
      newImage.src = e.target.result;
      if (radio1.checked) {
        image1 = e.target.result;
      } else {
        image2 = e.target.result;
      }
    };
    // Leer el archivo como una URL de datos
    reader.readAsDataURL(addImg.files[0]);
  }
};

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
