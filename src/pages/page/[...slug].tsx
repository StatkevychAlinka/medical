import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import Rating from "../../components/stars/Rating";
import  HeroSection from "../../components/hero/HeroSection";
import { 
  
    getSubcategoryBySlug,
  getAllCategoryPosts, 
  getCitiesByCategorySlug, 
  getCategoryBySlug, 
  getCityBySlug, 
  getSubcategoriesByCitySlug 
} from '../../../lib/api';

interface City {
  name: string;
  slug: string;
}

interface Subcategory {
  name: string;
  slug: string;
  description: string;
}

interface Category {
  name: string;
  slug: string;
  cities: City[];
}

interface Props {
  category?: Category;
  city?: {
    name: string;
    slug: string;
    subcategories: Subcategory[];
   
  };
  subcategory?: Subcategory;
  type: 'category' | 'city' | 'subcategory';
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllCategoryPosts('ro-RO');
  const paths: any[] = [];

  for (const category of categories) {
    // Добавляем маршрут для категории
    paths.push({ params: { slug: [category.slug] } });

    // Получаем города для категории
    const cities = await getCitiesByCategorySlug('ro-RO', category.slug);

    for (const city of cities) {
      // Добавляем маршрут для города
      paths.push({ params: { slug: [category.slug, city.slug] } });

      // Получаем подкатегории для города
      const subcategories = await getSubcategoriesByCitySlug('ro-RO', city.slug);

      for (const subcategory of subcategories) {
        // Добавляем маршрут для подкатегории
        paths.push({ params: { slug: [category.slug, city.slug, subcategory.slug] } });
      }
    }
  }

  return {
    paths,
    fallback: 'blocking', // Динамические маршруты
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params?.slug as string[]; // Получаем slug
  const locale = context.locale || 'ro-RO'; // Устанавливаем язык

  if (!slug || slug.length === 0) {
    return { notFound: true };
  }

  if (slug.length === 1) {
    // Страница категории
    const category = await getCategoryBySlug(slug[0], locale);
    if (!category) return { notFound: true };

    const cities = await getCitiesByCategorySlug(locale, slug[0]);
    return {
      props: {
        category: {
          ...category,
          cities,
        },
        type: 'category',
      },
      revalidate: 60,
    };
  }

  if (slug.length === 2) {
    // Страница города
    const city = await getCityBySlug(slug[1], locale);
    if (!city) return { notFound: true };
    const category = await getCategoryBySlug(slug[0], locale);
    const subcategories = await getSubcategoriesByCitySlug(locale, slug[1]);
    return {
      props: {
        
        city: {
          ...city,
          subcategories,
          
        },
        category,
        type: 'city',
       
      },
      revalidate: 60,
    };
  }

  if (slug.length === 3) {
    // Страница подкатегории
    const subcategory = await getSubcategoryBySlug(slug[2], locale);
    if (!subcategory) return { notFound: true };
   
    return {
      props: {
        subcategory,
        type: 'subcategory',
      },
      revalidate: 60,
    };
  }

  return { notFound: true };
};

const DynamicPage = ({ category, city, subcategory, type }: Props) => {
  if (type === 'category' && category) {
    return (
    <>
    <Layout image={""} metatitle={""} metadescription={""} slug={`blog/ "" `}>
        <HeroSection 
        title={category.name }
        description={category.name }
        />
        <div className="container mx-auto px-4 py-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.cities.map((city) => (
            <li
              key={city.slug}
              className="bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/page/${category.slug}/${city.slug}`} className="text-lg font-semibold text-blue-600 hover:underline">
                
                  {city.name}
             
              </Link>
            </li>
          ))}
        </ul>
      </div>
      </Layout>
      </>
    );
  }
  
  if (type === 'city' && city && category) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          Город: <span className="text-green-600">{city.name}</span>
        </h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {city.subcategories.map((subcategory) => (
            <li
              key={subcategory.slug}
              className="bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/page/${category.slug}/${city.slug}/${subcategory.slug}`}  className="text-lg font-semibold text-green-600 hover:underline">
               <Rating rating={2.9} />
                  {subcategory.name}
             
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  if (type === 'subcategory' && subcategory) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-6">
          Подкатегория: <span className="text-purple-600">{subcategory.name}</span>
        </h1>
        <p className="text-lg text-gray-700 text-center">{subcategory.description}</p>
      </div>
    );
  }
  
  return (
    <>
      <p>Страница не найдена</p>
    </>
  );
};

export default DynamicPage;
