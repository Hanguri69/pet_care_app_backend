const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: false, message: "Token is not valid" });
      }

      req.user = user;

      next();
    });
  } else {
    return res
      .status(401)
      .json({ status: false, message: "You are not authenticated" });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Vet" || req.user.userType === "Owner") {
      next();
    } else {
      return res.status(403).json({
        status: false,
        message: "You are not allowed to perfom this action",
      });
    }
  });
};

const verifyVet = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Vet" || req.user.userType === "Owner") {
      next();
    } else {
      return res.status(403).json({
        status: false,
        message: "You are not allowed to perfom this action",
      });
    }
  });
};

module.exports = { verifyTokenAndAuthorization, verifyVet };
