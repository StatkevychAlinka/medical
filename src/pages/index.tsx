// pages/index.tsx

import React, { FC } from "react";
import Layout from "@/components/layout/Layout";
import { getAllPosts } from "../../lib/api";
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Home from '@/components/pages/Home';
import HeadAnimate from '@/components/pages/HeadAnimate';
import Features from "@/components/pages/Features";
import HelpForm from "@/components/contact/HelpForm";
interface Post {
  worktextCollection: {
    items: {
      worktext: string;
      workdescription: string;
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
  slug: string;
  tags: { [key: string]: string };
}

interface Props {
  posts: Post[];
  locale: string;
}

// Статическая генерация данных для каждой локали
export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const locale = context.locale || 'ro-RO'; // Используем текущую локаль или значение по умолчанию
  const posts = await getAllPosts(true, locale);

  return {
    props: {
      posts,
      locale,
    },
  };
};

const Index: FC<Props> = ({ posts, locale }) => {
  const router = useRouter();

  // Фильтрация постов по тегу "homepage"
  const filteredPosts = posts.filter((post) => post.tags?.homepage);

  // Функция для переключения языка
  

  return (
    <Layout metatitle="Home" metadescription="Welcome to our site!">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <React.Fragment key={post.slug}>
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
              post={post.slug}
            />
            <HeadAnimate
              imggradient1={post.imggradient1.url}
              imggradient2={post.imggradient2.url}
              imggradient3={post.imggradient3.url}
              wortext={post.worktextCollection?.items}
              programaretitle={post.slug}
              programaredescription={post.slug}
            />
       {/*   <Features
           programaretitle={post.slug}
           programaredescription={post.slug} 
           /> */} 
<HelpForm 
            />

          </React.Fragment>
        ))
      ) : (
        <p>No posts found with the specified tag.</p>
      )}

    

   
    </Layout>
  );
};

export default Index;
