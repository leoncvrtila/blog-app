"use client";

import { useState } from "react";
import { Post } from "../../types/post";
import PostCard from "./PostCard";
import { fetchMorePosts } from "@/services/postService";

interface PostListProps {
  initialPosts: Post[];
}

const POSTS_PER_PAGE = 6;

const PostList: React.FC<PostListProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadMorePosts = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const newPosts = await fetchMorePosts(nextPage, POSTS_PER_PAGE);

      setPosts([...posts, ...newPosts]);
      setCurrentPage(nextPage);
      setHasMore(newPosts.length === POSTS_PER_PAGE);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search posts by keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border rounded-lg w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center mt-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      )}

      {!isLoading && hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMorePosts}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
