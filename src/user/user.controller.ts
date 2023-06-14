import userService from "./user.service";
import { Request, Response } from "express";
const userController = {
  register: async function (req: Request, res: Response) {
    const { email, password, name } = req.body;

    const result = await userService.register(
      email,
      password,
      "SUPER USER",
      name,
      true
    );
    return res.status(201).json({
      result,
    });
  },

  getAll: async function (req: Request, res: Response) {
    return res.status(200).json({
      data: await userService.getAll(),
    });
  },
};

export default userController;
