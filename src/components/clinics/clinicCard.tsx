import Link from 'next/link';
import Rating from '../stars/Rating';

interface Clinic {
  name: string;
  slug: string;
  description?: string;
  address?: string;
  category?: string;
  image?: string;
  rating?: number;
  reviewsCount?: number;
}

interface ClinicCardProps {
  clinic: Clinic;
  categorySlug: string;
  citySlug: string;
}

const ClinicCard: React.FC<ClinicCardProps> = ({ clinic, categorySlug, citySlug }) => {
  return (
    <li
      className="dark:bg-[#101e46] border bg-white border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Картинка клиники */}
      <div className="h-48 w-full bg-gray-100">
        <img
          src={clinic.image || "/default-clinic.jpg"}
          alt={clinic.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Контент карточки */}
      <div className="p-5">
        {/* Название клиники */}
        <Link
          href={`/${categorySlug}/${citySlug}/clinic/${clinic.slug}`}
          className="text-xl font-semibold text-blue-600 hover:underline block"
        >
          {clinic.name}
        </Link>

        {/* Категория или специализация */}
        <p className="text-sm text-gray-500 mt-1">
          {clinic.category || "Общая практика"}
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
            ({clinic.reviewsCount || 20} отзывов)
          </span>
        </div>

        {/* Адрес */}
        <p className="text-gray-500 text-sm mt-2">
          📍 {clinic.address || "Адрес не указан"}
        </p>

        {/* Кнопка записи */}
        <Link
          href={`/${categorySlug}/${citySlug}/clinic/${clinic.slug}`}
          className="mt-4 inline-block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Записаться
        </Link>
      </div>
    </li>
  );
};

export default ClinicCard;
