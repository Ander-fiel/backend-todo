const { Sequelize } = require("sequelize");

const database = "railway";
const username = "postgres";
const password = "apjDZmYDmAKzfwzuYcbnrqrSnXmZlczB";
const host = "viaduct.proxy.rlwy.net";
const port = "45702"

const sequelize = new Sequelize(database, username, password, {
	host: host,
	port: port,
	dialect: "postgresql",
});

module.exports = {
	sequelize,
};

