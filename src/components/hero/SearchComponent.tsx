import { useState } from 'react';
import { useRouter } from 'next/router';

const DoctorSearch: React.FC = () => {
  const [doctorQuery, setDoctorQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (doctorQuery && cityQuery) {
      router.push(`/search?doctor=${doctorQuery}&city=${cityQuery}`);
    }
  };

  return (
    <div className="w-full max-w-4xl container mx-auto mt-10 px-3">
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 items-center bg-white shadow-md rounded-lg p-4"
      >
        {/* Поле ввода врача */}
        <input
          type="text"
          placeholder="Введите имя врача или специальность"
          value={doctorQuery}
          onChange={(e) => setDoctorQuery(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Поле ввода города */}
        <input
          type="text"
          placeholder="Введите город"
          value={cityQuery}
          onChange={(e) => setCityQuery(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Кнопка поиска */}
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Найти врача
        </button>
      </form>
    </div>
  );
};

export default DoctorSearch;