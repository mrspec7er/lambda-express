import { NextFunction, Request, Response } from "express";

async function verifyUser(req: Request, res: Response, next: NextFunction) {
  if (req.oidc.user) {
    console.log(req.oidc.user);

    next();
  }

  return res.status(403).json({
    message: "Unauthenticate user!",
  });
}

// async function verifyUser(req: Request, res: Response, next: NextFunction) {
//     if (req.oidc.user) {
//       next();
//     }

//     return res.status(203).json({
//       message: "unauthorize user",
//     });
//   }

export { verifyUser };
