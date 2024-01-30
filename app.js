const express = require("express");

const app = express();

app.get("/", function (request, response) {
  response.setHeader("sergio", "fernandez");
  response.send("hola");
});

app.listen(5000, () => {
  //     try {
  //   console.log("Servicio escuchando");
  //     } catch {
  //     }
});
