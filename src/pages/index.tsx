import React, { FC } from "react";
import Layout from "@/components/layout/Layout";
import { getAllPosts, getAllBlogs, getAllCategoryPosts } from "../../lib/api";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import HelpForm from "@/components/contact/HelpForm";
import Cards from "@/components/pages/Cards";
import { useTheme } from "next-themes";
import  HeroSection from "@/components/hero/HeroSection";
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
     
     <HeroSection
     title={filteredPosts[0]?.hometitle}
    description= {filteredPosts[0]?.homedescription }
     />
      {/* Categories Section */}
      <div className="container mx-auto   mb-custom-xl">
  <div className="container mx-auto">
    <h2 className="text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl font-semibold text-center mb-custom-lg  text-text-main dark:text-white">
      Популярные категории
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {postCategorydata && postCategorydata.length > 0 ? (
        postCategorydata.map((post) => (
          <Link href={`/${post.slug}`} key={post.slug}>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 dark:bg-[#101e46] ">
              {/* Добавляем иконку */}
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r bg-background-blue rounded-full p-4">
                  <span className="text-white text-2xl font-bold">
                    {post.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <h3 className="text-h3-sm md:text-h3-md lg:text-h3-lg xl:text-h3-xl font-medium mb-custom-sm text-text-main dark:text-white">
                {post.name}
              </h3>
              <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl  text-text-secondary dark:text-gray-300">
                {post.description || "Описание отсутствует."}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-center text-gray-500 dark:text-gray-300">
          Категории не найдены.
        </p>
      )}
    </div>
  </div>
</div>


     

      {/* Blog Section */}
      <Cards blogs={blogs} />


    </Layout>
  );
};

export default Index;
