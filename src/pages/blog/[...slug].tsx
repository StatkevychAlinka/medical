import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/layout/Layout";
import RichTextRenderer from "@/components/richtext/RichTextRenderer";
import { useRouter } from "next/router";
import { Document } from "@contentful/rich-text-types";
import { getAllCategory, getBlogsByCategorySlug, getBlogBySlug } from "../../../lib/api";
import Cards from "@/components/pages/Cards";
import Link from "next/link";

interface Blog {
  metatitle: string;
  metadescription: string;
  data: string;
  image: {
    url: string;
    title: string;
  };
  title: string;
  slug: string;
  excerpt: string;
  content: {
    json: Document;
    links: {
      assets: {
        block: {
          sys: { id: string };
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
  category: { name: string; slug: string };
}

interface Props {
  blogs?: Blog[];
  blog?: Blog;
  categories?: { name: string; slug: string }[];
  type: "category" | "post";
  currentSlug?: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllCategory("ro-RO");
  const paths: any[] = [];

  for (const category of categories) {
    paths.push({ params: { slug: [category.slug] } });

    const blogs = await getBlogsByCategorySlug("ro-RO", category.slug);
    blogs.forEach((blog) => {
      paths.push({ params: { slug: [category.slug, blog.slug] } });
    });
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string[] | undefined;
  const locale = context.locale || "en-US";

  if (!slug) {
    return { notFound: true };
  }

  if (slug.length === 1) {
    const blogs = await getBlogsByCategorySlug(locale, slug[0]);
    const categories = await getAllCategory(locale);

    return {
      props: {
        blogs: blogs.map((blog) => ({
          ...blog,
          category: blog.category || { name: "Uncategorized", slug: "uncategorized" },
        })),
        categories,
        type: "category",
        currentSlug: slug[0],
      },
      revalidate: 60,
    };
  }

  if (slug.length === 2) {
    const blog = await getBlogBySlug(slug[1], locale);

    if (!blog) {
      return { notFound: true };
    }

    return {
      props: {
        blog,
        type: "post",
      },
      revalidate: 60,
    };
  }

  return { notFound: true };
};

const DynamicPage = ({ blogs, blog, categories, type, currentSlug }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (type === "category" && blogs && categories) {
    return (
      <Layout image={""} metatitle={""} metadescription={""} slug={`blog/ "" `}>
        <div className="mt-20">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Posts in Category: {currentSlug}
          </h1>

          {/* Categories */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Categories</h2>
            <ul className="mt-4">
              {categories.map((category) => (
                <li key={category.slug} className="mb-2">
                  <Link
                    href={`/blog/${category.slug}`}
                    className={`text-lg ${
                      category.slug === currentSlug
                        ? "font-bold text-blue-500 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    }`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Cards */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Posts</h2>
            <Cards blogs={blogs} />
          </div>
        </div>
      </Layout>
    );
  }

  if (type === "post" && blog) {
    return (
      <Layout
        image={blog.image.url}
        metatitle={blog.metatitle || blog.title}
        metadescription={blog.metadescription || blog.excerpt}
        slug={`blog/${blog.category.slug}/${blog.slug}`}
      >
        <section className="relative z-10 pb-18 pt-30 lg:pt-35 xl:pt-40">
          {/* Breadcrumb */}
          <div className="px-4 text-center">
            <h1 className="mb-5.5 text-3xl font-extrabold text-gray-800 dark:text-white">
              {blog.title}
            </h1>
            <ul className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <li className="font-medium">
                <Link href="/">Home</Link>
              </li>
              <li className="font-medium">
                /<Link href={`/blog/${blog.category.slug}`}>{blog.category.slug}</Link>
              </li>
              <li className="font-medium">/{blog.slug}</li>
            </ul>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 mt-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow rounded-lg">
          {/* Post Content */}
          <div className="post-content">
            <RichTextRenderer
              content={blog.content?.json || { nodeType: "document", content: [] }}
              links={blog.content?.links || {}}
              blog={blog}
            />
          </div>
        </div>
      </Layout>
    );
  }

  return <p>Not Found</p>;
};

export default DynamicPage;
