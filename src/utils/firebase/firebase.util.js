import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDRsnzMsCm1nYDNPfbOTy_ZV2fiNVyJ2JQ",
    authDomain: "crown-db-17e0c.firebaseapp.com",
    projectId: "crown-db-17e0c",
    storageBucket: "crown-db-17e0c.appspot.com",
    messagingSenderId: "994451402722",
    appId: "1:994451402722:web:44a765ea9dd67b1e80d3bb"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.error('error creating the user', error.message);
        }
    }

    return userDocRef;
}