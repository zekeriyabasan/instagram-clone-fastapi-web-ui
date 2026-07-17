import dayjs from "dayjs";
import type { Post } from "../../types/post";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-gray-300" />

        <div>
          <h2 className="font-semibold">{post.user.username}</h2>

          <p className="text-xs text-gray-500">
            {dayjs(post.timestamp).format("DD.MM.YYYY HH:mm")}
          </p>
        </div>
      </div>

      {post.image_url && (
        <img
          src={import.meta.env.VITE_API_URL + '/' + post.image_url}
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
      </div>
    </div>
  );
}
