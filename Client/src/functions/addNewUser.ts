import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

async function addNewUser() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "John Doe",
      email: "johndoe@example.com",
      createdAt: new Date(),
    });
    console.log("New user added!");
  } catch (e) {
    console.error("User already exists");
  }
}