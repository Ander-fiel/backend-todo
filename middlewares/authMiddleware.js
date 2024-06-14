const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).json({
			message: "No token provided",
		});
	}

	jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
		if (error) {
			return res.status(401).json({ message: error });
		}
		req.userId = decoded.id;
		next();
	});
};

module.exports = { verifyToken };
