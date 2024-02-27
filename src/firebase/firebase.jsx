// Import the functions you need from the SDKs you need
import React from "react";
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
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


  export const addNewGamePlayed = async (userData) => {
    let gamePlayed = {
        email: userData.email,
        user_id: userData.id,
    }
    // Add to rank the best game of the first two
    if(userDataUpdated.gamesPlayed.length === 2){
      const rankingCollection = collection(firebaseDB, "ranking");
      const newGameToRanking = doc(rankingCollection);
      const bestGame = userData.gamesPlayed.sort((a, b) => b.score - a.score)[0];
      gamePlayed = {
        ...gamePlayed,
        ...bestGame
      }
      try {
          // Utilizar setDoc para agregar el nuevo documento con los datos del usuario
          await setDoc(newGameToRanking, bestGame);
      } catch (error) {
          console.error("Error al agregar nuevo data juego:", error.message);
        return false
      } 
    }
    // Add to gamePlayed collection
    try {
        gamePlayed = {
          ...gamePlayed,
          ...userData.gamesPlayed[userData.gamesPlayed.length - 1]
        }
        const gamesPlayedCollection = collection(firebaseDB, "gamesPlayed");
        const newGamePlayed = doc(gamesPlayedCollection);
        // Utilizar setDoc para agregar el nuevo documento con los datos del usuario
        await setDoc(newGamePlayed, gamePlayed);
    } catch (error) {
        console.error("Error al agregar nuevo data ranking:", error.message);
        return false
    }
    return true
  } 



export const editUser = async (userId, userDataUpdated) => {
    console.log(userDataUpdated)

  try {
    const usuariosCollection = collection(firebaseDB, "usuarios");
    
    // Obtener la referencia al documento por su ID
    const usuarioRef = doc(usuariosCollection, userId);
    
    // Verificar si el documento existe
    const usuarioDoc = await getDoc(usuarioRef);

    if (usuarioDoc.exists()) {
      // Actualizar los datos del usuario
      await updateDoc(usuarioRef, userDataUpdated);
      let usuarioDoc = await getDoc(usuarioRef);
      return usuarioDoc.data();
    } else {
      console.log("No se encontró ningún usuario con ese ID.");
      return false;
    }
  } catch (error) {
    console.error("Error al editar usuario por ID:", error.message);
    return false;
  }
}
  
  

