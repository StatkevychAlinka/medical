// pages/[locale].tsx

import React from 'react';
import Layout from "@/components/layout/Layout";
import { getAllPosts } from "../../lib/api";
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Home from '@/components/pages/Home';
import HeadAnimate from '@/components/pages/HeadAnimate';

// Определяем интерфейс для поста
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

// Определяем интерфейс для пропсов компонента
interface Props {
  posts: Post[];
  locale: string;
}

// Компонент для локализованной страницы
const LocalePage: React.FC<Props> = ({ posts, locale }) => {
  const router = useRouter();

  // Фильтрация постов по тегу "homepage"
  const filteredPosts = posts.filter((post) => post.tags?.homepage);

  // Функция для переключения языка
  const handleLanguageChange = (newLocale: string) => {
    if (newLocale !== locale) {
      router.push(`/${newLocale}`); // Переключение локали
    }
  };
console.log( handleLanguageChange
 )
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
          </React.Fragment>
        ))
      ) : (
        <p>No posts found with the specified tag.</p>
      )}

      {/* Переключатель языков */}
      <div style={{ marginTop: "20px" }}>
        <p>Please select your language:</p>
        <button onClick={() => handleLanguageChange('en-US')} style={{ marginRight: '10px' }}>
          English
        </button>
        <button onClick={() => handleLanguageChange('ro-RO')}>
          Romanian
        </button>
      </div>
    </Layout>
  );
};

// Статическая генерация путей для каждой локали
export const getStaticPaths: GetStaticPaths = async () => {
  const locales = ['en-US', 'ro-RO'];
  const paths = locales.map((locale) => ({
    params: { locale },
  }));

  return {
    paths,
    fallback: false, // Страницы, которые не существуют, будут возвращать 404
  };
};

// Статическая генерация данных для страницы на основе локали
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string; // Используем локаль из параметров
  const posts = await getAllPosts(true, locale); // Получаем посты на основе локали

  return {
    props: {
      posts,
      locale,
    },
  };
};

export default LocalePage;
