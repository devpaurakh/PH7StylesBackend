import jwt from "jsonwebtoken";

// Middleware to verify JWT
export const jwtVerify = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Check if the Authorization header exists
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authenticated." });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SEC, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Token is not valid." });
    }
    req.user = user;
    next();
  });
};

export const verifyTokenAndAuthorization = async (req, res, next) => {
  jwtVerify(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "You are not allowed to perform this action.",
      });
    }
  });
};

export const verifyTokenAndAdmin = async (req, res, next) => {
  jwtVerify(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "You are not allowed to perform this action.",
      });
    }
  });
};
