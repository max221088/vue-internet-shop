import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {  
  getDocs, 
  collection, 
  //doc, 
  //setDoc, 
  //getDoc, 
  getFirestore,
   //deleteDoc
  } from "firebase/firestore";
// import {  
//   getAuth, 
//   signOut, 
//   signInWithEmailAndPassword
// } from "firebase/auth";
// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyAVJlSbSBMLK3lFnFLNsPIxE5C0ZFrJoFU",
  authDomain: "internet-shop-37493.firebaseapp.com",
  databaseURL: "https://internet-shop-37493-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "internet-shop-37493",
  storageBucket: "internet-shop-37493.appspot.com",
  messagingSenderId: "486324770247",
  appId: "1:486324770247:web:7263ac3ac6daeded2b75e2"
});

// Initialize Firebase
const DB = getFirestore(app);
//const AUTH = getAuth(app);

// function getDocFromDB (deskID, colID) {
//   return getDoc(doc(DB, deskID, colID));
// }

function getNotesFromDB (colID) {
  return getDocs(collection(DB, colID))
}


export default new Vuex.Store({
  state: {
    productsDB: [],
  },
  getters: {
    getProductsFromDB (state) {
      return state.productsDB;
    },
  },
  mutations: {
  },
  actions: {
    fetchProducts(context) {
      getNotesFromDB('Products')
        .then(data => {
          context.state.productsDB = [];
          data.forEach(list => {
            context.state.productsDB.push(list.data());
        });
        console.log(context.state.productsDB)
      })
    },
  },
  modules: {
  }
})
