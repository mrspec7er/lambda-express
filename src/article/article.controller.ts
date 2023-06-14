import articleService from "./article.service";
import { Request, Response } from "express";
import { ArticleStatusType } from "./article.model";
const articleController = {
  create: async function (req: Request, res: Response) {
    const { title, body, tag, userId } = req.body;

    const result = await articleService.create(
      title,
      body,
      tag,
      userId,
      ArticleStatusType.DRAF
    );
    return res.status(201).json({
      result,
    });
  },

  getAll: async function (req: Request, res: Response) {
    return res.status(200).json({
      data: await articleService.getAll(),
    });
  },

  publish: async function (req: Request, res: Response) {
    const { id } = req.params;
    return res.status(201).json({
      data: await articleService.publish(id),
    });
  },
};

export default articleController;
