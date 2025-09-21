import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  // const authorization = req.headers["authorization"];
  // if (!authorization) {
  //   return res.status(401).json({ error: "Authorization header missing" });
  // }
  try {
    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("inside auth middlewate", decode);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};
