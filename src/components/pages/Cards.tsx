import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface Blogs {
  blogs: {
    category: { name: string; slug: string };
    title: string;
    excerpt: string;
    slug: string;
    image: {
      url: string;
      title: string;
    };
    data: string;
  }[];
}

const Cards: FC<Blogs> = ({ blogs }) => {
  return (
    <>
      <section className="   mb-custom-xl">
        <div className="container mx-auto ">
          {/* Section Header */}
          <div className="text-center mb-custom-lg">
            <h2 className="text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl font-semibold text-gray-800 dark:text-white sm:text-4xl mb-custom-sm">
              Откройте лучшие медицинские услуги
            </h2>
            <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-gray-600 dark:text-gray-300 ">
              Узнайте больше о наших услугах, врачах и последних новостях в
              сфере медицины.
            </p>
          </div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#101e46] shadow-md rounded-lg overflow-hidden group hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={blog.image.url}
                    alt={blog.image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <Link href={`/blog/${blog.category.slug}`}>
                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm px-3 py-1 rounded-full mb-3">
                      {blog.category.name}
                    </span>
                  </Link>

                  {/* Title */}
                  <h3 className="text-h3-sm md:text-h3-md lg:text-h3-lg xl:text-h3-xl font-medium text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    <Link href={`/blog/${blog.category.slug}/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-gray-600 dark:text-gray-300  line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-gray-400 dark:text-gray-500"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 8.75C7.65625 8.75 5.78125 6.90625 5.78125 4.65625C5.78125 2.40625 7.65625 0.5625 10 0.5625C12.3438 0.5625 14.2188 2.40625 14.2188 4.65625C14.2188 6.90625 12.3438 8.75 10 8.75ZM10 1.96875C8.4375 1.96875 7.1875 3.1875 7.1875 4.65625C7.1875 6.125 8.4375 7.34375 10 7.34375C11.5625 7.34375 12.8125 6.125 12.8125 4.65625C12.8125 3.1875 11.5625 1.96875 10 1.96875Z" />
                        <path d="M16.5938 19.4688C16.2188 19.4688 15.875 19.1562 15.875 18.75V17.8438C15.875 14.5938 13.25 11.9688 10 11.9688C6.75 11.9688 4.125 14.5938 4.125 17.8438V18.75C4.125 19.125 3.8125 19.4688 3.40625 19.4688C3 19.4688 2.6875 19.1562 2.6875 18.75V17.8438C2.6875 13.8125 5.96875 10.5625 9.96875 10.5625C13.9688 10.5625 17.25 13.8437 17.25 17.8438V18.75C17.2813 19.125 16.9688 19.4688 16.5938 19.4688Z" />
                      </svg>
                      <span>Обновлено: {blog.data}</span>
                    </div>
                    <Link
                      href={`/blog/${blog.category.slug}/${blog.slug}`}
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Читать
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cards;
