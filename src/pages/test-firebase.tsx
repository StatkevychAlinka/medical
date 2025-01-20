import { useEffect, useState } from 'react';
import { db } from '@/lib/firebaseConfig'; // путь к файлу с конфигурацией
import { collection, getDocs } from 'firebase/firestore';

const TestFirebase = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'testCollection'));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(docs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Firebase Firestore Test</h1>
      {data.length > 0 ? (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading data or no data found...</p>
      )}
    </div>
  );
};

export default TestFirebase;
