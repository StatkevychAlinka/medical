


const POST_GRAPHQL_FIELDS = `
  worktextCollection(limit: 12) {
    items {
      worktext
      workdescription
    
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




export async function getCityBySlug(slug: string, locale: string, preview = false): Promise<any> {
  const query = `
    query GetCityBySlug($slug: String!, $locale: String!, $preview: Boolean!) {
      bigsityCollection(
        where: { slug: $slug },
        preview: $preview,
        locale: $locale
      ) {
        items {
          name
          slug
          description
          metatitle
          metadescription
          textone  
          texttwo  
          metaimage {
           url
           title
          }



         
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, { slug, locale, preview }, preview);
  const entries = extractEntries(response, "bigsityCollection");
  return entries.length > 0 ? entries[0] : null;
}



export async function getSubcategoryBySlug(
  slug: string,
  locale: string,
  preview = false
): Promise<any> {
  const query = `
    query GetSubcategoryBySlug($slug: String!, $locale: String!, $preview: Boolean!) {
      subcategoryCollection(
        where: { slug: $slug },
        preview: $preview,
        locale: $locale
      ) {
        items {
          name
          slug
          description
         bigsity{
         slug
         name
         }
         medicategory{
         slug
         name
         }
        }
      }
    }
  `;

  const variables = { slug, locale, preview };

  try {
    const response = await fetchGraphQL(query, variables, preview);
    const entries = extractEntries(response, "subcategoryCollection");
    return entries.length > 0 ? entries[0] : null;
  } catch (error) {
    console.error("Ошибка при запросе подкатегории:", error);
    return null;
  }
}









export async function getAllCategoryPosts(locale: string, preview = false): Promise<any[]> {
  const query = `
    query GetAllCategoryPosts($locale: String!, $preview: Boolean!) {
     medicategoryCollection(limit: 5, preview: $preview, locale: $locale) {
        items {
         name
         slug
         description
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, { locale, preview }, preview);
  return extractEntries(response, "medicategoryCollection");
}
export async function getCategoryBySlug(slug: string, locale: string, preview = false): Promise<any> {
  const query = `
    query GetCategoryBySlug($slug: String!, $locale: String!, $preview: Boolean!) {
       medicategoryCollection(
        where: { slug: $slug },
        preview: $preview,
        locale: $locale
      ) {
        items {
          name
          slug
          description
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, { slug, locale, preview }, preview);
  const entries = extractEntries(response, "medicategoryCollection");
  return entries.length > 0 ? entries[0] : null;
}












export async function getCitiesByCategorySlug(
  locale: string,
  categorySlug: string,
  preview = false
): Promise<any[]> {
  const query = `
    query GetCitiesByCategorySlug($categorySlug: String!, $locale: String!, $preview: Boolean!) {
      bigsityCollection(
        where: { medicategory: { slug: $categorySlug } },
        preview: $preview,
        locale: $locale
      ) {
        items {
          name
          slug
          description
        }
      }
    }
  `;

  // Выполняем GraphQL-запрос
  const response = await fetchGraphQL(query, { categorySlug, locale, preview }, preview);

  // Извлекаем элементы из "cityCollection"
  const entries = extractEntries(response, "bigsityCollection");

  // Возвращаем массив городов
  return entries;
}





export async function getSubcategoriesByCitySlug(
  locale: string,
  citySlug: string, // Добавлен citySlug для фильтрации
  preview = false   // Необязательный параметр для предпросмотра
): Promise<any[]> {
  const query = `
    query GetSubcategoriesByCitySlug($citySlug: String!, $locale: String!, $preview: Boolean!) {
      subcategoryCollection(
     
        where: { bigsity: { slug: $citySlug } }, 
        preview: $preview, 
        locale: $locale
      ) {
        items {
          name
        slug
        description
         medicategory{
         slug
         name
         }
        }
      }
    }
  `;

  // Переменные для запроса
   // Выполняем GraphQL-запрос
   const response = await fetchGraphQL(query, {  citySlug, locale, preview }, preview);

   // Извлекаем элементы из "cityCollection"
   const entries = extractEntries(response, "subcategoryCollection");
 
   // Возвращаем массив городов
   return entries;
}


export async function getClinicsByCitySlug(locale: string, citySlug: string) {
  const query = `
    query GetClinicsByCitySlug($citySlug: String!, $locale: String!) {
      clinicCollection(where: { bigsity: { slug: $citySlug } }, locale: $locale) {
        items {
          name
          slug
          description
          practics
          address
          rating
          reviews
          phone
schedule
website
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, { citySlug, locale });
  const entries = extractEntries(response, "clinicCollection");
  return entries;
}



export async function getDoctorsByCitySlug(locale: string, citySlug: string) {
  const query = `
    query GetDoctorsByCitySlug($citySlug: String!, $locale: String!) {
      doctorsCollection(where: { bigsity: { slug: $citySlug } }, locale: $locale) {
        items {
         name
         slug
         image
          experience
        description
        rating
          reviews
specialization
profesion


        }
      }
    }
  `;

  const response = await fetchGraphQL(query, { citySlug, locale });
  const entries = extractEntries(response, "doctorsCollection");
  return entries;
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

















