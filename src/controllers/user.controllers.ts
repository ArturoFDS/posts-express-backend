import { Response, Request } from "express";
import UserServices from "../services/user.services";
import JWT from "jsonwebtoken";
const userServices = new UserServices();
class UserControllers {
  public async LoginHandler(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        response.status(400).json({
          message: "Missing properties in request",
        });
      }
      const serviceResponse = await userServices.LoginService({
        email,
        password,
      });
      const signCookie = JWT.sign(
        email,
        process.env.JWT_SECRET_KEY as string | ""
      );
      response.cookie("IToken", signCookie);
      response.status(200).json({
        message: "Successfully logged in",
        data: serviceResponse,
      });
    } catch (error) {
      const errorMessage = (error as string) || undefined;
      response.status(400).send(errorMessage);
    }
  }

  public async RegisterHandler(request: Request, response: Response) {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
      response.status(400).json({
        message: "Missing properties in request",
      });
    }
    const serviceResponse = await userServices.RegisterService({
      username,
      email,
      password,
    });
    response.status(201).json({
      message: "Successfully created",
      data: serviceResponse,
    });
  }

  public LogoutHandler(request: Request, response: Response) {
    response.clearCookie("IToken").end();
  }
}

export default UserControllers;
