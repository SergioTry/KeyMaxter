const express = require("express");
const db = require("./db.js");
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

// async function demo() {
//   await db.altaTeclado({
//     modelo: "Teclado129",
//     precio: 59.99,
//     enlace: "http://ejemplo.com",
//   });
//   console.log(JSON.stringify(await db.listarTeclados(), null, 2));
// }
// demo();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images/Products"); // Aceptar el archivo
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
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
  // if (filtro) {
  //   res.send(db.buscarContactos(filtro));
  // } else {
  //   res.send(db.listarContactos());
  // }
  res.send(await db.listarTeclados());
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
  (req, res) => {
    //res.sendStatus(HTTP_INTERNAL_SERVER_ERROR);
    // en files se encuentran los archivos subidos
    // en body se encuentran los campos de texto
    console.log(req.body);
    console.log(req.files);
    // res.sendStatus(HTTP_INTERNAL_SERVER_ERROR);
    // try {
    //   const nuevo = db.crearTeclado(req.body);
    //   if (nuevo)
    //     res
    //       .status(HTTP_CREATED)
    //       .location(`/contactos/${nuevo.id}`)
    //       .send("Contacto creado.");
    //   else res.status(HTTP_BAD_REQUEST).send("Datos incorrectos.");
    // } catch (err) {
    //   res.sendStatus(HTTP_INTERNAL_SERVER_ERROR);
    // }
    const error = true;

    if (error) {
      // Si hay un error, devuelve una respuesta con un código de estado 500 (Error interno del servidor) y un mensaje de error
      console.log("juh");
      res
        .status(500)
        .send(
          "Error: La operación POST ha fallado. El archivo no se ha guardado."
        );
    } else {
      // Si la operación es exitosa, guarda el archivo en la ruta
      const rutaImagen = req.file.path;

      res.send(
        "Operación POST exitosa. El archivo se ha guardado en la ruta: " +
          rutaImagen
      );
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
