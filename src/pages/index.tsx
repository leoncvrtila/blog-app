import { GetStaticProps } from "next";
import { fetchPosts } from "../services/postService";
import { Post } from "../types/post";
import PostList from "../components/blog/PostList";

interface HomeProps {
  initialPosts: Post[];
}

const POSTS_PER_PAGE = 6;

export default function Home({ initialPosts }: HomeProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold my-6 text-center text-gray-800">
        Blog Posts
      </h1>

      <PostList initialPosts={initialPosts} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetchPosts();
  return { props: { initialPosts: posts.slice(0, POSTS_PER_PAGE) } };
};
