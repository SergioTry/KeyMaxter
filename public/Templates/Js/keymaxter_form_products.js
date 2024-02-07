const tipoAccion = document.getElementById("tipo-accion");
const boton = document.getElementById("button");
const inputImg = document.getElementById("image");
const imgLocation = document.getElementById("image-location");
const form = document.querySelector("form");

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
inputImg.addEventListener("change", function () {
  imagesPreview();
});
form.addEventListener("submit", async function (evt) {
  const formData = new FormData(form);
  // var file;
  // try {
  //   file = new File([blob], image1, {
  //     type: "image/png",
  //   });
  // } catch (Err) {
  //   alert(Err);
  // }
  // alert("terrorista");
  formData.delete("imagenes");
  formData.append("imagen1", image1);
  formData.append("hola", "Sergio");

  const response = await fetch("/teclados", {
    method: "POST",
    body: formData,
  });
  evt.preventDefault();
});
radio1.addEventListener("change", mostrarPreviewImage);
radio2.addEventListener("change", mostrarPreviewImage);

document.addEventListener("DOMContentLoaded", function () {
  //preguntar
});
// boton.addEventListener("click", async function () {
//   alert("adsf");
//   const nuevo = {
//     modelo: "mk2",
//     precio: 20,
//     marca: "singleGold",
//     enlance: "www.google.com",
//     image1: "image1",
//   };
//   const resp = await fetch("/teclados", {
//     method: "POST",
//     body: JSON.stringify(nuevo),
//     headers: {
//       "Content-type": "application/json",
//     },
//   });
// });
function mostrarPreviewImage() {
  var newImage = document.getElementById("newImage");
  const imgLocation = document.getElementById("image-location");
  if (radio1.checked) {
    if (image1) {
      const reader = new FileReader();
      reader.onload = function (e) {
        newImage.src = image1;
        imgLocation.style.border = "none";
      };
      // Leer el archivo como una URL de datos
      reader.readAsDataURL(inputImg.files[0]);
    } else {
      newImage.src = "/Images/add_photo.png";
      imgLocation.style.border = "dashed";
    }
  } else {
    if (radio2.checked) {
      if (image2) {
        var reader = new FileReader();
        reader.onload = function (e) {
          newImage.src = image2;
          imgLocation.style.border = "none";
        };
        reader.readAsDataURL(inputImg.files[0]);
      } else {
        newImage.src = "/Images/add_photo.png";
        imgLocation.style.border = "dashed";
      }
    }
  }
}

var imagesPreview = function () {
  if (inputImg.files && inputImg.files[0]) {
    var reader = new FileReader();
    const imgLocation = document.getElementById("image-location");
    var newImage = document.getElementById("newImage");
    reader.onload = function (e) {
      newImage.src = e.target.result;
      if (radio1.checked) {
        image1 = e.target.result;
      } else {
        image2 = e.target.result;
      }
      imgLocation.style.border = "none";
    };
    // Leer el archivo como una URL de datos
    reader.readAsDataURL(inputImg.files[0]);
  }
};

tipoAccion.addEventListener("change", function () {
  if (tipoAccion.value == "1") {
    boton.childNodes[1].textContent = "Modificar";
  } else {
    boton.childNodes[1].textContent = "Añadir";
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
