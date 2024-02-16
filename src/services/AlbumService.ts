import { Album } from "@prisma/client";
import { prisma } from "../database";
import { AlbumCreate, AlbumReturn } from "../interfaces";
import { albumReturnSchema } from "../schemas";

export class AlbumService {
  public create = async ({
    genres,
    ...payload
  }: AlbumCreate): Promise<AlbumReturn> => {
    const newAlbum = await prisma.album.create({
      data: { ...payload, genres: { create: genres } },
      include: { owner: true, genres: true },
    });

    return albumReturnSchema.parse(newAlbum);
  };

  public read = async (): Promise<Array<AlbumReturn>> => {
    const allAlbums = await prisma.album.findMany({
      include: { owner: true, genres: true },
    });
    return albumReturnSchema.array().parse(allAlbums);
  };

  public retrieve = async (foundAlbum: Album): Promise<AlbumReturn> => {
    return albumReturnSchema.parse(foundAlbum);
  };

  public delete = async (albumId: string): Promise<void> => {
    await prisma.album.delete({ where: { id: Number(albumId) } });
  };
}
