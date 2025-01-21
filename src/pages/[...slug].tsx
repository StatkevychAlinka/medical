import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import Rating from "../components/stars/Rating";
import  HeroSection from "../components/hero/HeroSection";
import ClinicCard from '@/components/clinics/clinicCard';
import Image from 'next/image';
import { BreadcrumbJsonLd } from 'next-seo';
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
import DoctorCard from '../components/pages/DoctorCard';
import Clinic from "@/components/pages/ClinicsList";
const randomAvatarCount = Math.floor(Math.random() * 7);
import { 
  
    getSubcategoryBySlug,
  getAllCategoryPosts, 
  getCitiesByCategorySlug, 
  getCategoryBySlug, 
  getCityBySlug, 
  getClinicsByCitySlug,
  getDoctorsByCitySlug,
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
    metatitle: string;
      metadescription: string;
      textone: string;  
          texttwo: string;
      metaimage: { url: string; title: string };
    subcategories: Subcategory[];
    clinics?: {
      reviews: number;
      rating: number;
      practics: string;
      name: string;
      slug: string;
      description: string;
      address: string;
      phone: number;
schedule: string;
website: string;
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
      //  paths.push({ params: { slug: [category.slug, city.slug, subcategory.slug] } });
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
    const doctors = await getDoctorsByCitySlug (locale, slug[1])
    return {
      props: {
        
        city: {
          ...city,
          subcategories,
          clinics,
          doctors
        },
        category,
        type: 'city',
       
      },
      revalidate: 60,
    };
  }

  // if (slug.length === 3) {
    // Страница подкатегории
   //  const subcategory = await getSubcategoryBySlug(slug[2], locale);
   //  if (!subcategory) return { notFound: true };
   
   //  return {
     //  props: {
      //   subcategory,
     //    type: 'subcategory',
     //  },
    //   revalidate: 60,
   //  };
 //  }

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
           <BreadcrumbJsonLd
          itemListElements={[
            {
              "@type": "ListItem",
              position: 1,
              name: "Acasă",
              item: "https://exemplu.ro",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: category.name,
              item: `https://exemplu.ro/${category.slug}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: city.name,
              item: `https://exemplu.ro/${category.slug}/${city.slug}`,
            },
          ]}
        />
       {city.subcategories.map((subcategory) => (
      <Layout image={city.metaimage.url} metatitle={city.metatitle} metadescription={city.metadescription} 
      slug={
        `${category?.slug || ''}${city ? `/${city.slug}` : ''} `
      }>
        <HeroSection 
        title={city.name }
        description={city.description }
        />
        <div className='container mx-auto px-4 '>

       {/* Хлебные крошки */}
<nav className="container mx-auto my-4 text-text-secondary dark:text-gray-300 mb-custom-xl">
  <ul className="flex items-center text-sm md:text-base">
    <li className="flex items-center">
      <Link href="/" className="text-blue-600 hover:underline flex items-center gap-1">
        <svg
          className="w-4 h-4 md:w-5 md:h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 9V9m0 4v6m8-6v6m-4-10V3m-4 10v6m-8-6v6m4-10V3"></path>
        </svg>
        Acasă
      </Link>
    </li>

    <li className="mx-2 text-gray-400 dark:text-gray-500">›</li>

    <li className="flex items-center">
      <Link href={`/${category.slug}`} className="text-blue-600 hover:underline">
        {category.name}
      </Link>
    </li>

    <li className="mx-2 text-gray-400 dark:text-gray-500">›</li>

    <li className="flex items-center text-gray-600 dark:text-gray-400 font-medium">
      {city.name}
    </li>
  </ul>
</nav>

  <h2 className="text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl font-semibold mb-custom-lg text-text-main dark:text-white">
    {city.textone}
  </h2>

  
  
   <DoctorCard category={category} city={city}/>



<h2 className="text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl font-semibold  mb-custom-lg  text-text-main dark:text-white">{city.texttwo }</h2>
 {/* Вывод клиник */}


 <Clinic clinics={city.clinics} category={category}/>




    </div></Layout>
))}</> 
    );
  }
  
  // if (type === 'subcategory' && subcategory) {
  //   return (
   //    <div className="container mx-auto px-4 py-10">
    //     <h1 className="text-4xl font-bold text-center mb-6">
    //       Подкатегория: <span className="text-purple-600">{subcategory.name}</span>
    //     </h1>
    //     <p className="text-lg text-gray-700 text-center">{subcategory.description}</p>
   //    </div>
    // );
  // }
  
  return (
    <>
      <p>Страница не найдена</p>
    </>
  );
};

export default DynamicPage;
