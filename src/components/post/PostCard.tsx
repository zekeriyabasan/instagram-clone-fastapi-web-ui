import dayjs from "dayjs";
import type { Post } from "../../types/post";
import { Trash2 } from "lucide-react";
import type { CreateCommentRequest } from "../../types/comment";
import { useState } from "react";

interface Props {
  post: Post;
  onDelete: (id: number) => void;
  onComment: (comment: CreateCommentRequest) => void;
}

export default function PostCard({ post, onDelete, onComment }: Props) {
  const [comment, setComment] = useState("");
  const user_id = JSON.parse(localStorage.getItem("user_id") || "null");

  const handleComment = () => {
    if (comment.trim()) {
      onComment({
        content: comment,
        post_id: post.id
      });
      setComment("");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <img
          src={`https://randomuser.me/api/portraits/men/${post.user_id % 100}.jpg`}
          alt={post.user.username}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <h2 className="font-semibold">{post.user.username}</h2>

          <p className="text-xs text-gray-500">
            {dayjs(post.timestamp).format("DD.MM.YYYY HH:mm")}
          </p>
        </div>
        {post.user_id === user_id && (
          <button
            onClick={() => onDelete(post.id)}
            className="ml-auto p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {post.image_url && (
        <img
          src={import.meta.env.VITE_API_URL + "/" + post.image_url}
          alt={post.title}
          className="w-full max-h-[600px] object-cover"
        />
      )}

      <div className="p-4">
        <h3 className="font-bold text-lg">{post.title}</h3>

        <p className="mt-2 text-gray-700">{post.content}</p>

        <div className="mt-5">
          <h4 className="font-semibold mb-2">Yorumlar</h4>

          {post.comments.length === 0 ? (
            <p className="text-gray-400">Henüz yorum yok.</p>
          ) : (
            post.comments.map((comment) => (
              <div key={comment.id} className="border-t py-2">
                <span className="font-semibold">{comment.username}</span>

                <span className="ml-2">{comment.content}</span>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 flex items-center gap-3 border-t pt-4">
  <input
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Yorum ekle..."
    className="flex-1 outline-none"
  />

  <button
    onClick={handleComment}
    className="text-blue-600 font-semibold hover:text-blue-700"
  >
    Paylaş
  </button>
</div>
      </div>
    </div>
  );
}
