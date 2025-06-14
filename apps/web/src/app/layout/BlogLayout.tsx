import React from "react";
import BlogNav from "../components/Blog/BlogNav";
import BlogFooter from "../components/Blog/BlogFooter";

const BlogLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen  bg-landing-bg">
      <BlogNav />
      {children}
      <BlogFooter />
    </main>
  );
};

export default BlogLayout;
