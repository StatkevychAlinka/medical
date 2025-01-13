import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import Rating from "../components/stars/Rating";
import  HeroSection from "../components/hero/HeroSection";
import ClinicCard from '@/components/clinics/clinicCard';
import { 
  
    getSubcategoryBySlug,
  getAllCategoryPosts, 
  getCitiesByCategorySlug, 
  getCategoryBySlug, 
  getCityBySlug, 
  getClinicsByCitySlug,
  getSubcategoriesByCitySlug 
} from '../../lib/api';

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
    description: string;
    subcategories: Subcategory[];
    clinics?: {
      rating: number;
      name: string;
      slug: string;
      description: string;
      address: string;
    }[];
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
    const clinics = await getClinicsByCitySlug(locale, slug[1]);
    return {
      props: {
        
        city: {
          ...city,
          subcategories,
          clinics,
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
              <Link href={`/${category.slug}/${city.slug}`} className="text-lg font-semibold text-blue-600 hover:underline">
                
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
      <>
       {city.subcategories.map((subcategory) => (
      <Layout image={""} metatitle={""} metadescription={""} 
      slug={
        `${category?.slug || ''}${city ? `/${city.slug}` : ''} `
      }>
        <HeroSection 
        title={city.name }
        description={city.description }
        />
      <div className="container mx-auto px-4  mb-custom-xl">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         
            <li
              key={subcategory.slug}
              className="bg-gray-50 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`${category.slug}/${city.slug}/${subcategory.slug}`}  className="text-lg font-semibold text-green-600 hover:underline">
             
                  {subcategory.name}
             
              </Link>
            </li>
         
        </ul>
      </div>
   {/* Вывод клиник */}
{city.clinics && city.clinics.length > 0 && (
  <>
  <div className='container mx-auto px-4  mb-custom-xl'>
    <h2 className="text-3xl font-bold mb-6 text-gray-800">{city.name}</h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {city.clinics.map((clinic) => (
        <li
          key={clinic.slug}
          className="dark:bg-[#101e46] border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 "
        >
          {/* Картинка клиники */}
          <div className="h-48 w-full bg-gray-100">
            <img
              src={"/default-clinic.jpg"} // Динамическая картинка или заглушка
              alt={clinic.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Контент карточки */}
          <div className="p-5">
            {/* Название клиники */}
            <Link
              href={`/${category.slug}/${city.slug}/clinic/${clinic.slug}`}
              className="text-xl font-semibold text-blue-600 hover:underline block"
            >
              {clinic.name}
            </Link>

            {/* Категория или специализация */}
            <p className="text-sm text-gray-500 mt-1">
              { "Общая практика"}
            </p>

            {/* Описание */}
            <p className="text-gray-600 text-sm mt-3 line-clamp-3">
              {clinic.description || "Описание отсутствует."}
            </p>

            {/* Рейтинг */}
            <div className="flex items-center mt-3">
              <Rating rating={clinic.rating || 4.5} />
              <span className="ml-2 text-yellow-500 font-medium">
                {clinic.rating || "4.5"}
              </span>
              <span className="ml-1 text-gray-400 text-sm">
                ({ 20} отзывов)
              </span>
            </div>

            {/* Адрес */}
            <p className="text-gray-500 text-sm mt-2">
              📍 { "Адрес не указан"}
            </p>

            {/* Кнопка записи */}
            <Link
              href={`/${category.slug}/${city.slug}/clinic/${clinic.slug}`}
              className="mt-4 inline-block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Записаться
            </Link>
          </div>
        </li>
      ))}
    </ul>
    </div>
   
  </>
)}</Layout>
))}</> 
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
