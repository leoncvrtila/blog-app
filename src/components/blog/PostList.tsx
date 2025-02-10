"use client";

import { useState, useEffect } from "react";
import { Post } from "../../types/post";
import PostCard from "./PostCard";
import { fetchMorePosts } from "@/services/postService";

interface PostListProps {
  initialPosts: Post[];
}

const POSTS_PER_PAGE = 6;
const HASHTAGS = [
  "#AI",
  "#TechNews",
  "#Blockchain",
  "#MemeCoin",
  "#WebDev",
  "#CyberSecurity",
];

const PostList: React.FC<PostListProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);

  const assignRandomHashtags = (post: Post) => {
    const randomTags = HASHTAGS.sort(() => 0.5 - Math.random()).slice(0, 2); 
    return { ...post, hashtags: randomTags };
  };

  useEffect(() => {
    setPosts(initialPosts.map(assignRandomHashtags));
  }, [initialPosts]);

  const loadMorePosts = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const newPosts = await fetchMorePosts(nextPage, POSTS_PER_PAGE);

      if (!newPosts.length) {
        setHasMore(false);
      } else {
        setPosts([...posts, ...newPosts.map(assignRandomHashtags)]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesHashtag = selectedHashtag
      ? post.hashtags.includes(selectedHashtag)
      : true;

    return matchesSearch && matchesHashtag;
  });

  return (
    <div>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedHashtag(null); 
          }}
          className="p-3 border rounded-lg w-full max-w-md"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {HASHTAGS.map((tag) => (
          <button
            key={tag}
            onClick={() =>
              setSelectedHashtag(tag === selectedHashtag ? null : tag)
            }
            className={`px-4 py-2 rounded-lg border ${
              tag === selectedHashtag ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {tag}
          </button>
        ))}
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
