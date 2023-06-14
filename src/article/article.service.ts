import { Article, ArticleStatusType } from "./article.model";
import { EventEmitter } from "eventemitter3";
import userService from "../user/user.service";

const eventEmitter = new EventEmitter();

eventEmitter.on(
  "ARTICLE_PUBLISHED",
  async function (payload: {
    status: "PUBLISH" | "TAKE_DOWN";
    userId: string;
  }) {
    await userService.publishedCount(payload.status, payload.userId);
  }
);

const articleService = {
  create: async function (
    title: string,
    body: string,
    tag: string[],
    authorId: string,
    status: ArticleStatusType
  ) {
    return await Article.create({
      authorId,
      body,
      status,
      tag,
      title,
    });
  },

  getAll: async function () {
    return await Article.find();
  },

  publish: async function (articleId: string) {
    const article = await Article.findById(articleId);

    if (!article) {
      throw new Error("Cannot find article");
    }
    eventEmitter.emit("ARTICLE_PUBLISHED", {
      status: "PUBLISH",
      userId: article.authorId,
    });

    return await Article.updateOne(
      { _id: articleId },
      { $set: { status: ArticleStatusType.PUBLISHED } }
    );
  },
};
export default articleService;
