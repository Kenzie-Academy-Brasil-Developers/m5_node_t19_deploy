import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prisma } from "../database";
import { AppError } from "../errors";
import { SessionCreate, SessionReturn } from "../interfaces";

export class SessionService {
  public login = async ({
    email,
    password,
  }: SessionCreate): Promise<SessionReturn> => {
    const foundUser = await prisma.user.findFirst({ where: { email } });
    if (!foundUser) {
      throw new AppError("Invalid credentials.", 401);
    }

    const pwdMatch = await compare(password, foundUser.password);
    if (!pwdMatch) {
      throw new AppError("Invalid credentials.", 401);
    }

    // const { secret, expiresIn } = jwtConfig();

    const secret = process.env.SECRET_KEY!;
    const expiresIn = process.env.EXPIRES_IN!;

    const token = sign({ email: foundUser.email }, secret, {
      expiresIn,
      subject: foundUser.id.toString(),
    });

    return { token };
  };
}
