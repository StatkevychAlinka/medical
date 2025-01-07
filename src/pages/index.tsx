import React, { FC } from "react";
import Layout from "@/components/layout/Layout";
import { getAllPosts, getAllBlogs, getAllCategoryPosts } from "../../lib/api";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import HelpForm from "@/components/contact/HelpForm";
import Cards from "@/components/pages/Cards";
import { useTheme } from "next-themes";

interface Blog {
  category: {
    name: string;
    slug: string;
  };
  title: string;
  excerpt: string;
  slug: string;
  image: {
    url: string;
    title: string;
  };
  data: string;
}

interface Post {
  worktextCollection: {
    items: {
      worktext: string;
      workdescription: string;
      animation: string;
      workimage: { url: string; title: string };
    }[];
  };
  imggradient1: { url: string };
  imggradient2: { url: string };
  imggradient3: { url: string };
  homedescription: string;
  hometitle: string;
  homebuttonstar: { url: string; title: string };
  homedecoration: { url: string; title: string };
  homeimage: { url: string; title: string };
  metadescription: string;
  metatitle: string;
  homebuttontext: string;
  tags: { [key: string]: string };
}
interface PostCategory {
  name: string;
  slug: string;
  description: string;
}

interface Props {
  blogs: Blog[];
  posts: Post[];
  locale: string;
  postCategorydata: PostCategory[];
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const locale = context.locale || "ro-RO";
  const posts = await getAllPosts(locale);
  const blogsData = await getAllBlogs(locale);
  const postCategorydata = await getAllCategoryPosts(locale);

  const blogs = blogsData.map((blog: any) => ({
    category: blog.category || { name: "Uncategorized", slug: "uncategorized" },
    title: blog.title,
    excerpt: blog.excerpt || "No description available",
    slug: blog.slug,
    image: blog.image || { url: "", title: "" },
    data: blog.data || "",
  }));

  return {
    props: {
      postCategorydata,
      posts,
      blogs,
      locale,
    },
  };
};

const Index: FC<Props> = ({ posts, blogs, postCategorydata }) => {
  const router = useRouter();
  const { setTheme } = useTheme();

  const filteredPosts = posts.filter((post) => post.tags?.homepage);

  return (
    <Layout
      metatitle={filteredPosts[0]?.metatitle}
      image={filteredPosts[0]?.homeimage.url}
      metadescription={filteredPosts[0]?.metadescription}
      slug={``}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 via-cyan-700 to-green-600 text-white text-center py-20 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {filteredPosts[0]?.hometitle || "Добро пожаловать!"}
        </h1>
        <p className="text-lg md:text-xl mb-6">
          {filteredPosts[0]?.homedescription ||
            "Откройте для себя лучшие медицинские услуги."}
        </p>
        <button
          className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition duration-300 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          onClick={() => router.push("/contact")}
        >
          {filteredPosts[0]?.homebuttontext || "Свяжитесь с нами"}
        </button>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Популярные категории
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {postCategorydata && postCategorydata.length > 0 ? (
              postCategorydata.map((post) => (
                <div
                  key={post.slug}
                  className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition duration-300 dark:bg-gray-800 dark:shadow-gray-700"
                >
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">
                    {post.name}
                  </h3>
                  <p className="text-gray-500 mb-6 dark:text-gray-300">
                    {post.description || "Описание отсутствует."}
                  </p>
                  <Link
                    href={`/page/${post.slug}`}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Подробнее
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-300">
                Категории не найдены.
              </p>
            )}
          </div>
        </div>
      </div>

     

      {/* Blog Section */}
      <Cards blogs={blogs} />

      {/* Contact Section */}
      <div className="py-16 bg-gradient-to-r from-blue-800 via-cyan-700 to-green-600 text-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Нужна помощь?</h2>
          <p className="text-lg mb-8">
            Свяжитесь с нами, чтобы получить профессиональную консультацию и
            поддержку.
          </p>
          <HelpForm />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
