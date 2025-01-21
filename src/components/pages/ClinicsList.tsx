import Image from 'next/image';
import Link from 'next/link';
import Rating from '../stars/Rating'; // Assuming the Rating component is already created
import { Avatar, AvatarGroup, AvatarIcon } from '@nextui-org/avatar';

// Assuming you have Clinic and CategoryProps interfaces in your project, adjust as necessary.
interface Clinic {
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
}

interface CategoryProps {
  slug: string;
}

interface ClinicsListProps {
    clinics?: Clinic[]; // теперь clinics может быть undefined
  category: CategoryProps;

}

const ClinicsList: React.FC<ClinicsListProps> = ({ clinics, category }) => {
  // Function to generate a random number of avatars between 10 and 200
  const getRandomAvatarCount = () => Math.floor(Math.random() * (200 - 10 + 1)) + 10;

  // Possible gradient colors for avatars
  const avatarColors = [
    'bg-gradient-to-br from-[#FFD3A5] to-[#FFB677]',
    'bg-gradient-to-br from-[#A18CD1] to-[#FBC2EB]',
    'bg-gradient-to-br from-[#FF9A8B] to-[#FF6A88]',
    'bg-gradient-to-br from-[#A1C4FD] to-[#C2E9FB]',
    'bg-gradient-to-br from-[#FFE259] to-[#FFA751]',
    'bg-gradient-to-br from-[#D4FC79] to-[#96E6A1]',
    'bg-gradient-to-br from-[#FAD961] to-[#F76B1C]',
    'bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC]',
    'bg-gradient-to-br from-[#89F7FE] to-[#66A6FF]',
    'bg-gradient-to-br from-[#F9D423] to-[#FF4E50]',
  ];

  // Function to get a random gradient color for avatars
  const getRandomColor = () => avatarColors[Math.floor(Math.random() * avatarColors.length)];

  return (
    <>
      {clinics && clinics.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-custom-xl">
          {clinics.map((clinic) => {
            const randomAvatarCount = getRandomAvatarCount();

            return (
              <li
                key={clinic.slug}
                className="dark:bg-[#101e46] bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                {/* Block with image and clinic name with rating */}
                <div className="flex items-start p-3 pb-0">
                  {/* Clinic Image */}
                  <div className="h-32 w-32 bg-gray-100 dark:bg-[#121b34] rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src="/default-clinic.jpg" // Default image or dynamic image
                      alt={clinic.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content of the card */}
                  <div className="ml-4 flex flex-col justify-between flex-grow">
                    {/* Clinic Name */}
                    <Link
                      href={`/${category.slug}/}/clinic/${clinic.slug}`}
                      className="text-xl font-semibold text-blue-600 hover:underline block"
                    >
                      {clinic.name}
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center">
                      <Rating rating={clinic.rating} />
                      <span className="ml-2 text-yellow-500 font-medium">{clinic.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({clinic.reviews} recenzii )</span>
                  </div>
                </div>

                {/* Additional Data */}
                <div className="p-3 flex flex-col flex-grow">
                  <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300 mb-3">
                    <span className="font-bold text-blue-600">🩺 Direcție:</span> {clinic.practics}
                  </p>

                  {/* User Avatars */}
                  <AvatarGroup
                    className="text-black"
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
                          icon: 'text-black/80',
                        }}
                        icon={<AvatarIcon />}
                      />
                    ))}
                  </AvatarGroup>

                  {/* Horizontal Line before Description */}
                  <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />

                  {/* Description */}
                  <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300">
                    <span className="font-bold text-blue-600">📝 Descriere:</span> {clinic.description || 'Описание отсутствует.'}
                  </p>

                  {/* Horizontal Line after Description */}
                  <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />

                  {/* Address */}
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

                  {/* Phone */}
                  <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300">
                    ☎️ <span className="font-bold text-blue-600">Telefon:</span> {clinic.phone || 'Nu este disponibil'}
                  </p>

                  {/* Schedule */}
                  <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300">
                    🕒 <span className="font-bold text-blue-600">Program:</span> {clinic.schedule || 'Program nedefinit'}
                  </p>

                  {/* Website */}
                  <p className="text-p-sm md:text-p-md lg:text-p-lg xl:text-p-xl text-text-secondary dark:text-gray-300">
                    🌐
                    <a
                      href={clinic.website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Site-ul clinicii
                    </a>
                  </p>

                  {/* Book Appointment Button */}
                  <div className="mt-auto">
                    <Link
                      href={`/${category.slug}//clinic/${clinic.slug}`}
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
      )}
    </>
  );
};

export default ClinicsList;
