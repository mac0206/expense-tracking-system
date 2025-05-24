// middleware/auth.js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = decoded; // 👈 This gives you access to req.user.userId
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export default auth;
