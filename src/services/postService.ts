import { Post } from "../types/post";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}?_limit=6&_page=1`);
  return response.json();
};

export const fetchMorePosts = async (
  page: number,
  limit: number
): Promise<Post[]> => {
  const response = await fetch(`${API_URL}?_limit=${limit}&_page=${page}`);
  return response.json();
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};
