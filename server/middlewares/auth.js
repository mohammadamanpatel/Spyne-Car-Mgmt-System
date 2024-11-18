import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  console.log("req.headers.authorization", req.headers.authorization);
  
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      message: "Authorization header not found",
    });
  }

  // Extract token from "Bearer <token>"
  const token = authorizationHeader.split(" ")[1];

  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Attach the decoded user to the request
    next(); // Proceed to the next middleware
  } catch (err) {
    return res.status(403).json({
      error: "Invalid or expired token",
    });
  }
};

export default verifyUser;
