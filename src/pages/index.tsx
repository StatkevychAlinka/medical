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
  


 


  <section>
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="cta-box-gradient relative z-999 overflow-hidden rounded-[30px] bg-dark px-4 py-20 lg:py-25">
       
        <div className="absolute bottom-0 left-0 -z-1 h-full w-full bg-gradient-to-b from-transparent via-purple-500/30 to-purple-900 blur-xl"></div>

<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
  <span className="absolute bottom-0 left-1/2 -z-1 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-500 blur-3xl opacity-30"></span>
  <span className="absolute bottom-0 left-1/2 -z-1 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-blue-400 blur-2xl opacity-50"></span>
  <span className="absolute bottom-0 left-1/2 -z-1 h-[150px] w-[150px] -translate-x-1/2 rounded-full bg-pink-500 blur-xl opacity-60"></span>
</div>


   
          <div className="absolute -bottom-25 left-1/2 -z-1 h-60 w-full max-w-[482px] -translate-x-1/2 overflow-hidden">
            <div className="stars"></div>
            <div className="stars2"></div>
          </div>

       
          <div className="wow fadeInUp text-center">
         
            <h2 className="mb-4.5 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2">
              What are you waiting for?
            </h2>
            <p className="mx-auto mb-9 max-w-[714px] font-light text-white">
              Build SaaS AI applications using OpenAI and Next.js, this kit
              comes with pre-configured and pre-built examples, making it easier
              to quickly kickstart your AI startup.
            </p>
            <a
              
              href="/"
            >
            <button className="button">
  <span className="liquid"></span>  
  <span className="btn-txt">zzz</span>
</button>
            </a>
          </div>
        </div>
      </div>
    </section>








  
  






    </Layout>
  );
};

export default Index;
