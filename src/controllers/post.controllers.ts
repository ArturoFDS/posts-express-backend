import { Request, Response } from "express";
import PostServices from "../services/post.services";
const postServices = new PostServices();
interface IRequestWithID extends Request {
  userId: `${string}-${string}-${string}-${string}-${string}`;
}
class PostControllers {
  public async createPost(request: IRequestWithID, response: Response) {
    try {
      const { title, content } = request.body;
      const { userId } = request;
      const post = await postServices.createService({
        title,
        content,
        author: userId,
      });
      response.status(201).json({
        message: "Post successfully created",
        data: post,
      });
    } catch (error) {
      response.status(400).json({
        errorMessage: error,
      });
    }
  }
}
