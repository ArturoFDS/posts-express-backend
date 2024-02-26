import { PrismaClient } from "@prisma/client";
import {
  IUserLoginCredentials,
  IUserRegisterCredentials,
} from "../../types/user.types";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

class UserServices {
  public async LoginService({ email, password }: IUserLoginCredentials) {
    try {
      const user = await prisma.user.findFirstOrThrow({ where: { email } });
      const passwordCompare = bcrypt.compareSync(password, user?.password);
      if (passwordCompare) {
        return user;
      }
    } catch (error) {
      const errorMessage = (error as string) || undefined;
      throw new Error(errorMessage);
    }
  }

  public async RegisterService({
    username,
    email,
    password,
  }: IUserRegisterCredentials) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
      const newUser = await prisma.user
        .create({
          data: {
            email,
            username,
            password: hashedPassword,
          },
        })
        .catch((error) => error);
      return newUser;
    } catch (error) {
      const errorMessage = (error as string) || undefined;
      throw new Error(errorMessage);
    }
  }
}

export default UserServices;
