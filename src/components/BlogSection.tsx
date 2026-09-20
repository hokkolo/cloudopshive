import React from 'react';
import { BlogSearch } from './BlogSearch';
import { BlogGrid } from './BlogGrid';
import { useBlogFilter } from '../hooks/useBlogFilter';
import { blogPosts } from '../data/blogPosts';

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

interface BlogSectionProps {
  onReadMore: (post: BlogPost) => void;
  showAll?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onReadMore, showAll = false }) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredPosts
  } = useBlogFilter(blogPosts);

  const postsToShow = showAll ? filteredPosts : filteredPosts.slice(0, 6);

  return (
    <div>
      {showAll && (
        <BlogSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />
      )}
      
      <BlogGrid posts={postsToShow} onReadMore={onReadMore} />
      
      {!showAll && filteredPosts.length > 6 && (
        <div className="text-center mt-8">
          <button
            onClick={() => {
              const blogSection = document.getElementById('blog-full');
              if (blogSection) {
                blogSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            View All Posts
          </button>
        </div>
      )}
    </div>
  );
};