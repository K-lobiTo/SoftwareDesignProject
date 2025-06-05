import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const addUser = async (userData) => {
  // setDoc get the doc parameter as the reference and the data as a JSON file
  const userJSON = {
    uid: userData.uid,
    email: userData.email,
  };
  try {
    // user ID as doc ID
    const userRef = doc(db, "User", userData.uid);

    const userDoc = await getDoc(userRef);
    // { merge: false } to avoid overwriting by accident
    if (userDoc.exists()) {
      console.log("User already exist");
    } else {
      await setDoc(userRef, { userJSON, movies: [] }, { merge: false });
      console.log("User added successfully!");
    }
  } catch (error) {
    console.error("Error adding user: ", error);
  }
};

export const addMovieToUser = async (userData, movieId) => {
  try {
    if (!movieId || typeof movieId !== "string") {
      throw new Error("Invalid movie ID");
    }

    if (!userData?.uid) {
      throw new Error("Invalid user data");
    }

    const userRef = doc(db, "User", userData.uid);
    await updateDoc(userRef, {
      movies: arrayUnion(movieId),
    });
  } catch (error) {
    console.error("Error adding movie to user:", error);
    throw error;
  }
};

export const removeMovieFromUser = async (userData, movieId) => {
  try {
    if (!movieId || typeof movieId !== "string") {
      throw new Error("Invalid movie ID");
    }

    if (!userData?.uid) {
      throw new Error("Invalid user data");
    }

    const userRef = doc(db, "User", userData.uid);
    await updateDoc(userRef, {
      movies: arrayRemove(movieId),
    });
  } catch (error) {
    console.error("Error removing movie from user:", error);
    throw error;
  }
};

export const getMoviesByUser = async (userData) => {
  try {
    const userRef = doc(db, "User", userData.uid);

    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      if (userData.movies && Array.isArray(userData.movies)) {
        return userData.movies;
      } else {
        console.log("Movies array is missing or not an array.");
        return [];
      }
    } else {
      console.log("User document does not exist.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies for user:", error);
    throw error;
  }
};
