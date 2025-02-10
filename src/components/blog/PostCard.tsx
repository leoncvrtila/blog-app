import { Post } from "../../types/post";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-600 mt-2">{post.body.substring(0, 100)}...</p>

      <div className="flex flex-wrap mt-4">
        {post.hashtags?.map((tag) => (
          <span
            key={tag}
            className="text-blue-500 text-sm mr-2 px-2 py-1 border border-blue-400 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <a href={`/post/${post.id}`} className="text-blue-600 mt-3 inline-block">
        Read More →
      </a>
    </div>
  );
};

export default PostCard;
