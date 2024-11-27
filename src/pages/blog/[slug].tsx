import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import RichTextRenderer from '@/components/richtext/RichTextRenderer';
import { Document } from '@contentful/rich-text-types';
import { getAllBlogs, getBlogBySlug } from '../../../lib/api';

interface BlogProps {
  blog: {
    metatitle: string;
    metadescription: string;
    data:string;
    image: string;
    title: string;
    slug: string;
    content: {
      json: Document;
      links: {
        assets: {
          block: {
            sys:{id:string}
            url: string;
            title: string;
            description: string;
            width: number;
            height: number;
            contentType: string;
          }[];
        };
      };
    };
  };
}

const BlogPage: React.FC<BlogProps> = ({ blog }) => {
 

  return (
    <Layout
    image={blog.image}
      metatitle={blog.metatitle}
      metadescription={`Read more about ${blog.metadescription}`}
    >
    
      <section className="relative z-10 pb-18 pt-30 lg:pt-35 xl:pt-40">
        <div className="absolute left-0 top-25 -z-1 flex w-full flex-col gap-3 opacity-50">
          <div className="footer-bg-gradient h-[1.24px] w-full"></div>
          <div className="footer-bg-gradient h-[2.47px] w-full"></div>
          <div className="footer-bg-gradient h-[3.71px] w-full"></div>
          <div className="footer-bg-gradient h-[4.99px] w-full"></div>
          <div className="footer-bg-gradient h-[6.19px] w-full"></div>
          <div className="footer-bg-gradient h-[7.42px] w-full"></div>
          <div className="footer-bg-gradient h-[8.66px] w-full"></div>
          <div className="footer-bg-gradient h-[9.90px] w-full"></div>
          <div className="footer-bg-gradient h-[13px] w-full"></div></div>
          <div className="absolute bottom-0 left-0 -z-1 h-24 w-full bg-gradient-to-b from-dark/0 to-dark"></div>
          <div className="px-4 text-center">
            <h1 className="mb-5.5 text-heading-2 font-extrabold text-white">{blog.title}</h1>
            <ul className="flex items-center justify-center gap-2">
              <li className="font-medium"><a href="/">Home</a></li><li className="font-medium">/ Blog Details</li></ul></div></section>
      <div className="container mx-auto px-4 py-8 mt-10">
       
        {/* Передаем json и links */}
        <RichTextRenderer content={blog.content.json} links={blog.content.links} blog={blog} />
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await getAllBlogs('ro-RO'); // Используйте нужную локаль

  const paths = blogs.map((blog) => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // "Blocking" для SSR на запрос
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!;
  const locale = context.locale || 'ro-RO'; // Установите локаль по умолчанию
  const blog = await getBlogBySlug(slug as string, locale);

  if (!blog) {
    return { notFound: true }; // Возвращаем 404, если блог не найден
  }

  return {
    props: {
      blog,
    },
    revalidate: 60, // Устанавливаем ISR
  };
};

export default BlogPage;
