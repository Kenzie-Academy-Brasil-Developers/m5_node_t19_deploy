import { prisma } from "../database";
import { GenreReturn } from "../interfaces";
import { genreReturnSchema } from "../schemas";

export class GenreService {
  public read = async (): Promise<Array<GenreReturn>> => {
    const genres = await prisma.genre.findMany({
      include: { albums: { include: { owner: { select: { email: true } } } } },
    });

    return genreReturnSchema.array().parse(genres);
  };

  public delete = async (genreId: string): Promise<void> => {
    await prisma.genre.delete({ where: { id: Number(genreId) } });
  };
}
