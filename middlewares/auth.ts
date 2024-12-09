import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";

export const getUserId = (req: Request, res: Response, next: NextFunction) => {
  const { authorization = "" } = req.headers;
  const token = RegExp(/^Bearer /).test(authorization)
    ? authorization.replace(/^Bearer /, "")
    : "";

  try {
    const { sub: userId } = jwt.verify(token, JWT_SECRET);
    req.body.userId = userId;
    next();
  } catch (err) {
    // TODO log error when authentication is required
    next();
  }
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const { userId = "" } = req.body;
  if (!userId) {
    return res.status(401).send({
      message:
        "Unauthorized. This means you are either missing the JWT token, the token is not being passed the right way or your token has expired. If you restarted the server, you will need signin again and get another JWT token.",
    });
  }
  next();
};
