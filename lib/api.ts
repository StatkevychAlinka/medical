


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
  h1
  tags { homepage }
  date
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

// Запросы для работы с постами
export async function getPreviewPostBySlug(slug: string | null, locale: string): Promise<any> {
  const query = `
    query GetPreviewPost($slug: String!, $locale: String!) {
      postCollection(where: { slug: $slug }, preview: true, limit: 1, locale: $locale) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const variables = { slug, locale };
  const response = await fetchGraphQL(query, variables, true);
  return extractEntry(response, "postCollection");
}

export async function getAllPosts(isDraftMode: boolean, locale: string): Promise<any[]> {
  const query = `
    query GetAllPosts($locale: String!, $preview: Boolean!) {
      postCollection(where: { slug_exists: true }, order: date_DESC, preview: $preview, locale: $locale) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const variables = { locale, preview: isDraftMode };
  const response = await fetchGraphQL(query, variables, isDraftMode);
  return extractEntries(response, "postCollection");
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean,
  locale: string
): Promise<any> {
  const postQuery = `
    query GetPost($slug: String!, $locale: String!, $preview: Boolean!) {
      postCollection(where: { slug: $slug }, preview: $preview, limit: 1, locale: $locale) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const morePostsQuery = `
    query GetMorePosts($slug: String!, $locale: String!, $preview: Boolean!) {
      postCollection(where: { slug_not_in: $slug }, order: date_DESC, preview: $preview, limit: 2, locale: $locale) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const postResponse = await fetchGraphQL(postQuery, { slug, locale, preview }, preview);
  const morePostsResponse = await fetchGraphQL(
    morePostsQuery,
    { slug, locale, preview },
    preview
  );

  return {
    post: extractEntry(postResponse, "postCollection"),
    morePosts: extractEntries(morePostsResponse, "postCollection"),
  };
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

















