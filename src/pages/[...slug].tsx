import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import Rating from "../components/stars/Rating";
import  HeroSection from "../components/hero/HeroSection";
import ClinicCard from '@/components/clinics/clinicCard';
import Image from 'next/image';

import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";


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
    }[];

    doctors?: {
      slug:string;
      name:string;
      image: string;
      experience: number;
      description:string;
      rating: number;
      reviews: number;
      specialization:string;
      patientscount: number;
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
       {city.subcategories.map((subcategory) => (
      <Layout image={city.metaimage.url} metatitle={city.metatitle} metadescription={city.metadescription} 
      slug={
        `${category?.slug || ''}${city ? `/${city.slug}` : ''} `
      }>
        <HeroSection 
        title={city.name }
        description={city.description }
        />
     {/* <div className="container mx-auto px-4  mb-custom-xl">
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
      </div>*/}
<div className='container mx-auto px-4 mb-custom-xl'>
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {city.doctors && city.doctors.length > 0 && 
      city.doctors.map((doctor) => {
        // Генерация случайного количества аватаров (от 10 до 200)
        const randomAvatarCount = Math.floor(Math.random() * (200 - 10 + 1)) + 10;

        // Возможные цветовые градиенты для аватаров
        const avatarColors = [
          "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
          "bg-gradient-to-br from-[#6a11cb] to-[#2575fc]",
          "bg-gradient-to-br from-[#ff416c] to-[#ff4b2b]",
        ];

        // Функция для получения случайного цвета
        const getRandomColor = () => avatarColors[Math.floor(Math.random() * avatarColors.length)];

        return (
          <li
            key={doctor.slug}
            className="dark:bg-[#101e46] bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col"
          >
            {/* Обёртка для рамки */}
            <div className="w-32 h-40 p-1 bg-white rounded-xl border-2 border-blue-500 relative overflow-hidden">
              <Image
                src={doctor.image || "/default-doctor.jpg"}
                alt={doctor.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority // для быстрой загрузки важных изображений
              />
            </div>

            {/* Имя врача */}
            <Link
              href={`/${category.slug}/${city.slug}/doctor/${doctor.slug}`}
              className="text-lg font-semibold text-blue-600 hover:underline mt-3"
            >
              {doctor.name}
            </Link>

            {/* Специализация */}
            <p className="text-sm text-gray-500 mt-1">
              🩺 {doctor.specialization}
            </p>

            {/* Опыт работы */}
            <p className="text-sm text-gray-500 mt-1">
              🏥 Опыт: {doctor.experience} лет
            </p>

            {/* Рейтинг */}
            <div className="flex items-center mt-2">
              <Rating rating={doctor.rating} />
              <span className="ml-2 text-yellow-500 font-medium">{doctor.rating}</span>
              <span className="ml-1 text-gray-400 text-sm">({doctor.reviews} отзывов)</span>
            </div>

            {/* Аватарки пользователей */}
            <AvatarGroup
              className="mt-6 text-black"
              isBordered
              max={5}
              color="primary"
              renderCount={(count) => (
                <p className="text-small text-foreground font-medium ms-2">+{count} others</p>
              )}
              total={randomAvatarCount}
            >
              {Array.from({ length: Math.min(randomAvatarCount, 5) }).map((_, index) => (
                <Avatar
                  key={index}
                  size="sm"
                  classNames={{
                    base: getRandomColor(),
                    icon: "text-black/80",
                  }}
                  icon={<AvatarIcon />}
                />
              ))}
            </AvatarGroup>

            {/* Кнопка записи */}
            <Link
              href={`/${category.slug}/${city.slug}/doctor/${doctor.slug}`}
              className="mt-3 inline-block bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 w-full"
            >
              Записаться на приём
            </Link>
          </li>
        );
      })
    }
  </ul>
</div>


   {/* Вывод клиник */}
{city.clinics && city.clinics.length > 0 && (
  <>
    <div className="container mx-auto px-4 mb-custom-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{city.name}</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {city.clinics.map((clinic) => {
          // Генерация случайного количества аватаров от 10 до 200
          const randomAvatarCount = Math.floor(Math.random() * (200 - 10 + 1)) + 10;

          // Возможные цветовые градиенты для аватаров
          const avatarColors = [
            "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
            "bg-gradient-to-br from-[#6a11cb] to-[#2575fc]",
            "bg-gradient-to-br from-[#ff416c] to-[#ff4b2b]",
          ];

          // Функция для получения случайного цвета
          const getRandomColor = () => avatarColors[Math.floor(Math.random() * avatarColors.length)];

          return (
            <li
              key={clinic.slug}
              className="dark:bg-[#101e46] bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Картинка клиники */}
              <div className="h-48 w-full bg-gray-100 dark:bg-[#121b34]">
                <img
                  src="/default-clinic.jpg" // Динамическая картинка или заглушка
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
                <p className="text-sm text-gray-500 mt-1">{clinic.practics}</p>

                {/* Описание */}
                <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                  {clinic.description || "Описание отсутствует."}
                </p>

                {/* Рейтинг */}
                <div className="flex items-center mt-3">
                  <Rating rating={clinic.rating} />
                  <span className="ml-2 text-yellow-500 font-medium">{clinic.rating}</span>
                  <span className="ml-1 text-gray-400 text-sm">({clinic.reviews} recenzii )</span>
                </div>

                {/* Адрес */}
                <p className="text-gray-500 text-sm mt-2">📍 {clinic.address || "Адрес не указан"}</p>

                {/* Аватарки пользователей */}
                <AvatarGroup
                  className="mt-6 text-black"
                  isBordered
                  max={5}
                  color="primary"
                  renderCount={(count) => (
                    <p className="text-small text-foreground font-medium ms-2">+{count} others</p>
                  )}
                  total={randomAvatarCount}
                >
                  {Array.from({ length: Math.min(randomAvatarCount, 5) }).map((_, index) => (
                    <Avatar
                      key={index}
                      size="sm"
                      classNames={{
                        base: getRandomColor(),
                        icon: "text-black/80",
                      }}
                      icon={<AvatarIcon />}
                    />
                  ))}
                </AvatarGroup>

                {/* Кнопка записи */}
                <Link
                  href={`/${category.slug}/${city.slug}/clinic/${clinic.slug}`}
                  className="mt-4 inline-block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Записаться
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </>
)}
</Layout>
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
