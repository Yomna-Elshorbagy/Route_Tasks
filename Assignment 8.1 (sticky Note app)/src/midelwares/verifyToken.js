import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //   let { token } = req.headers;
  let [key, token] = req.headers.token.split(" ");
  jwt.verify(token, process.env.secret_Key, async (err, decoded) => {
    //decoded is payload
    if (err) return res.status(401).json({ message: "Invalid Token", err });

    req.user = decoded;
    next();
  });
};
