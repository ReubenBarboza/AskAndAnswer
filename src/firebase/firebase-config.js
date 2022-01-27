import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";

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
  const { registerDisplayName, isModerator } = additionalData;
  try {
    await setDoc(userRef, {
      email,
      displayName: registerDisplayName,
      createdAt: Timestamp.fromDate(new Date()),
      isModerator: isModerator,
    });
    console.log("user doc set");
  } catch (error) {
    console.log("Error in creating user", error);
  }
};

export const createUserQuestion = async (user, additionalData) => {
  if (!user) return;
  const questionsRef = collection(db, "questions");
  const { displayName, uid } = user;
  const { question } = additionalData;

  try {
    await addDoc(questionsRef, {
      createdAt: Timestamp.fromDate(new Date()),
      displayName: displayName,
      question: question,
      reputation: 0,
      user: uid,
    });
    console.log("question added!");
  } catch (error) {
    console.log("Error in creating question", error);
  }
};
export const createUserAnswer = async (user, id, additionalData) => {
  if (!user) return;
  const answersRef = collection(db, `questions/${id}/answers`);
  const { displayName, uid } = user;
  const { answer } = additionalData;
  try {
    await addDoc(answersRef, {
      answer: answer,
      createdAt: Timestamp.fromDate(new Date()),
      displayName: displayName,
      reputation: 0,
      user: uid,
    });
    console.log("answer added!");
  } catch (error) {
    console.log("Error in creating answer", error);
  }
};
