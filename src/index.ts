import serverless from "serverless-http";
import express from "express";
import { Request, Response, NextFunction } from "express";
import dbConnection from "./utility/dbConnection";
import routes from "./routes";
import { auth } from "express-openid-connect";

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "z6YgjwUTMLaJoZSVBEdyhqxg2dTXhYD7",
  issuerBaseURL: "https://dev-ruej8y1rq6ub0fmu.au.auth0.com",
};
const app = express();
app.use(auth(config));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Hello there!, " + new Date().toISOString(),
  });
});

app.get("/status", (req: Request, res: Response) => {
  const userdata = {
    userToken: req.oidc.accessToken,
    userIdToken: req.oidc.idToken,
    user: req.oidc.refreshToken,
  };
  return res.status(200).json({
    data: userdata,
  });
});

dbConnection();

routes(app);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
