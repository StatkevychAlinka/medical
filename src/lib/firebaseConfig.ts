import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Конфигурация Firebase (замените значениями вашего проекта)
const firebaseConfig = {
  apiKey: "AIzaSyA-i5rfAERcqsjoxBBusxWRZmB7NDpJigY",
  authDomain: "med-doc-cc390.firebaseapp.com",
  projectId: "med-doc-cc390",
  storageBucket: "med-doc-cc390.appspot.com",
  messagingSenderId: "737147139444",
  appId: "1:737147139444:web:9d95ffcc356e8405512821",
  measurementId: "G-D0L89S52LZ"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт сервисов
export const db = getFirestore(app);  // Firestore для работы с БД
export const auth = getAuth(app);      // Авторизация
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null; // Аналитика (только на клиенте)
