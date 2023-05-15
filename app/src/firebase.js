import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAlKOvuYUt5TQRkcLDvJEhxCoQpTubygmM',
  authDomain: 'my-recipes-aa980.firebaseapp.com',
  projectId: 'my-recipes-aa980',
  storageBucket: 'my-recipes-aa980.appspot.com',
  messagingSenderId: '926297647098',
  appId: '1:926297647098:web:1397ad3f16f56fa2266643',
  measurementId: 'G-M9R8K42DPF',
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
const database = firebase.database()
const db = app.firestore()
export const auth = app.auth()
export default app
export { storage, db, database }
