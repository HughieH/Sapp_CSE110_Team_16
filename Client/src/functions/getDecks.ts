import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


async function getDecks(userId: string): Promise<any | null> {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data().decks || null;
    } else {
      console.log("No such document!");
      return null;
    }
  } 
  catch (error) {
    console.error("Error retrieving decks:", error);
    throw error;
  }
}