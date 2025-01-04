


const POST_GRAPHQL_FIELDS = `
  worktextCollection(limit: 12) {
    items {
      worktext
      workdescription
      animation
      workimage {
        url
        title
      }
    }
  }
  imggradient1 { url }
  imggradient2 { url }
  imggradient3 { url }
  homedecoration {
    url
    title
  }
  homebuttonstar {
    url
    title
  }
  hometitle
  homedescription
  homeimage {
    url
    title
  }
  metatitle
  metadescription
  homebuttontext

  tags { homepage }
 
`;

const BLOG_FIELDS = `
  title
  slug
  excerpt
  image {
    url
    title
  }
  category {
    name
    slug
  }
  data
  metatitle
  metadescription
`;

// Общая функция выполнения GraphQL-запросов
async function fetchGraphQL(query: string, variables: any = {}, preview = true): Promise<any> {
  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            preview
              ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        body: JSON.stringify({ query, variables }),
        next: { tags: ["posts"] },
      }
    );

    const data = await response.json();

    if (!response.ok || data.errors) {
      throw new Error(
        `GraphQL error: ${data.errors ? JSON.stringify(data.errors) : response.statusText}`
      );
    }

    return data;
  } catch (error) {
    console.error("FetchGraphQL error:", error);
    throw new Error("Failed to fetch data from Contentful");
  }
}

// Вспомогательные функции извлечения данных
function extractEntries(fetchResponse: any, collectionName: string): any[] {
  return fetchResponse?.data?.[collectionName]?.items || [];
}

function extractEntry(fetchResponse: any, collectionName: string): any {
  return fetchResponse?.data?.[collectionName]?.items?.[0] || null;
}


export async function getAllPosts(locale: string, preview = false): Promise<any[]> {
  const query = `
    query GetAllPosts($locale: String!, $preview: Boolean!) {
      postCollection(limit: 5, preview: $preview, locale: $locale) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, { locale, preview }, preview);
  return extractEntries(response, "postCollection");
}


// Запросы для работы с блогами
export async function getAllBlogs(locale: string, preview = false): Promise<any[]> {
  const query = `
    query GetAllBlogs($locale: String!, $preview: Boolean!) {
      blogCollection(limit: 5, preview: $preview, locale: $locale) {
        items {
          ${BLOG_FIELDS}
          content {
            json
            links {
              assets {
                block {
                  sys { id }
                  url
                  title
                  description
                  width
                  height
                  contentType
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, { locale, preview }, preview);
  return extractEntries(response, "blogCollection");
}

export async function getBlogBySlug(slug: string, locale: string, preview = false): Promise<any> {
  const query = `
    query GetBlogBySlug($slug: String!, $locale: String!, $preview: Boolean!) {
      blogCollection(where: { slug: $slug }, limit: 1, preview: $preview, locale: $locale) {
        items {
          ${BLOG_FIELDS}
          content {
            json
            links {
              assets {
                block {
                  sys { id }
                  url
                  title
                  description
                  width
                  height
                  contentType
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, { slug, locale, preview }, preview);
  return extractEntry(response, "blogCollection");
}

export async function getBlogsByCategorySlug(
  locale: string,
  categorySlug: string,
  preview = false
): Promise<any[]> {
  const query = `
    query GetBlogsByCategorySlug($categorySlug: String!, $locale: String!, $preview: Boolean!) {
      blogCollection(
        where: { category: { slug: $categorySlug } },
        preview: $preview,
        locale: $locale
      ) {
        items {
          ${BLOG_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, { categorySlug, locale, preview }, preview);
  return extractEntries(response, "blogCollection");
}

// Запросы для категорий
export async function getAllCategory(locale: string, preview = false): Promise<any[]> {
  const query = `
    query GetAllCategories($locale: String!, $preview: Boolean!) {
      categoryCollection(limit: 5, preview: $preview, locale: $locale) {
        items {
          name
          slug
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, { locale, preview }, preview);
  return extractEntries(response, "categoryCollection");
}

















