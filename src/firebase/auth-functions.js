import {
    auth,
    createUserWithEmailAndPassword,
    provider,
    signOut,
    signInWithPopup,
    signInWithEmailAndPassword,
} from './firebase.js';

//Crear Usuario
const signUpWithPass = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const signInWithPass = (email, password) => signInWithEmailAndPassword(auth, email, password);
const viewer = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // currentUser.email = user.email;
            // currentUser.uid = user.uid;
            console.log("user logged in " + user.email)
        } else {
            console.log("user logged out ")
        }
    });
};
const logOut = (auth) => signOut(auth);
const popUpGoogle = () => signInWithPopup(auth, provider);

export {
    auth,
    signUpWithPass,
    signInWithPass,
    viewer,
    logOut,
    popUpGoogle,
};