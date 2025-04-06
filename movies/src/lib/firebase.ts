// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLtBkKfKTASRLIUW-eYm7R87kTKd2BwXs",
  authDomain: "movies-movie-streaming-app.firebaseapp.com",
  projectId: "movies-movie-streaming-app",
  storageBucket: "movies-movie-streaming-app.firebasestorage.app",
  messagingSenderId: "98168875121",
  appId: "1:98168875121:web:3c18716a13452bc94b53d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createAccount = async (userName: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: userName,
    });
    console.log("user Created Successfully");
  } catch (error) {
    console.log("Failed registration");
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User Logged in successfully", userCredential.user);
  } catch (error) {
    console.log("Failed Sign In");
    throw error;
  }
};

export const logout = async () => {
  console.log("Inside logout function");
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};
