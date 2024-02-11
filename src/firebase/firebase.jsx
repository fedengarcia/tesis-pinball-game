// Import the functions you need from the SDKs you need
import React from "react";
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(import.meta.env.VITE_API_KEY)
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
    console.log("user document ====>", userData)
    const usuariosCollection = collection(firebaseDB, "usuarios");
    const nuevoUsuarioRef = doc(usuariosCollection);
    try {
        // Utilizar setDoc para agregar el nuevo documento con los datos del usuario
        await setDoc(nuevoUsuarioRef, userData);
        console.log("Nuevo usuario agregado con éxito");
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
        return usuario;
      } else {
        console.log("No se encontró ningún usuario con ese correo electrónico.");
        return false
      }
    } catch (error) {
        console.error("Error al obtener usuario por correo electrónico:", error.message);
        return false
    }
  }



  export const editUser = async (email, userDataUpdated) => {
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
  
        // Obtener la referencia al documento y actualizar los datos
        await updateDoc(doc(usuariosCollection, usuarioDoc.id), userDataUpdated);
  
        console.log("Usuario actualizado con éxito");
      } else {
        console.log("No se encontró ningún usuario con ese correo electrónico.");
      }
    } catch (error) {
      console.error("Error al editar usuario por correo electrónico:", error.message);
    }
  }
  
  

