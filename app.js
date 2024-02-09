const express = require("express");
const multer = require("multer");

const db = require("./db.js");
const { Sequelize } = require("sequelize");

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
    cb(null, "public/Images/Products"); // Aceptar el archivo
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

app.get("/teclados", async (req, res) => {
  // /teclados?marca=hola
  const marca = req.query.marca;
  const orden = req.query.orden;
  res.send(await db.listarProductos(marca, orden));
});
app.get("/tecladosMarcas", async (req, res) => {
  res.send(await db.listarMarcasTeclados());
});

app.post(
  "/teclados",
  upload.fields([
    { name: "modelo", maxCount: 1 },
    { name: "precio", maxCount: 1 },
    { name: "enlace", maxCount: 1 },
    { name: "imagen1", maxCount: 1 },
    { name: "imagen2", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      // en files se encuentran los archivos subidos
      // en body se encuentran los campos de texto
      const nuevoTeclado = {
        modelo: req.body.modelo,
        enlace: req.body.enlace,
        precio: req.body.precio,
        marca: req.body.marca ? req.body.marca : null,
        image1:
          req.files && req.files.imagen1 ? req.files.imagen1[0].filename : null,
        image2:
          req.files && req.files.imagen2 ? req.files.imagen2[0].filename : null,
      };
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

app.use(function (err, req, res, next) {
  console.error(err);
  if (err instanceof multer.MulterError)
    res
      .status(HTTP_BAD_REQUEST)
      .send("Error al subir el archivo: " + err.message);
  else {
    // El ValidationError valida que los campos son correctos
    // (valida que no se intentan añadir campos diferentes a los de la db)
    if (err instanceof Sequelize.ValidationError)
      res.status(HTTP_BAD_REQUEST).send("Datos incorrectos.");
    // El Database controla que no se intente añadir un modelo ya existente
    // (unique constraint)
    if (err instanceof Sequelize.DatabaseError)
      res.status(HTTP_BAD_REQUEST).send("Ese modelo ya existe.");
    res.status(500).send("Error interno del servidor");
  }
});

app.listen(5500, () => {
  try {
    console.log("Servicio escuchando");
  } catch {}
});
