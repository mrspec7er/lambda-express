import { Express } from "express";
import user from "./user/user.route";
import article from "./article/article.route";

function routes(app: Express) {
  app.use("/v1/users", user);
  app.use("/v1/articles", article);
}

export default routes;
