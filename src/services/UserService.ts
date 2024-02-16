import { Detail, User } from "@prisma/client";
import { hash } from "bcryptjs";
import { prisma } from "../database";
import { UserCreate, UserReturn } from "../interfaces";
import { userReturnSchema } from "../schemas";

export class UserService {
  public create = async ({
    detail,
    ...payload
  }: UserCreate): Promise<UserReturn> => {
    payload.password = await hash(payload.password, 10);

    if (!detail) {
      const newUser = await prisma.user.create({
        data: payload,
        include: { detail: true },
      });

      return userReturnSchema.parse(newUser);
    }

    const { id } = await prisma.detail.create({ data: detail });
    const newUser = await prisma.user.create({
      data: { ...payload, detailId: id },
      include: { detail: true },
    });

    return userReturnSchema.parse(newUser);
  };

  public read = async (): Promise<Array<UserReturn>> => {
    const allUsers = await prisma.user.findMany({ include: { detail: true } });
    return userReturnSchema.array().parse(allUsers);
  };

  public partialUpdate = async (
    { id: userId, detailId }: User,
    { detail, ...payload }: Partial<UserCreate>
  ): Promise<UserReturn> => {
    const defaultOpts = { include: { detail: true }, where: { id: userId } };

    if (payload.password) {
      payload.password = await hash(payload.password, 10);
    }

    if (detail && !detailId) {
      const user = await prisma.user.update({
        data: { ...payload, detail: { create: detail } },
        ...defaultOpts,
      });

      return userReturnSchema.parse(user);
    }

    const user = await prisma.user.update({
      data: { ...payload, detail: { update: detail as Partial<Detail> } },
      ...defaultOpts,
    });

    return userReturnSchema.parse(user);
  };
}
