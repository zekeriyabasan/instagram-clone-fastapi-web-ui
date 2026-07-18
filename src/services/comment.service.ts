import api from "../api/axios";
import type { CreateCommentRequest } from "../types/comment";

export const commentService = {
  
  async createComment(post: CreateCommentRequest) {
    const response = await api.post("/comments/", post);

    return response.data;
  }

};
