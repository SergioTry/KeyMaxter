const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("XE", "keymaxter", "deamu", {
  host: "localhost",
  dialect: "oracle",
  dialectOptions: { maxRows: 500 },
});

async function runApp() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Define el modelo después de verificar la conexión exitosa
    const Teclado = sequelize.define(
      "teclado",
      {
        modelo: {
          field: "MODELO",
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        precio: {
          field: "PRECIO",
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        enlace: {
          field: "ENLACE",
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "PROD_TECLADO",
        timestamps: false,
        // Si no hay campos de timestamp en la tabla
      }
    );
    // Quitar en produccion
    await Teclado.sync({ force: true });
    const nuevoTeclado = await Teclado.create({
      modelo: "Teclado123",
      precio: 59.99,
      enlace: "http://ejemplo.com",
    });
    const teclados = await Teclado.findAll();
    console.log("Teclados obtenidos:", teclados);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
runApp();
