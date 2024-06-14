require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.use("/", userRoute);
app.use("/", taskRoute);
app.use("/public", express.static("public"));

sequelize
	.authenticate()
	.then(() => {
		console.log("Connection success");
		return sequelize.sync({ alter: true });
	})
	.then(() => {
		console.log("Sync models");
		app.listen(port, () => {
			console.log(`Server listen on http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.error("Connection fail", error);
	});
