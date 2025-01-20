import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import Rating from "../components/stars/Rating";
import  HeroSection from "../components/hero/HeroSection";
import ClinicCard from '@/components/clinics/clinicCard';
import Image from 'next/image';
import { BreadcrumbJsonLd } from 'next-seo';
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

    doctors?: {
      slug:string;
      name:string;
      image: string;
      experience: number;
      description:string;
      rating: number;
      reviews: number;
      specialization:string;
      profesion: string;
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
      
    
  <h2 className="text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl font-semibold mb-custom-lg text-text-main dark:text-white">
    {city.textone}
  </h2>

  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-custom-xl">
  {city.doctors && city.doctors.length > 0 &&
    city.doctors.map((doctor) => {
      const randomAvatarCount = Math.floor(Math.random() * (200 - 10 + 1)) + 10;

      const avatarColors = [
        "bg-gradient-to-br from-[#FFD3A5] to-[#FFB677]",
        "bg-gradient-to-br from-[#A18CD1] to-[#FBC2EB]",
        "bg-gradient-to-br from-[#FF9A8B] to-[#FF6A88]",
        "bg-gradient-to-br from-[#A1C4FD] to-[#C2E9FB]",
        "bg-gradient-to-br from-[#FFE259] to-[#FFA751]",
        "bg-gradient-to-br from-[#D4FC79] to-[#96E6A1]",
        "bg-gradient-to-br from-[#FAD961] to-[#F76B1C]",
        "bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC]",
        "bg-gradient-to-br from-[#89F7FE] to-[#66A6FF]",
        "bg-gradient-to-br from-[#F9D423] to-[#FF4E50]",
      ];
      const getRandomColor = () => avatarColors[Math.floor(Math.random() * avatarColors.length)];

      return (
        <li
          key={doctor.slug}
          className="dark:bg-[#101e46] bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col relative"
        >
          {/* Звание врача */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r from-green-400 to-blue-500 shadow-md">
            {doctor.profesion || "Dr."}
          </div>

          {/* Верхний блок с фото и информацией */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 p-1 bg-white rounded-full border-2 border-blue-500 relative overflow-hidden">
              <Image
                src={doctor.image || "/default-doctor.jpg"}
                alt={doctor.name}
                fill
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority
              />
            </div>
            <div className="flex flex-col">
              <Link
                href={`/${category.slug}/${city.slug}/doctor/${doctor.slug}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {doctor.name}
              </Link>
              <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300 flex items-center mt-2">
                🩺 <span className="ml-2">Specializare: {doctor.specialization}</span>
              </p>
              <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300 flex items-center mt-2">
                🏥 <span className="ml-2">Experiență: {doctor.experience} ani</span>
              </p>
            </div>
          </div>

          <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />

          <div className="flex items-center">
            <Rating rating={doctor.rating} />
            <span className="ml-2 text-yellow-500 font-medium">{doctor.rating}</span>
            <span className="ml-1 text-gray-400 text-sm">({doctor.reviews} recenzii)</span>
          </div>

          <AvatarGroup
            className="mt-3 text-black"
            isBordered
            max={5}
            color="primary"
            renderCount={(count) => (
              <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300 pl-3 font-bold ">
                +{count} others
              </p>
            )}
            total={randomAvatarCount}
          >
            {Array.from({ length: Math.min(randomAvatarCount, 5) }).map((_, index) => (
              <Avatar
              
                key={index}
               
                classNames={{
                  base: `w-6 h-6 ${getRandomColor()}`,  // Объединение классов
                  icon: "text-black/80",
                }}
                className="w-6 h-6 text-tiny"
                icon={<AvatarIcon />}
              />
            ))}
          </AvatarGroup>

          <Link
            href={`/${category.slug}/${city.slug}/doctor/${doctor.slug}`}
            className="mt-4 inline-block bg-background-blue text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 w-full"
          >
            Zapisă-te la consultație
          </Link>
        </li>
      );
    })}
</ul>



<h2 className="text-h2-sm md:text-h2-md lg:text-h2-lg xl:text-h2-xl font-semibold  mb-custom-lg  text-text-main dark:text-white">{city.texttwo }</h2>
 {/* Вывод клиник */}
{city.clinics && city.clinics.length > 0 && (
  <>
<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-custom-xl">
  {city.clinics.map((clinic) => {
    // Генерация случайного количества аватаров от 10 до 200
    const randomAvatarCount = Math.floor(Math.random() * (200 - 10 + 1)) + 10;

    // Возможные цветовые градиенты для аватаров
    const avatarColors = [
      "bg-gradient-to-br from-[#FFD3A5] to-[#FFB677]",  // Светло-оранжево-персиковый
      "bg-gradient-to-br from-[#A18CD1] to-[#FBC2EB]",  // Лавандово-розовый
      "bg-gradient-to-br from-[#FF9A8B] to-[#FF6A88]",  // Светло-розово-персиковый
      "bg-gradient-to-br from-[#A1C4FD] to-[#C2E9FB]",  // Светло-голубой
      "bg-gradient-to-br from-[#FFE259] to-[#FFA751]",  // Желто-оранжевый
      "bg-gradient-to-br from-[#D4FC79] to-[#96E6A1]",  // Светло-зеленый
      "bg-gradient-to-br from-[#FAD961] to-[#F76B1C]",  // Персиково-оранжевый
      "bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC]",  // Светло-розово-голубой
      "bg-gradient-to-br from-[#89F7FE] to-[#66A6FF]",  // Светло-синий
      "bg-gradient-to-br from-[#F9D423] to-[#FF4E50]",  // Светло-красно-желтый
    ];

    // Функция для получения случайного цвета
    const getRandomColor = () => avatarColors[Math.floor(Math.random() * avatarColors.length)];

    return (
      <li
        key={clinic.slug}
        className="dark:bg-[#101e46] bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
      >
      {/* Блок с картинкой и названием клиники с рейтингом */}
<div className="flex items-start p-3 pb-0">
  {/* Картинка клиники */}
  <div className="h-32 w-32 bg-gray-100 dark:bg-[#121b34] rounded-xl overflow-hidden flex-shrink-0">
    <img
      src="/default-clinic.jpg" // Динамическая картинка или заглушка
      alt={clinic.name}
      className="h-full w-full object-cover"
    />
  </div>

  {/* Контент карточки */}
  <div className="ml-4 flex flex-col justify-between flex-grow">
    {/* Название клиники */}
    <Link
      href={`/${category.slug}/${city.slug}/clinic/${clinic.slug}`}
      className="text-xl font-semibold text-blue-600 hover:underline block"
    >
      {clinic.name}
    </Link>

    {/* Рейтинг */}
    <div className="flex items-center ">
      <Rating rating={clinic.rating} />
      <span className="ml-2 text-yellow-500 font-medium">{clinic.rating}</span>
      
    </div>
    <span className=" text-gray-400 text-sm">({clinic.reviews} recenzii )</span>
    {/* Описание клиники */}
   
  </div>
</div>


        {/* Все остальные данные */}
        <div className="p-3 flex flex-col flex-grow">
        <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300 mb-3">
      <span className="font-bold text-blue-600">🩺 Direcție:</span> {clinic.practics}
    </p>
                {/* Аватарки пользователей */}
                <AvatarGroup
            className=" text-black"
            isBordered
            max={5}
            color="primary"
            renderCount={(count) => (
              <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300 pl-3 font-bold">
                +{count} others
              </p>
            )}
            total={randomAvatarCount}
          >
            {Array.from({ length: Math.min(randomAvatarCount, 5) }).map((_, index) => (
              <Avatar
                key={index}
                size="sm"
                classNames={{
                  base: `w-6 h-6 ${getRandomColor()}`, 
                  icon: "text-black/80",
                }}
                icon={<AvatarIcon />}
              />
            ))}
          </AvatarGroup>
          {/* Горизонтальная линия перед описанием */}
          <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />

       

          {/* Описание */}
          <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300">
            <span className="font-bold text-blue-600">📝 Descriere:</span> {clinic.description || "Описание отсутствует."}
          </p>

          {/* Горизонтальная линия после описания */}
          <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />

          {/* Адрес */}
          <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300">
            📍 
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Adresă de contact
            </a>
          </p>

          {/* Телефон */}
          <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300">
            ☎️ <span className="font-bold text-blue-600">Telefon:</span> {clinic.phone || "Nu este disponibil"}
          </p>

          {/* Рабочее время */}
          <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300">
            🕒 <span className="font-bold text-blue-600">Program:</span> {clinic.schedule || "Program nedefinit"}
          </p>

          {/* Веб-сайт */}
          <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300">
            🌐 
            <a 
              href={clinic.website || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Site-ul clinicii
            </a>
          </p>

    

          {/* Кнопка записи */}
          <div className="mt-auto">
            <Link
              href={`/${category.slug}/${city.slug}/clinic/${clinic.slug}`}
              className="mt-4 inline-block w-full bg-background-blue text-white text-center py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Записаться
            </Link>
          </div>
        </div>
      </li>
    );
  })}
</ul>


  </>
)}


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
