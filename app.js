const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { Sequelize } = require("sequelize");
const db = require("./db.js");

const app = express();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images/Products");
  },
  filename: function (req, file, cb) {
    let fechaActual = new Date(Date.now());
    let filename =
      fechaActual.getDate() +
      "-" +
      fechaActual.getMonth() +
      "-" +
      +fechaActual.getFullYear() +
      "_" +
      fechaActual.getHours() +
      fechaActual.getMinutes() +
      fechaActual.getSeconds() +
      "_" +
      file.originalname;
    cb(null, filename);
  },
});

const fileFilter = function (req, file, cb) {
  // Verificar el tipo MIME del archivo
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Aceptar el archivo
  } else {
    // Lanza un multerError para hacer el control de errores
    cb(new multer.MulterError("El archivo no es una imagen"), false);
  }
};

// Inicializar el middleware de Multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

app.get("/teclados", async (req, res, next) => {
  // /teclados?marca=hola
  try {
    const autor = req.query.autor;
    const orden = req.query.orden;
    console.log(autor, orden);
    res.send(await db.listarTeclados(autor, orden));
  } catch (err) {
    next(err);
  }
});

app.get("/teclados/autores", async (req, res, next) => {
  try {
    res.send(await db.listarAutoresTeclados());
  } catch (err) {
    next(err);
  }
});

app.get("/switchs", async (req, res, next) => {
  try {
    const marca = req.query.marca;
    const orden = req.query.orden;
    res.send(await db.listarSwitchs(marca, orden));
  } catch (err) {
    next(err);
  }
});

app.get("/switchs/marcas", async (req, res, next) => {
  try {
    res.send(await db.listarMarcasSwitchs());
  } catch (err) {
    next(err);
  }
});

app.post(
  "/teclados",
  upload.fields([
    { name: "modelo", maxCount: 1 },
    { name: "precio", maxCount: 1 },
    { name: "enlace", maxCount: 1 },
    { name: "autor", maxCount: 1 },
    { name: "imagen1", maxCount: 1 },
    { name: "imagen2", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      // en files se encuentran los archivos subidos
      // en body se encuentran los campos de texto
      const nuevoTeclado = crearNuevoProducto(req, "teclado");
      const nuevo = await db.altaTeclado(nuevoTeclado);
      res
        .status(HTTP_CREATED)
        .location(`/teclados/${nuevo.id}`)
        .send("Teclado creado.");
      console.log("teclado creado");
    } catch (err) {
      // El next lo uso para que los errores sean controlados
      // por el control general de errores
      next(err);
    }
  }
);

app.post(
  "/switchs",
  upload.fields([
    { name: "modelo", maxCount: 1 },
    { name: "precio", maxCount: 1 },
    { name: "enlace", maxCount: 1 },
    { name: "marca", maxCount: 1 },
    { name: "color", maxCount: 1 },
    { name: "imagen1", maxCount: 1 },
    { name: "imagen2", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const nuevoSwitch = crearNuevoProducto(req, "switch");
      const nuevo = await db.altaSwitch(nuevoSwitch);
      res
        .status(HTTP_CREATED)
        .location(`/switchs/${nuevo.id}`)
        .send("Switch creado.");
      console.log("switch creado");
    } catch (err) {
      next(err);
    }
  }
);

app.put(
  "/teclados/:modelo",
  upload.fields([
    { name: "modelo", maxCount: 1 },
    { name: "precio", maxCount: 1 },
    { name: "enlace", maxCount: 1 },
    { name: "autor", maxCount: 1 },
    { name: "imagen1", maxCount: 1 },
    { name: "imagen2", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const nuevoTeclado = crearNuevoProducto(
        req,
        "teclado",
        req.params.modelo
      );
      const nuevo = await db.modificarTeclado(nuevoTeclado);

      // Número de productos modificados
      if (nuevo[0] >= 1) {
        res.status(HTTP_OK).send("Teclado modificado.");
        console.log("teclado modificado");
      } else {
        res.status(HTTP_NOT_FOUND).send(" modelo no encontrado.");
      }
    } catch (err) {
      next(err);
    }
  }
);

app.put(
  "/switchs/:modelo",
  upload.fields([
    { name: "modelo", maxCount: 1 },
    { name: "precio", maxCount: 1 },
    { name: "enlace", maxCount: 1 },
    { name: "marca", maxCount: 1 },
    { name: "color", maxCount: 1 },
    { name: "imagen1", maxCount: 1 },
    { name: "imagen2", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const nuevoSwitch = crearNuevoProducto(req, "switch", req.params.modelo);
      const nuevo = await db.modificarSwitch(nuevoSwitch);

      if (nuevo[0] >= 1) {
        res.status(HTTP_OK).send("Switch modificado.");
        console.log("switch modificado");
      } else {
        res.status(HTTP_NOT_FOUND).send(" modelo no encontrado.");
      }
    } catch (err) {
      next(err);
    }
  }
);

app.delete("/teclados/:id", async (req, res, next) => {
  try {
    const id = parseFloat(req.params.id);
    if (!id) res.status(HTTP_BAD_REQUEST).send(" id de teclado incorrecto");

    const tecladoBorrado = await db.getTecladoById(id);
    const borrado = await db.borrarTeclado(id);
    // Número de productos borrados
    if (borrado >= 1) {
      if (tecladoBorrado.image1) {
        borrarImagen(
          "public/Images/Products/" + tecladoBorrado[0].image1,
          tecladoBorrado[0].image1
        );
      }
      if (tecladoBorrado.image2) {
        borrarImagen(
          "public/Images/Products/" + tecladoBorrado[0].image2,
          tecladoBorrado[0].image2
        );
      }
      res.status(HTTP_NO_CONTENT).send("Teclado borrado.");
      console.log("teclado borrado");
    } else {
      res.status(HTTP_NOT_FOUND).send(" id de teclado no encontrado.");
    }
  } catch (err) {
    next(err);
  }
});

app.delete("/switchs/:id", async (req, res, next) => {
  try {
    const id = parseFloat(req.params.id);
    if (!id) res.status(HTTP_BAD_REQUEST).send(" id de switch incorrecto");
    const switchBorrado = await db.getSwitchById(id);
    const borrado = await db.borrarSwitch(id);
    // Número de productos borrados
    if (borrado >= 1) {
      if (switchBorrado[0].image1) {
        borrarImagen(
          "public/Images/Products/" + switchBorrado[0].image1,
          switchBorrado[0].image1
        );
      }
      if (switchBorrado[0].image2) {
        borrarImagen(
          "public/Images/Products/" + switchBorrado[0].image2,
          switchBorrado[0].image2
        );
      }
      res.status(HTTP_NO_CONTENT).send("Switch borrado.");
      console.log("switch borrado");
    } else {
      res.status(HTTP_NOT_FOUND).send(" id de switch no encontrado.");
    }
  } catch (err) {
    next(err);
  }
});

app.use(function (err, req, res, next) {
  console.error(err);
  if (err instanceof multer.MulterError)
    res
      .status(HTTP_BAD_REQUEST)
      .send("Error al subir el archivo: " + err.message);
  else {
    // El ValidationError valida que los campos son correctos
    // (valida que no se intentan añadir campos diferentes a los de la db
    // o errores de validación)
    if (err instanceof Sequelize.ValidationError)
      res.status(HTTP_BAD_REQUEST).send("Datos incorrectos, " + err.message);
    if (err instanceof Sequelize.DatabaseError)
      res.status(HTTP_INTERNAL_SERVER_ERROR).send("Error en la base de datos.");
    res.status(HTTP_INTERNAL_SERVER_ERROR).send("Error interno del servidor");
  }
});

// El modelo undefined es porque lo uso cuando lo recibo como parámetro
// sino lo saco del body
function crearNuevoProducto(req, tipoProducto, modelo = undefined) {
  if (tipoProducto == "teclado") {
    return {
      modelo: modelo == undefined ? req.body.modelo : modelo,
      enlace: req.body.enlace,
      precio: req.body.precio,
      autor: req.body.autor,
      image1:
        req.files && req.files.imagen1 ? req.files.imagen1[0].filename : null,
      image2:
        req.files && req.files.imagen2 ? req.files.imagen2[0].filename : null,
    };
  } else {
    return {
      modelo: modelo == undefined ? req.body.modelo : modelo,
      enlace: req.body.enlace,
      precio: req.body.precio,
      marca: req.body.marca,
      color: req.body.color,
      image1:
        req.files && req.files.imagen1 ? req.files.imagen1[0].filename : null,
      image2:
        req.files && req.files.imagen2 ? req.files.imagen2[0].filename : null,
    };
  }
}

function borrarImagen(ruta, imageName) {
  fs.unlink(ruta, function (error) {
    if (error) {
      console.error(`Error al eliminar ${imageName}:`, error);
    } else {
      console.log(`${imageName} eliminada correctamente.`);
    }
  });
}

function crearCarpetaSiNoExiste() {
  // Verificar si la carpeta no existe
  const ruta = "public/Images/Products";
  if (!fs.existsSync(ruta)) {
    fs.mkdirSync(ruta);
    console.log("Se ha creado la carpeta Products");
  }
}

crearCarpetaSiNoExiste();

app.listen(5500, () => {
  try {
    console.log("Servicio escuchando");
  } catch {}
});
