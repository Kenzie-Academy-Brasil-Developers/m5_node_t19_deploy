import { Request, Response } from "express";
import { AlbumService } from "../services";

export class AlbumController {
  private albumService: AlbumService = new AlbumService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const newAlbum = await this.albumService.create(req.body);
    return res.status(201).json(newAlbum);
  };

  public read = async (_: Request, res: Response): Promise<Response> => {
    const allAlbums = await this.albumService.read();
    return res.status(200).json(allAlbums);
  };

  public retrieve = async (_: Request, res: Response): Promise<Response> => {
    const { foundAlbum } = res.locals;
    const album = await this.albumService.retrieve(foundAlbum);

    return res.status(200).json(album);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    await this.albumService.delete(req.params.albumId);
    return res.status(204).json();
  };
}
