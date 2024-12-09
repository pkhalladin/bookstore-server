import * as jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRY_IN_MILLISECONDS } from "../config";

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ sub: userId }, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRY_IN_MILLISECONDS}ms`,
  });
};
