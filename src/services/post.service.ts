import api from "../api/axios";
import type { CreatePostRequest, Post } from "../types/post";

export const postService = {
  async getPosts(): Promise<Post[]> {
    const response = await api.get<Post[]>("/posts/");

    return response.data;
  },

  async createPost(post: CreatePostRequest) {
    const response = await api.post("/posts/", post);

    return response.data;
  },

  async deletePost(id: number) {
    await api.delete(`/posts/${id}`);
  },

  async uploadImage(file: File) {
    const formData = new FormData();

    formData.append("image", file);

    const response = await api.post("/posts/upload_image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
