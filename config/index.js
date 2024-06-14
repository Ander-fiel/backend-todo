const { Sequelize } = require("sequelize");

const database = "railway";
const username = "postgres";
const password = process.env.DATABASE_PASSWORD;
const host = "roundhouse.proxy.rlwy.net";
const port = "32432"

const sequelize = new Sequelize(database, username, password, {
	host: host,
	port: port,
	dialect: "postgresql",
});

module.exports = {
	sequelize,
};
