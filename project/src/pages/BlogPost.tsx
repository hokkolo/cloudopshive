import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (!slug) return;

    // load the markdown file from content/blogs
    import(`../content/blogs/${slug}.md`)
      .then((res) => fetch(res.default))
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch(() =>
        setContent("# Not Found\nSorry, this blog post could not be loaded.")
      );
  }, [slug]);

  return (
    <div className="pt-24 max-w-3xl mx-auto px-6">
      <ReactMarkdown className="prose blog-content">{content}</ReactMarkdown>
    </div>
  );
}
