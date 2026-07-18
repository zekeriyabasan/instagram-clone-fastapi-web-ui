import { useState } from "react";
import { Image, Loader2, SendHorizontal } from "lucide-react";
import { postService } from "../../services/post.service";
import type { CreatePostRequest } from "../../types/post";

interface Props {
  onCreate: (post: CreatePostRequest) => void;
}

export default function CreatePostForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const user_id = JSON.parse(localStorage.getItem("user_id") || "{}");
  const username = localStorage.getItem("username");

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    try {
      setUploading(true);

      const file = e.target.files[0];

      const response = await postService.uploadImage(file);

      // Backend:
      // { image_url: "images/abc.jpg" }

      setImageUrl(response.image_url);
    } catch (err) {
      console.error(err);
      alert("Resim yüklenemedi.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    onCreate({
      title,
      content,
      image_url: imageUrl,
      image_url_type: "relative",
      user_id: user_id,
    });

    setTitle("");
    setContent("");
    setImageUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={`https://api.dicebear.com/9.x/notionists/svg?seed=${"asd"}`}
          alt={username || "unknown"}
          className="w-12 h-12 rounded-full border"
        />

        <div>
          <h2 className="font-semibold text-lg">{username}</h2>
          <p className="text-sm text-gray-500">
            Bugün ne paylaşmak istiyorsun?
          </p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Düşüncelerini paylaş..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Resim Önizleme */}
      {imageUrl && (
        <img
          src={`${import.meta.env.VITE_API_URL}/${imageUrl}`}
          className="rounded-xl mb-4 max-h-80 w-full object-cover"
        />
      )}

      <div className="flex items-center justify-between mt-5 gap-4">
        <label className="flex items-center gap-2 cursor-pointer border rounded-xl px-4 py-3 hover:bg-gray-50 transition">
          {uploading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Image size={20} />
          )}

          <span>
            {uploading ? "Yükleniyor..." : "Fotoğraf Seç"}
          </span>

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>

        <button
          type="submit"
          disabled={uploading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl transition font-medium"
        >
          <SendHorizontal size={18} />
          Paylaş
        </button>
      </div>
    </form>
  );
}