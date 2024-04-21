const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const authorizationHeader = req.get("Authorization");
  console.log("Auth Header : ",authorizationHeader);

  if (!authorizationHeader) {
      return res.status(401).json({
          result: false,
          message: "Invalid authorization header",
      });
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
      return res.status(401).json({
          result: false,
          message: "Authorization token not found"
      });
  }

  try {
      req.user = jwt.verify(token,"abc");
      next();
  } catch (err) {
      return res.status(401).json({
          result: false,
          message: "Invalid token"
      });
  }
};



