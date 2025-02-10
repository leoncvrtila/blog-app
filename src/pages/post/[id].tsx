import { GetStaticPaths, GetStaticProps } from "next";
import { fetchPostById, fetchPosts } from "../../services/postService";
import { Post } from "../../types/post";

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-12">
      <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
      <p className="text-gray-600 mt-4">{post.body}</p>
      <p className="text-sm text-gray-500 mt-6">
        Post ID: {post.id} | Author: {post.userId}
      </p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await fetchPostById(params?.id as string);

  return { props: { post } };
};
