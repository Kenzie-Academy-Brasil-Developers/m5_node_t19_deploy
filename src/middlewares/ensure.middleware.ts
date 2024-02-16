import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../database";
import { AppError } from "../errors";

class EnsureMiddleware {
  public validBody =
    (schema: AnyZodObject) =>
    (req: Request, _: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);
      return next();
    };

  public emailIsUnique = async (
    req: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email } = req.body;
    if (!email) return next();

    const foundUser = await prisma.user.findFirst({ where: { email } });

    if (foundUser) {
      throw new AppError("E-mail already exists.", 409);
    }

    return next();
  };

  public bodyOwnerIdExists = async (
    { body: { ownerId } }: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> => {
    const foundOwner = await prisma.user.findFirst({
      where: { id: Number(ownerId) },
    });

    if (!foundOwner) {
      throw new AppError("Owner not found!", 404);
    }

    return next();
  };

  public paramsUserIdExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { userId } = req.params;

    const foundUser = await prisma.user.findFirst({
      where: { id: Number(userId) },
      include: { detail: true },
    });

    if (!foundUser) {
      throw new AppError("User not found!", 404);
    }

    res.locals = { ...res.locals, foundUser };

    return next();
  };

  public paramsAlbumIdExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { albumId } = req.params;

    const foundAlbum = await prisma.album.findFirst({
      where: { id: Number(albumId) },
      include: { owner: true, genres: true },
    });

    if (!foundAlbum) {
      throw new AppError("Album not found!", 404);
    }

    res.locals = { ...res.locals, foundAlbum };

    return next();
  };

  public paramsGenreIdExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { genreId } = req.params;

    const foundGenre = await prisma.genre.findFirst({
      where: { id: Number(genreId) },
    });

    if (!foundGenre) {
      throw new AppError("Genre not found!", 404);
    }

    res.locals = { ...res.locals, foundGenre };

    return next();
  };
}

export const ensure = new EnsureMiddleware();
