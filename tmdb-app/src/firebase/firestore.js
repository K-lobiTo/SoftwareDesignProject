import { doc, setDoc } from "firebase/firestore";
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

    // { merge: false } to avoid overwriting by accident
    await setDoc(userRef, userJSON, { merge: false });
    console.log("User added successfully!");
  } catch (error) {
    console.error("Error adding user: ", error);
  }
};
