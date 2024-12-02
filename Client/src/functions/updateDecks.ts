import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

async function updateDecks(userId: string, newDecks: Array<Record<string, string>>) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      decks: newDecks,
    });
    console.log("Decks updated successfully!");
  } catch (error) {
    console.error("Error updating decks:", error);
  }
}