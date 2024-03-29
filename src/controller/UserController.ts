import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
  private userService: UserService = new UserService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const newUser = await this.userService.create(req.body);
    return res.status(201).json(newUser);
  };

  public read = async (_: Request, res: Response): Promise<Response> => {
    const allUsers = await this.userService.read();
    return res.status(200).json(allUsers);
  };

  public partialUpdate = async (
    { body }: Request,
    res: Response
  ): Promise<Response> => {
    const { foundUser } = res.locals;
    const user = await this.userService.partialUpdate(foundUser, body);

    return res.status(200).json(user);
  };
}
