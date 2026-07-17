import { useQuery } from "@tanstack/react-query";
import { postService } from "../../services/post.service";
import PostCard from "./PostCard";

export default function Feed() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: postService.getPosts,
  });

  if (isLoading) {
    return <div className="text-center py-10">Gönderiler yükleniyor...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Gönderiler yüklenemedi.
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="text-center text-gray-500 py-10">Henüz gönderi yok.</div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
