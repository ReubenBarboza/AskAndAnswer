import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQJ3k244OrPCbQo8oOI84GuXZVWZBwpGc",
  authDomain: "ask-and-answer-34ab1.firebaseapp.com",
  projectId: "ask-and-answer-34ab1",
  storageBucket: "ask-and-answer-34ab1.appspot.com",
  messagingSenderId: "595300265159",
  appId: "1:595300265159:web:db837ef0cde9882ab4e2e2",
  measurementId: "G-CTK10HLGQE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  const { email } = user;
  const { registerDisplayName } = additionalData;
  try {
    await setDoc(userRef, {
      email,
      displayName: registerDisplayName,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log("Error in creating user", error);
  }
};
