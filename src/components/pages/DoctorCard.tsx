import Image from 'next/image';
import Link from 'next/link';
import Rating from '../stars/Rating'; // Предположим, что компонент рейтинга у вас уже есть
import { Avatar, AvatarGroup, AvatarIcon } from '@nextui-org/avatar';

// Типы для врача и города
type DoctorProps = {
    slug: string;
    name: string;
    image: string;
    experience: number;
    description: string;
    rating: number;
    reviews: number;
    specialization: string;
    profesion: string;
    patientCount: number;
};

interface CityProps {
  slug: string;
doctors?: DoctorProps[];
}

interface CategoryProps {
  slug: string;
}

const DoctorCard: React.FC<{ category: CategoryProps; city: CityProps }> = ({ category, city }) => {
  // Функция для генерации случайного цвета для аватара
  const getRandomColor = () => {
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

    return avatarColors[Math.floor(Math.random() * avatarColors.length)];
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-custom-xl">
      {city.doctors && city.doctors.length > 0 &&
        city.doctors.map((doctor) => {
          const randomAvatarCount = Math.floor(Math.random() * (200 - 10 + 1)) + 10; // Количество случайных аватаров

          return (
            <li
              key={doctor.slug}
              className="dark:bg-[#101e46] bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col relative"
            >
              {/* Звание врача */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r from-green-400 to-blue-500 shadow-md">
                {doctor.profesion|| "Dr."}
              </div>

              {/* Верхний блок с фото и информацией */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 p-1 bg-white rounded-full border-2 border-blue-500 relative overflow-hidden">
                  <Image
                    src={doctor.image || "/default-doctor.jpg"} // Заглушка для изображения
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

              {/* Группа аватаров */}
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
                      base: `w-6 h-6 ${getRandomColor()}`, // Используем случайный цвет для аватара
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
  );
};

export default DoctorCard;
