import { Link } from "react-router-dom";

// Simple static list (you could also generate this dynamically later)
const blogs = [
  { slug: "first-post", title: "First Post" },
  { slug: "second-post", title: "Second Post" },
  { slug: "third-post", title: "Third Post" },
];

export default function BlogList() {
  return (
    <div className="pt-24 max-w-3xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog.slug} className="p-4 border rounded hover:shadow">
            <Link
              to={`/blogs/${blog.slug}`}
              className="text-xl font-semibold text-amber-600 hover:underline"
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
