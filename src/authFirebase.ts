import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const StartFireBase = () => {
  const firebaseApp = initializeApp({
    apiKey: "AIzaSyD7DOzwO7YbCIWNMwNX9iD_XMnjTzJOCok",
    authDomain: "fisicaexperimental-32682.firebaseapp.com",
    projectId: "fisicaexperimental-32682",
  });

  return getDatabase(firebaseApp)
};

// export const StartFireBase = () => {
//   const firebaseApp = initializeApp({
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//   });

//   return getDatabase(firebaseApp)
// };
