import React from 'react';
import { BlogCard } from './BlogCard';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}

interface BlogGridProps {
  posts: BlogPost[];
  onReadMore: (post: BlogPost) => void;
}

export const BlogGrid: React.FC<BlogGridProps> = ({ posts, onReadMore }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No blog posts found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          post={post}
          onReadMore={onReadMore}
        />
      ))}
    </div>
  );
};