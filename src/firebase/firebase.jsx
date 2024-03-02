// Import the functions you need from the SDKs you need
import React from "react";
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, runTransaction, setDoc, updateDoc, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "tesis-pinball-game.firebaseapp.com",
  projectId: "tesis-pinball-game",
  storageBucket: "tesis-pinball-game.appspot.com",
  messagingSenderId: "714657417438",
  appId: "1:714657417438:web:616b6710b4722ae24b5a4f",
  measurementId: "G-DF9BR0MN52"
};

// Initialize firebase
export const firebaseApp = initializeApp(firebaseConfig);

  // Get firestore
export const  firebaseDB = getFirestore(firebaseApp);


// CREATE USER 
export const createUserDocument =  async (userData) => {
    const usuariosCollection = collection(firebaseDB, "usuarios");
    const nuevoUsuarioRef = doc(usuariosCollection);
    try {
        // Utilizar setDoc para agregar el nuevo documento con los datos del usuario
        await setDoc(nuevoUsuarioRef, userData);
    } catch (error) {
        console.error("Error al agregar nuevo usuario:", error.message);
    }
}


export const getUserByEmail = async (email) => {
    const usuariosCollection = collection(firebaseDB, "usuarios");
    // Crear una consulta para buscar el usuario por su correo electrónico
    const q = query(usuariosCollection, where("email", "==", email));
    
    try {
      // Realizar la consulta
      const querySnapshot = await getDocs(q);
      // Verificar si se encontró algún documento
      if (!querySnapshot.empty) {
        // Obtener el primer documento encontrado (asumiendo que el campo "email" es único)
        const usuarioDoc = querySnapshot.docs[0];
        // Obtener los datos del usuario
        const usuario = usuarioDoc.data();
        return {...usuario, id: usuarioDoc.id};
      } else {
        console.log("No se encontró ningún usuario con ese correo electrónico.");
        return false
      }
    } catch (error) {
        console.error("Error al obtener usuario por correo electrónico:", error.message);
        return false
    }
  }


  export const addGameToUserGamesPlayed = async (gameData, userData) => {
    console.log("ACA =>", gameData, userData);
    try {
      // Referencia a la colección de usuarios
      const usuariosCollection = collection(firebaseDB, "usuarios");
      // Referencia al documento del usuario específico
      const userDocRef = doc(usuariosCollection, userData.id);
  
      // Transacción para asegurar la integridad de los datos
      await runTransaction(firebaseDB, async (transaction) => {
        // Obtener el documento actual del usuario
        const userDoc = await transaction.get(userDocRef);
        if (!userDoc.exists()) {
          throw new Error("El documento del usuario no existe.");
        }
  
        // Datos actuales del usuario
        const userDataCurrent = userDoc.data();
        // Nuevo array de juegos jugados con el nuevo juego incluido
        const updatedGamesPlayed = [
          ...userDataCurrent.gamesPlayed,
          gameData
        ];
  
        // Actualizar el documento del usuario con el nuevo array de juegos jugados
        transaction.update(userDocRef, { gamesPlayed: updatedGamesPlayed });
      });
  
      console.log("Juego agregado correctamente al usuario.");
      return true;
    } catch (error) {
      console.error("Error al agregar juego a gamesPlayed:", error.message);
      return false;
    }
  };
  



  export const editUser = async (userId, userDataUpdated) => {

    try {
      const usuariosCollection = collection(firebaseDB, "usuarios");
      
      // Obtener la referencia al documento por su ID
      const usuarioRef = doc(usuariosCollection, userId);
      
      // Verificar si el documento existe
      const usuarioDoc = await getDoc(usuarioRef);
      
      if (usuarioDoc.exists()) {
        // Actualizar los datos del usuario
        await updateDoc(usuarioRef, userDataUpdated);
        // Devolver los datos actualizados, ya que updateDoc no devuelve el documento.
        return { id: userId, ...userDataUpdated };
      } else {
        console.log("No se encontró ningún usuario con ese ID.");
        return false;
      }
    } catch (error) {
      console.error("Error al editar usuario por ID:", error.message);
      return false;
    }
  }

export const getAllGamesPlayed = async () => {
  const usersCollection = collection(firebaseDB, "usuarios");
  
  try {
    const querySnapshot = await getDocs(usersCollection);
    let gamesWithUserData = [];
    
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const userGamesPlayed = userData.gamesPlayed || [];

      userGamesPlayed.forEach(game => {
        gamesWithUserData.push({
          userEmail: userData.email,
          userDate: userData.date,
          userId: userData.id,
          ...game
        });
      });
    });
    return gamesWithUserData;
  } catch (error) {
      console.error("Error al obtener todos los juegos jugados:", error.message);
      return [];
  }
}

export const getTopRanking = async (withExtraData) => {
  const usersCollection = collection(firebaseDB, "usuarios");
  
  try {
    const querySnapshot = await getDocs(usersCollection);
    let topRanking = [];
    
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const userGamesPlayed = userData.gamesPlayed || [];

      userGamesPlayed.forEach(game => {
        let index = topRanking.findIndex(element => element.userEmail === userData.email)
        let gameCopy = {...game}
        if(withExtraData === false){
          delete gameCopy.interactionsInBrick;
          delete gameCopy.interactionsInPaddle;
          delete gameCopy.timePlayed;
        }
        if(index !== -1){
          topRanking[index] = {
            userEmail: userData.email,
            userDate: userData.date,
            userId: userData.id,
            ...game
          }
        }else{
          topRanking.push({
            userEmail: userData.email,
            userDate: userData.date,
            userId: userData.id,
            ...game
          });
        }
      });
    });
    return topRanking.sort((a,b) => a.score + b.score);
  } catch (error) {
      console.error("Error al obtener todos los juegos jugados:", error.message);
      return [];
  }
}