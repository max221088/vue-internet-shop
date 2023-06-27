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
  setDoc, 
  getDoc, 
  getFirestore,
   //deleteDoc
  } from "firebase/firestore";
import {  
  getAuth, 
  signOut, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
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
const AUTH = getAuth(app);

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
    ProductsOnPage: 10,
    cartProducts: [],
    showOrder: [],
    about: [],
    isLogin: false,
    userData: {}
    
    
  },
  getters: {
    getUserData (state) {
      return state.userData
    },
    getIsLogin (state) {
      return state.isLogin
    },
    getInfo (state) {
      return state.about
    },
    getShowOrder (state) {
      return state.showOrder
    },
    getCartProducts (state) {
      return state.cartProducts
    },
    getCartRenderData (state) {
      let prod = [];
      prod = state.productsForSearch.filter(el => {
        
          if (state.listProdId.indexOf(el.id) != -1) {
            el.amount = state.listProdAmount[el.id]
            return true
          } 
      })
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
    fetchCartFromSession (state, cart) {
      state.cartProducts = cart;
    },
    addOrderToUserHistory (state, order) {
      state.userData.history.push(order);
    },
    delProductFromCart (state, index) {
      state.cartProducts.splice(index, 1)
      window.sessionStorage.setItem('cart', JSON.stringify(state.cartProducts));
    },
    incrementAmount (state, index) {
      let newValue = state.cartProducts[index];
      newValue.amount++;
      state.cartProducts.splice(index, 1, newValue)
      window.sessionStorage.setItem('cart', JSON.stringify(state.cartProducts));
    },
    decrementAmount(state, index) {
      if (state.cartProducts[index].amount > 1) {
        let newValue = state.cartProducts[index];
        newValue.amount--;
        state.cartProducts.splice(index, 1, newValue)
      }
      window.sessionStorage.setItem('cart', JSON.stringify(state.cartProducts));
    },
    addAmountToCart (state, amount) {
      for (let i = 0; i < state.cartProducts.length; i++) {
        if (state.cartProducts[i].id === amount[0]) {
          state.cartProducts[i].amount = amount[1];
        }
      }
      window.sessionStorage.setItem('cart', JSON.stringify(state.cartProducts));
    },
    cartEmpty (state) {
      state.cartProducts = [];
      window.sessionStorage.removeItem('cart');
    },
    addProductToCard (state, prod) {
      let copy = 0;
      for (let i = 0; i < state.cartProducts.length; i++) {
        if (state.cartProducts[i].id === prod.id) {
          copy++
        }
      } 
      if (copy === 0) {
        state.cartProducts.push(prod);
      }
      window.sessionStorage.setItem('cart', JSON.stringify(state.cartProducts));
    },
    ProductSearch (state, filteredProduct) {
      state.productsDB = filteredProduct;
    },
    ProductsOnPage (state, quantity) {
      state.ProductsOnPage = quantity;
    }
  },
  actions: {
    fetchUserFromID (context, ID) {
      return getDocFromDB ('Users', ID)
      .then(data => {
        context.state.userData = [];
        context.state.userData = data.data();
        if (context.state.userData.role === 'user'){
          context.state.isLogin = true;
        } else {
          alert('wrong login or password')
        }
        })
      },
    logout (context) {
      signOut(AUTH)
        .then(() => {
          context.state.isLogin = false;
          context.state.userData = {}
        })
    },
    login (context, userCred) {
      console.log(userCred)
      signInWithEmailAndPassword(AUTH, userCred.email, userCred.pass) 
        .then((Credential) => {
          console.log(Credential.user.uid)
          context.dispatch('fetchUserFromID', Credential.user.uid);
            window.sessionStorage.setItem('login', JSON.stringify(userCred));
        })
        .catch((error) => {
          alert(error.message); 
        })
    },
    addUserDataToDB (context, userData) {
      return setDoc(doc(DB, 'Users', userData.uid), userData);
    },
    registerNewUser (context, registerData) {
      context.state.userData = registerData;
      createUserWithEmailAndPassword(AUTH, registerData.email, registerData.pass)
        .then((userCredential) => {
          // Signed in 
          context.state.userData.uid = userCredential.user.uid;
          context.state.userData.login = userCredential.user.email;
          delete context.state.userData.pass;
          delete context.state.userData.passConfirm;
          context.state.userData.history = [];
          context.state.userData.role = 'user';
          console.log(context.state.userData)
          context.dispatch('addUserDataToDB', context.state.userData);
          alert('Register Success')
          // ...
        })
        .catch((error) => {
          alert(error.message)
          // ..
        });
    },
    fetchAbout(context, content) {
      getDataFromDB(content)
        .then(data => {
          context.state.about = [];
          data.forEach(list => {
            context.state.about.push(list.data());
        });
      })
    },
    fetchOrderFromID (context, ID) {
      return getDocFromDB ('Orders', ID)
      .then(data => {
        context.state.showOrder = [];
        context.state.showOrder = data.data();
        })
      },
    addOrderToDB (context, order) {
      return setDoc(doc(DB, 'Orders', order.id), order);
    },
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
        context.state.product = [];
        context.state.product = data.data();
        })
      },

  },
  modules: {
  }
})
