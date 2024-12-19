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
  const iconSlugs = [
    "react",
    "next-dot-js",
    "typescript",
    "javascript",
    "node-dot-js",
    "html5",
    "css3",
    "sass",
    "bootstrap",
    "tailwindcss",
    "webpack",
    "babel",
    "eslint",
    "jest",
    "redux",
    "graphql",
    "apollo-graphql",
    "firebase",
    "mongodb",
    "postgresql",
    "mysql",
    "docker",
    "kubernetes",
    "github",
    "gitlab",
    "bitbucket",
    "figma",
    "adobe-photoshop",
    "adobe-illustrator",
    "adobe-xd",
    "sketch",
    "vue-dot-js",
    "angular",
    "python",
    "django",
    "flask",
    "php",
    "laravel",
    "ruby",
    "rails",
    "java",
    "spring",
    "swift",
    "kotlin",
    "android",
    "ios",
  ];
  
 
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
  


  <IconCloud iconSlugs={iconSlugs}  />


  <section>
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="cta-box-gradient relative z-999 overflow-hidden rounded-[30px] bg-dark px-4 py-20 lg:py-25">
       
          <div className="absolute bottom-0 left-0 -z-1 h-full w-full bg-[url(https://ai-tool.nextjstemplates.com/images/cta/grid.svg)] bg-cover bg-bottom bg-no-repeat"></div>

        
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <span className="absolute bottom-0 left-1/2 -z-1 h-full w-full -translate-x-1/2">
              <Image
                alt="blur"
                src="https://ai-tool.nextjstemplates.com/images/blur/blur-22.svg"
                layout="fill"
                objectFit="cover"
                className="max-w-none"
              />
            </span>
            <span className="absolute bottom-0 left-1/2 -z-1 h-full w-full -translate-x-1/2">
              <Image
                alt="blur"
                src="https://ai-tool.nextjstemplates.com/images/blur/blur-23.svg"
                layout="fill"
                objectFit="cover"
                className="max-w-none"
              />
            </span>
            <span className="absolute bottom-0 left-1/2 -z-1 aspect-[530/253] max-w-[530px] -translate-x-1/2">
              <Image
                alt="blur"
                src="https://ai-tool.nextjstemplates.com/images/blur/blur-24.svg"
                layout="fill"
                objectFit="cover"
                className="max-w-none"
              />
            </span>
          </div>

   
          <div className="absolute -bottom-25 left-1/2 -z-1 h-60 w-full max-w-[482px] -translate-x-1/2 overflow-hidden">
            <div className="stars"></div>
            <div className="stars2"></div>
          </div>

       
          <div className="wow fadeInUp text-center">
         
            <h2 className="mb-4.5 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2">
              What are you waiting for?
            </h2>
            <p className="mx-auto mb-9 max-w-[714px] font-medium">
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
