const { Sequelize } = require("sequelize");
const oracledb = require("oracledb");

const sequelize = new Sequelize("XE", "keymaxter", "deamu", {
  host: "localhost",
  dialect: "oracle",
});

async function runApp() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
runApp();
