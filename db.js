const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("XE", "keymaxter", "deamu", {
  host: "localhost",
  dialect: "oracle",
  dialectOptions: { maxRows: 500 },
});

const ModeloTeclado = sequelize.define(
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

exports.altaTeclado = async function (datosTeclado) {
  return await ModeloTeclado.create({ datosTeclado });
};
// const nuevoTeclado = await Teclado.create({
//   modelo: "Teclado123",
//   precio: 59.99,
//   enlace: "http://ejemplo.com",
// });
// const teclados = await Teclado.findAll();
