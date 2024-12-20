// pages/index.tsx

import React, { FC } from "react";
import Layout from "@/components/layout/Layout";
import { getAllPosts, getAllBlogs} from "../../lib/api";
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Home from '@/components/pages/Home';
import HeadAnimate from '@/components/pages/HeadAnimate';
import Features from "@/components/pages/Features";
import HelpForm from "@/components/contact/HelpForm";
import Image from "next/image";
import  Cards  from "@/components/pages/Cards"
import {IconCloud } from "@/components/animation/tehno";

import NewTehnologi  from "@/components/pages/NewTehnologi";
interface Blog {

  title: string;
  excerpt: string;
  slug:string;
  image: string;
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

// Внесите изменения в getStaticProps
export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const locale = context.locale || 'ro-RO'; // Используем текущую локаль или значение по умолчанию
  const posts = await getAllPosts(true, locale);
  const blogsData = await getAllBlogs(locale); // Загружаем данные для blogs



 
  // Преобразуем данные из blogCollection в массив объектов Blog
  const blogs = blogsData.map((blog: any) => ({
    title: blog.title,
    excerpt: blog.excerpt,
    slug: blog.slug,
    image: blog.image.url,
    data: blog.data,
  }));

  return {
    props: {
      posts,
      blogs, // Передаем преобразованные данные для blogs
      locale,
    },
  };
};


const Index: FC<Props> = ({ posts, locale,blogs }) => {
  const router = useRouter();
 
  
 
  // Фильтрация постов по тегу "homepage"
  const filteredPosts = posts.filter((post) => post.tags?.homepage);

  // Функция для переключения языка
  
  
  return (
    <Layout metatitle={filteredPosts[0]?.metatitle} image={filteredPosts[0]?.homeimage.url} metadescription={filteredPosts[0]?.metadescription}>
 
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
       {/*   <Features
           programaretitle={post.slug}
           programaredescription={post.slug} 
           /> */} 
          

            <NewTehnologi/>
           
<HelpForm 
            />
<Cards blogs={blogs}/>

          </React.Fragment>
        ))
      ) : (
        <p>No posts found with the specified tag.</p>
      )}
  


 


 







  
  






    </Layout>
  );
};

export default Index;
