// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC9l1t-l55GCkR71kt_xhB-Npa5E6sOIUs',
  authDomain: 'testfirebase-5d3b6.firebaseapp.com',
  databaseURL: 'https://testfirebase-5d3b6.firebaseio.com',
  projectId: 'testfirebase-5d3b6',
  storageBucket: 'testfirebase-5d3b6.appspot.com',
  messagingSenderId: '799266533322',
  appId: '1:799266533322:web:e6f1c2292b346cc098e933',
  measurementId: 'G-H9NLL1YNME',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
