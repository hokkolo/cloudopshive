@@ .. @@
 import React, { useState, useEffect } from 'react';
 import { Cloud, Server, Code, Shield, Check, Mail, Phone, MapPin, X } from 'lucide-react';
+import { BlogCard } from './components/BlogCard';
+import { BlogModal } from './components/BlogModal';
+import { blogPosts } from './data/blogPosts';
+
+interface BlogPost {
+  id: string;
+  title: string;
+  excerpt: string;
+  author: string;
+  date: string;
+  readTime: string;
+  category: string;
+  image: string;
+  content: string;
+}
 
 function App() {
   const [isScrolled, setIsScrolled] = useState(false);
   const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
   const [showModal, setShowModal] = useState(false);
+  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
+  const [showBlogModal, setShowBlogModal] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [formData, setFormData] = useState({
     name: '',
@@ .. @@
           <div className="hidden md:flex space-x-6">
             <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-amber-500">Services</button>
+            <button onClick={() => scrollToSection('blog')} className="text-gray-600 hover:text-amber-500">Blog</button>
             <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-amber-500">Pricing</button>
             <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-amber-500">Contact</button>
           </div>
@@ .. @@
         </div>
       </section>

+      {/* Blog Section */}
+      <section id="blog" className="py-20 bg-gray-50">
+        <div className="container mx-auto px-4">
+          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Latest Insights</h2>
+          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
+            Stay updated with the latest trends, best practices, and insights in cloud operations and DevOps
+          </p>
+          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
+            {blogPosts.slice(0, 4).map((post) => (
+              <BlogCard
+                key={post.id}
+                post={post}
+                onReadMore={(post) => {
+                  setSelectedBlogPost(post);
+                  setShowBlogModal(true);
+                }}
+              />
+            ))}
+          </div>
+        </div>
+      </section>
+
       {/* Pricing Section */}
       <section id="pricing" className="py-20 bg-gray-50">
@@ .. @@
       <section id="pricing" className="py-20 bg-gray-50">
+      <section id="pricing" className="py-20 bg-white">
         <div className="container mx-auto px-4">
@@ .. @@
       </section>

       {/* Contact Section */}
-      <section id="contact" className="py-20 bg-white">
+      <section id="contact" className="py-20 bg-gray-50">
         <div className="container mx-auto px-4">
@@ .. @@
           </div>
         </div>
       )}
+
+      {/* Blog Modal */}
+      {selectedBlogPost && (
+        <BlogModal
+          post={selectedBlogPost}
+          isOpen={showBlogModal}
+          onClose={() => {
+            setShowBlogModal(false);
+            setSelectedBlogPost(null);
+          }}
+        />
+      )}
     </div>
   );
 }