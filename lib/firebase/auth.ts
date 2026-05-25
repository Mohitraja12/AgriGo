// lib/firebase/auth.ts
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from "firebase/auth";
import { auth } from "./config";

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function signIn({ email, password }: LoginCredentials): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

export function onAuthStateChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}