const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const { v4: uuidv4 } = require("uuid");

const User = sequelize.define(
	"users",
	{
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{ tableName: "users" }
);

const Task = sequelize.define(
	"task",
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{ tableName: "task" }
);

const RefreshToken = sequelize.define(
	"refreshToken",
	{
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		expiration: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{ tableName: "refreshToken" }
);

RefreshToken.createToken = async (user) => {
	let expireAt = new Date();
	expireAt.setTime(expireAt.getTime() + process.env.REFRESH_EXPIRATION * 1000);

	let _token = uuidv4();
	const refreshToken = await RefreshToken.create({
		token: _token,
		userId: user.id,
		expiration: expireAt.getTime(),
	});

	return refreshToken.token;
};

RefreshToken.verifyExpiration = (token) => {
	return token.expiration.getTime() < new Date().getTime();
};

User.hasMany(Task, { as: "tasks", foreignKey: "userId" });
Task.belongsTo(User, {
	foreignKey: "userId",
});
RefreshToken.belongsTo(User, {
	foreignKey: "userId",
});

module.exports = {
	User,
	Task,
	RefreshToken,
};
