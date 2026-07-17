export interface Comment {
  id: number;
  content: string;
  user_id: number;
  username: string;
  post_id: number;
  timestamp: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  image_url_type: string;
  user_id: number;

  timestamp: string;

  user: {
    username: string;
  };

  comments: Comment[];
}

export interface CreatePostRequest {
  title: string;
  content: string;
  image_url: string;
  image_url_type: string;
  user_id: number;
}
