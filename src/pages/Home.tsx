import Feed from "../components/post/Feed";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto py-10">
        <Feed />
      </div>
    </div>
  );
}
