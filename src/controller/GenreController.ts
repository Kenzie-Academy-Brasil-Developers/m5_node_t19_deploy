import { Request, Response } from "express";
import { GenreService } from "../services";

export class GenreController {
  private genreService: GenreService = new GenreService();

  public read = async (_: Request, res: Response): Promise<Response> => {
    const allGenres = await this.genreService.read();
    return res.status(200).json(allGenres);
  };

  public delete = async (
    { params: { genreId } }: Request,
    res: Response
  ): Promise<Response> => {
    await this.genreService.delete(genreId);
    return res.status(204).json();
  };
}
