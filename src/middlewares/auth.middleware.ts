import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";

class AuthMiddleware {
  public isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { authorization } = req.headers;
    if (!authorization) throw new AppError("Missing bearer token", 401);

    const [_bearer, token] = authorization.split(" ");

    const secret = process.env.SECRET_KEY!;

    res.locals = { ...res.locals, decoded: verify(token, secret) };

    return next();
  };
}

export const auth = new AuthMiddleware();
