import { Response, NextFunction } from "express";
import { Authrequest } from "../types";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";
export const authRequired = (
  req: Authrequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, TOKEN_SECRET, (err: jwt.VerifyErrors | null, user: any) => {
    if (err) return res.status(403).json({ message: "invalid token" });

    req.user = user;

    next();
  });
};
