"use client";

import React from "react";
import BlogComponent from "@/app/components/Blog/BlogComponent";
import BlogLayout from "@/app/layout/BlogLayout";

const BlogPage = () => {
  return (
    <BlogLayout>
      <BlogComponent />
    </BlogLayout>
  );
};

export default BlogPage;
