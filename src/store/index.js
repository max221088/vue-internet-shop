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
  doc, 
  //setDoc, 
  getDoc, 
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

function getDocFromDB (deskID, colID) {
  return getDoc(doc(DB, deskID, colID));
}

function getDataFromDB (colID) {
  return getDocs(collection(DB, colID))
}


export default new Vuex.Store({
  state: {
    productsDB: [],
    product: [],
    productsForSearch: [],
    categoriesDB: [],
    ProductsOnPage: 1,
    listProdAmount: {},
    listProdId: [],
    cartRenderData: {}
    
  },
  getters: {
    getCartRenderData (state) {
      let prod = [];
      prod = state.productsForSearch.filter(el => {
        
          if (state.listProdId.indexOf(el.id) != -1) {
            el.amount = state.listProdAmount[el.id]
            return true
          } 
      })
      console.log(prod)
      return prod;
    },
    getListProd (state) {
      return state.listProdAmount;
    },
    getProductsForSearch (state) {
      return state.productsForSearch;
    },
    getCategoriesFromDB (state) {
      return state.categoriesDB;
    },
    getProductsFromDB (state) {
      return state.productsDB;
    },
    getProduct (state) {
      return state.product;
    },
    getProductsForRender (state) {
       let index = 0;
       let paginatedProducts = [[]];
       for (let i = 0; i < state.productsDB.length; i++) {
        if (i % state.ProductsOnPage == 0 && i != 0) {
          index ++;
          paginatedProducts[index] = []
        }
        paginatedProducts[index].push(state.productsDB[i]);
      }
      return paginatedProducts;
    },
  },
  mutations: {
    ListProductIDUpdate (state, id) {
      if (state.listProdId.indexOf(id) == -1) {
        state.listProdId.push(id)
      }
      console.log(state.listProdId)
    },
    ListProductAmountUpdate (state, prod) {
      state.listProdAmount[prod[0]] = prod[1]
      //state.listProdAmount[prod[0]] = prod;
      console.log(state.listProdAmount)
    },
    ProductSearch (state, filteredProduct) {
      state.productsDB = filteredProduct;
    },
    ProductsOnPage (state, quantity) {
      state.ProductsOnPage = quantity;
    }
  },
  actions: {
    fetchProducts(context) {
      let products = [];
      getDataFromDB('Products')
        .then(data => {
          data.forEach(list => {
            products.push(list.data());
        });
        products.sort(function (a, b) {
          if (Number(a.order) > Number(b.order)) {
            return 1;
          }
          if (Number(a.order) < Number(b.order)) {
            return -1;
          }
        });
        context.state.productsForSearch = products;
        context.state.productsDB = products;
        
      })
    },
    fetchCategories(context) {
      getDataFromDB('Сategories')
        .then(data => {
          context.state.categoriesDB = [];
          data.forEach(list => {
            context.state.categoriesDB.push(list.data());
        });
      })
    },
    fetchProductFromID (context, ID) {
      return getDocFromDB ('Products', ID)
      .then(data => {
        console.log(data.data());
        context.state.product = [];
        context.state.product = data.data();
        })
      },
      fetchProductForCard (context) {
        context.state.cartRenderData = [];
        for (let i = 0; i < context.state.listProdId.length; i++) {
          let ID = context.state.listProdId[i]
          console.log(context.state.listProdId[i])
           return getDocFromDB ('Products', ID)
           .then(data => {
           console.log(data.data());
           console.log(context.state.cartRenderData);
            context.state.cartRenderData.push(data.data())
           //context.state.cartRenderData[i] = data.data();
         })
          

      }
 
        },
  },
  modules: {
  }
})
