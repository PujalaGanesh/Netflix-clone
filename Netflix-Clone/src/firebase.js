
import { initializeApp } from "firebase/app";
import {
     createUserWithEmailAndPassword,
     getAuth, 
     signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
import { 
    addDoc,
    collection,
     getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyCgpMeHlYjaCQFqQyp4_pBuR8VQS0GB0Bw",
  authDomain: "netflix-clone-d7813.firebaseapp.com",
  projectId: "netflix-clone-d7813",
  storageBucket: "netflix-clone-d7813.appspot.com",
  messagingSenderId: "912839152076",
  appId: "1:912839152076:web:ef171f947ff9cdcecd4d69"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res =   await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc((db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await  signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout= ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};