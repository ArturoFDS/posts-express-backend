import { NextFunction, Request, Response } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";
interface userCookiesRequest extends Request {
  userId: string | JwtPayload;
  cookies: {
    IToken: string;
  };
}

export function IsLoggedMiddleware(
  request: userCookiesRequest | any,
  response: Response,
  next: NextFunction
) {
  const { IToken } = request.cookies;
  if (IToken) {
    const decoded = JWT.verify(
      IToken,
      process.env.JWT_SECRET_KEY as string | ""
    );
    console.log(IToken)
    request.userId = decoded;
    next();
  } else {
    response.status(407).json({
      message: "You are not authenticated",
    });
  }
}
