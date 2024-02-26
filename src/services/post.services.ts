import { IPostProperties } from "../../types/posts.types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class PostServices {
  public async createService({ title, content, author }: IPostProperties) {
    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: author,
        },
      });
      return post;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default PostServices