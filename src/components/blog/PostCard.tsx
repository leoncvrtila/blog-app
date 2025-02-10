import Link from "next/link";
import { Post } from "../../types/post";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800">
          <Link href={`/post/${post.id}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mt-2">{post.body.substring(0, 100)}...</p>
        <Link
          href={`/post/${post.id}`}
          className="mt-3 inline-block text-blue-500 hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
