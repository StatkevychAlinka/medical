import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import RichTextRenderer from '@/components/richtext/RichTextRenderer';
import { Document } from '@contentful/rich-text-types';
import { getAllBlogs, getBlogBySlug } from '../../../lib/api';

interface BlogProps {
  blog: {
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
  if (!blog) {
    return (
      <Layout metatitle="Blog Not Found" metadescription="Blog not found">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-xl text-gray-700">Blog not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      metatitle={blog.title}
      metadescription={`Read more about ${blog.title}`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">{blog.title} {blog.content.links.assets.block.map(asset => asset.sys.id).join(', ')}</h1>
        {/* Передаем json и links */}
        <RichTextRenderer content={blog.content.json} links={blog.content.links} />
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
