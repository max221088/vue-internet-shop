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

function getDataFromDB (colID) {
  return getDocs(collection(DB, colID))
}


export default new Vuex.Store({
  state: {
    productsDB: [],
    productsForSearch: [],
    categoriesDB: [],
    Query: '',
    SelectedCategory: [],
    CurrentPage: 0,
    ProductsOnPage: 1
  },
  getters: {
    getProductsForRender (state) {
      return state.productsDB;
    },
    getProductsForSearch (state) {
      return state.productsForSearch;
    },
    getCategoriesFromDB (state) {
      return state.categoriesDB;
    },
    getQuery(state) {
      return state.Query;
    },
    getSelectedCategory(state) {
      return state.SelectedCategory;
    },
    getCurrentPage(state) {
      return state.CurrentPage;
    },
    getProductsOnPage(state) {
      return state.ProductsOnPage;
    },
  },
  mutations: {
    filteredProducts (state, filtProd) {
      state.productsDB = filtProd;
    },
    Query (state, Query) {
      state.Query = Query;
    },
    SelectedCategory (state, SelectedCategory) {
      state.SelectedCategory = SelectedCategory;
    },
    CurrentPage (state, CurrentPage) {
      state.CurrentPage = CurrentPage;
    }
  },
  actions: {
    fetchProducts(context) {
      let products = [];
      let paginatedProducts = [[]];
      let index = 0;
      getDataFromDB('Products')
        .then(data => {
          //context.state.productsDB = [];
          data.forEach(list => {
            //context.state.productsDB.push(list.data());
            products.push(list.data());
        });
        for (let i = 0; i < products.length; i++) {
          if (i % context.state.ProductsOnPage == 0 && i != 0) {
            index ++;
            paginatedProducts[index] = []
          }
          paginatedProducts[index].push(products[i]);
        }
        context.state.productsDB = paginatedProducts;
        //console.log(context.state.productsDB)
      })
    },
    fetchProductsForSearch(context) {
      getDataFromDB('Products')
        .then(data => {
          context.state.productsForSearch = [];
          data.forEach(list => {
            context.state.productsForSearch.push(list.data());
        });
        //console.log(context.state.productsForSearch)
      })
    },
    fetchCategories(context) {
      getDataFromDB('Сategories')
        .then(data => {
          context.state.categoriesDB = [];
          data.forEach(list => {
            context.state.categoriesDB.push(list.data());
        });
       // console.log(context.state.categoriesDB)
      })
    },
  },
  modules: {
  }
})
