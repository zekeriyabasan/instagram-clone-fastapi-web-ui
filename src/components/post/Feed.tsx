import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postService } from "../../services/post.service";
import PostCard from "./PostCard";
import CreatePostForm from "./CreatePostForm";
import { commentService } from "../../services/comment.service";
import { useAuthStore } from "../../store/authStore";

export default function Feed() {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: postService.getPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: postService.deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: postService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const createCommentMutation = useMutation({
  mutationFn: commentService.createComment,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
  },
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
    <div className="flex justify-end">
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={handleLogout}
      >
        Logout
      </button>
    </div>

    <CreatePostForm onCreate={(post) => createMutation.mutate(post)} />

    {posts.map((post) => (
      <PostCard
        key={post.id}
        post={post}
        onDelete={(id) => deleteMutation.mutate(id)}
        onComment={(comment) => createCommentMutation.mutate(comment)}
      />
    ))}
  </div>
);
}
