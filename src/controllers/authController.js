/* const jwt = require("jsonwebtoken");

const authController = {
  verifyToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res.status(403).json({ status: false, msg: "Token nulo!" });
    jwt.verify(token, "secret_key", (err, user) => {
      if (err)
        return res
          .status(404)
          .json({ status: false, msg: "Token no encontrado!" });
      req.user = user;
      next();
    });
  },
  requireAdmin: async (req, res, next) => {
    if (req.user.rol === "admin") {
      next();
    } else {
      return res.status(403).json({ status: false, msg: "Acceso denegado!" });
    }
  },
  requireSuperAdmin: async (req, res, next) => {
    if (req.user.rol === "superadmin") {
      next();
    } else {
      return res.status(403).json({ status: false, msg: "Acceso denegado!" });
    }
  },
};

module.exports = authController;
 */