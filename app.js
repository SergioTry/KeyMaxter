const express = require("express");
const database = require("./db.js");
const multer = require("multer");

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
  console.log(marca);
  res.send(await database.listarTeclados());
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
  async (req, res) => {
    // en files se encuentran los archivos subidos
    // en body se encuentran los campos de texto

    console.log(req.files);
    req.body.image1 = req.files.imagen1[0].filename;
    console.log(req.body);

    const nuevo = await database.altaTeclado(req.body);
    try {
      if (nuevo) {
        res
          .status(HTTP_CREATED)
          .location(`/teclados/${nuevo.id}`)
          .send("Teclado creado.");
        console.log("teclado creado");
      } else res.status(HTTP_BAD_REQUEST).send("Datos incorrectos.");
    } catch (err) {
      console.log(err);
      res.sendStatus(HTTP_INTERNAL_SERVER_ERROR);
    }
  }
);

app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.status(400).send("Error al subir el archivo: " + err.message);
  } else {
    res.status(500).send("Error interno del servidor");
  }
});

app.listen(5500, () => {
  try {
    console.log("Servicio escuchando");
  } catch {}
});
