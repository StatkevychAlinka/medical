// pages/index.tsx

import React, { FC } from "react";
import Layout from "@/components/layout/Layout";
import { getAllPosts, getAllBlogs } from "../../lib/api";
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Home from '@/components/pages/Home';
import HeadAnimate from '@/components/pages/HeadAnimate';
import Features from "@/components/pages/Features";
import HelpForm from "@/components/contact/HelpForm";
import Cards from "@/components/pages/Cards";
import Priority from "@/components/pages/Priority";
import NewTehnologi from "@/components/pages/NewTehnologi";
import Tabs from "@/components/pages/Tab";
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

interface Props {
  blogs: Blog[];
  posts: Post[];
  locale: string;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const locale = context.locale || 'ro-RO';
  const posts = await getAllPosts(true, locale);
  const blogsData = await getAllBlogs(locale);

  // Преобразуем данные из blogCollection в массив объектов Blog
  const blogs = blogsData.map((blog: any) => ({
    category: blog.category || { name: 'Uncategorized', slug: 'uncategorized' },
    title: blog.title,
    excerpt: blog.excerpt || 'No description available',
    slug: blog.slug,
    image: blog.image || { url: '', title: '' },
    data: blog.data || '',
  }));

  return {
    props: {
      posts,
      blogs,
      locale,
    },
  };
};

const Index: FC<Props> = ({ posts, locale, blogs }) => {
  const router = useRouter();

  // Фильтрация постов по тегу "homepage"
  const filteredPosts = posts.filter((post) => post.tags?.homepage);

  return (
    <Layout
      metatitle={filteredPosts[0]?.metatitle}
      image={filteredPosts[0]?.homeimage.url}
      metadescription={filteredPosts[0]?.metadescription}
      slug={``}
    >
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <React.Fragment key={post.hometitle}>
            <Home
              homebuttontext={post.homebuttontext}
              homedecorationsalt={post.homedecoration.title}
              homedecorationurl={post.homedecoration.url}
              homebuttonstaralt={post.homebuttonstar.title}
              homebuttonstarurl={post.homebuttonstar.url}
              hometitle={post.hometitle}
              homedescription={post.homedescription}
              homeimage={post.homeimage.url}
              homeimagetitle={post.homeimage.title}
              post={post.hometitle}
            />
            <HeadAnimate
              imggradient1={post.imggradient1.url}
              imggradient2={post.imggradient2.url}
              imggradient3={post.imggradient3.url}
              wortext={post.worktextCollection?.items}
              programaretitle={post.hometitle}
              programaredescription={post.hometitle}
            />
            <Priority />
            <NewTehnologi />
            <HelpForm />
            <Tabs/>
            <Cards blogs={blogs} />
          </React.Fragment>
        ))
      ) : (
        <p>No posts found with the specified tag.</p>
      )}
    </Layout>
  );
};

export default Index;
