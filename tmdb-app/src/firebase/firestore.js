import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./firebase";

export const addUser = async (userData) => {
  // setDoc get the doc parameter as the reference and the data as a JSON file
  const userJSON = {
    uid: userData.uid,
    email: userData.email,
    movies: {}
  };
  try {
    // user ID as doc ID
    const userRef = doc(db, "User", userData.uid);

    // { merge: false } to avoid overwriting by accident
    await setDoc(userRef, userJSON, { merge: false });
    console.log("User added successfully!");
  } catch (error) {
    console.error("Error adding user: ", error);
  }
};

export const addMovieToUser = async (userData, movieId) => {
  try {
    const userRef = doc(db, "User", userData.uid);

    // Use arrayUnion to add the movieId if it doesn't already exist in the array
    await updateDoc(userRef, {
      movies: arrayUnion(movieId),
    });

    console.log(`Movie ${movieId} added to user ${userData.uid} successfully!`);
  } catch (error) {
    console.error("Error adding movie to user:", error);
  }
};

export const removeMovieFromUser = async (userData, movieId) => {
  try {
    const userRef = doc(db, "User", userData.uid);

    // Use arrayRemove to remove the movieId from the array
    await updateDoc(userRef, {
      movies: arrayRemove(movieId),
    });

    console.log(
      `Movie ${movieId} removed from user ${userData.uid} successfully!`
    );
  } catch (error) {
    console.error("Error removing movie from user:", error);
  }
};
