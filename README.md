# Blog Application with Next.js (Pages Router) and Tailwind CSS

## **Overview**

This project is a **Next.js 13+ (Pages Router) blog application** with:

- **Static Generation (SSG) using `getStaticProps` and `getStaticPaths`**.
- **Dynamic Load More Pagination** (fetches more posts on button click).
- **Search Functionality** (Filter posts by keywords).
- **Tailwind CSS for Material Design-inspired styling**.
- **Optimized API fetching** to improve performance.

---

## **Features**

✅ **Pages Router (Next.js 13+)** – Uses `getStaticProps` and `getStaticPaths` for SSG.
✅ **Static Generation (SSG)** – Loads the first posts at build time.
✅ **Dynamic Pagination** – "Load More" fetches new posts dynamically.
✅ **Loading Indicator** – Spinner appears while fetching more posts.
✅ **Search Filtering** – Users can search posts dynamically.
✅ **Material Design with Tailwind CSS** – Clean UI with responsive layout.
✅ **Fully Responsive** – Works on desktop, tablet, and mobile.

---

## **Installation & Setup**

### **1. Clone the Repository**

```sh
git clone https://github.com/leoncvrtila/blog-app.git
cd blog-app
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Run the Development Server**

```sh
npm run dev
```

Then, open `http://localhost:3000` in your browser.

### **4. Build for Production**

```sh
npm run build && npm start
```

### **5. Deploy to Vercel**

```sh
npm install -g vercel
vercel
```

---

## **Project Structure**

```
blog-app/
│── pages/
│   ├── _app.tsx  (Global Layout Wrapper)
│   ├── index.tsx  (Homepage with blog posts)
│   ├── post/
│   │   ├── [id].tsx  (Post details page - Static Generation)
│── components/
│   ├── common/
│   │   ├── Navbar.tsx  (Top navigation bar)
│   ├── blog/
│   │   ├── PostCard.tsx  (Single post preview card)
│   │   ├── PostList.tsx  (Post list with Load More pagination and Search)
│── services/
│   ├── postService.ts  (API calls to fetch posts)
│── styles/
│── types/
│   ├── post.ts  (TypeScript interface for posts)
│── public/
│── package.json
│── tailwind.config.js
│── README.md
```

---

## **Technical Implementation**

### **Fetching Data in Next.js Pages Router**

- **Homepage (`pages/index.tsx`) fetches first 6 posts at build time using `getStaticProps`**:

```tsx
export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetchPosts();
  return { props: { initialPosts: posts.slice(0, 6) } };
};
```

- **Post details (`pages/post/[id].tsx`) are statically generated using `getStaticPaths` and `getStaticProps`**:

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts();
  return {
    paths: posts.map((post) => ({ params: { id: post.id.toString() } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await fetchPostById(params?.id as string);
  return { props: { post } };
};
```

### **API Service (Fetching Posts Dynamically)**

- Fetch **first 6 posts** at build time:

```tsx
export const fetchPosts = async (): Promise<Post[]> => {
  return fetch(`${API_URL}?_limit=6&_page=1`).then((res) => res.json());
};
```

- Fetch **more posts dynamically** when "Load More" is clicked:

```tsx
export const fetchMorePosts = async (
  page: number,
  limit: number
): Promise<Post[]> => {
  return fetch(`${API_URL}?_limit=${limit}&_page=${page}`).then((res) =>
    res.json()
  );
};
```

### **Load More Pagination in `PostList.tsx`**

- **Uses `useState` to track the current page and posts**:

```tsx
const [posts, setPosts] = useState<Post[]>(initialPosts);
const [currentPage, setCurrentPage] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);
```

- **Dynamically fetches new posts on button click**:

```tsx
const loadMorePosts = async () => {
  setIsLoading(true);
  const newPosts = await fetchMorePosts(currentPage + 1, 6);
  setPosts([...posts, ...newPosts]);
  setCurrentPage((prev) => prev + 1);
  setHasMore(newPosts.length === 6);
  setIsLoading(false);
};
```

### **Navbar with Material UI Design (Using Tailwind CSS)**

```tsx
<nav className="bg-blue-600 text-white shadow-md fixed w-full top-0 z-50">
  <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-3">
    <Link href="/" className="text-2xl font-semibold tracking-wide">
      BlogApp
    </Link>
    <div className="space-x-4">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <Link href="/about" className="hover:underline">
        About
      </Link>
    </div>
  </div>
</nav>
```

---

## **Enhancements & Future Improvements**

- **Real Backend Integration:** Replace JSONPlaceholder API with a real CMS (e.g., Strapi, Contentful).
- **User Authentication:** Implement authentication via Firebase or NextAuth.
- **Content Management:** Add features for users to create and manage blog posts.
- **Infinite Scrolling:** Replace "Load More" with infinite scrolling for a smoother experience.

---

## **License**

This project is licensed under the MIT License.
