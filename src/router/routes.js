/* eslint-disable */
import "./firebase/firebaseConfig.js";
import "./firebase/firebase.js";
import "./firebase/auth-functions.js";
import { home } from './components/home.js';
import { register } from './components/register.js';
import { feed } from './components/feed.js';
import { registerOk } from './components/registerOk.js';

//import { firebaseConfig } from './Firebase/firebaseConfig.js';
//import { onAuthStateChanged } from './Firebase/firebaseConfig.js';

//console.log(onAuthStateChanged);

const rootDiv = document.getElementById("root");
export const routes = {
    "/": home,
    "/register": register,
    "/feed": feed,
    "/registerOk": registerOk,
};
/* eslint-enable */
