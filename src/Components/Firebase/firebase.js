import * as app from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/database'
import "firebase/auth"

const config = {
  apiKey: "AIzaSyBWxMmUdKeRYfvPFKe5dsto2RdprUf7MtA",
  authDomain: "egyptian-war.firebaseapp.com",
  databaseURL: "https://egyptian-war.firebaseio.com",
  projectId: "egyptian-war",
  storageBucket: "egyptian-war.appspot.com",
  messagingSenderId: 526714168101,
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.database = app.database()
    this.db = app.firestore()
    this.auth = app.auth()
  }
  createRoom = () => {
    return this.db.collection("rooms")
  }
  findRoom = (id) => {
    return this.db.collection("rooms").doc(id)
  }
}

export default Firebase