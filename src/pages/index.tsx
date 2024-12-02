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
<HelpForm 
            />
<Cards blogs={blogs}/>

          </React.Fragment>
        ))
      ) : (
        <p>No posts found with the specified tag.</p>
      )}

    <div className="flex justify-center">
<div className="card">
  <div
    aria-label="Abstract gradient background"
    role="img"
    className="card-image"
  >
    <Image
    alt="agg"
    src='https://ayushsingh.co.in/_next/image?url=%2Fprojects%2Fngx-quill-upload.jpg&w=750&q=75'
    width={600}
    height={900}
    objectFit="cover"
    />
  </div>
  <div className="card-content">
    <p className="card-title">Site din Iasi</p>
    <p className="card-description">
     Portfolio
    </p>
    <div className="card-tags">
      <span className="card-tag">Design</span>
      <span className="card-tag">CSS</span>
      <span className="card-tag">HTML</span>
    </div>
    <div className="card-footer">
      <div className="card-stats">
        <span className="card-stat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="card-stat-icon"
          >
            <path
              d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"
            ></path>
          </svg>
          42
        </span>
        <span className="card-stat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="card-stat-icon"
          >
            <path
              d="M17 11v3l-3-3H8a2 2 0 0 1-2-2V2c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1zm-3 2v2a2 2 0 0 1-2 2H6l-3 3v-3H2a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h2v3a4 4 0 0 0 4 4h6z"
            ></path>
          </svg>
          18
        </span>
      </div>
      <a className="card-button" href="#">Explore</a>
    </div>
  </div>
</div>
</div>
    </Layout>
  );
};

export default Index;
