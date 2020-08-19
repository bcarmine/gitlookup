import * as firebase from 'firebase'
import { toast } from './toast';
const config ={
    apiKey: "AIzaSyAXsO0YnCtojH6zNt1MzotEUIojAo9eYz4",
    authDomain: "git-lookup.firebaseapp.com",
    databaseURL: "https://git-lookup.firebaseio.com",
    projectId: "git-lookup",
    storageBucket: "git-lookup.appspot.com",
    messagingSenderId: "644574263867",
    appId: "1:644574263867:web:830305d5e132591f917a1e",
    measurementId: "G-6S8BVM71B1"
};

firebase.initializeApp(config)

export async function getDB(){
    return firebase.database()
}

export async function getData(){
    var database = firebase.database()
    return database.ref().once('value').then(function(snapshot){
      var name = (snapshot.val())
        //console.log(name)
    })
  }

export async function logoutUser(){
    console.log('logout')
    return firebase.auth().signOut()
}

export function getCurrentUser(){
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(function(user){
            if(user){
                resolve(user)
            }else{
                resolve(null)
            }
            unsubscribe()
        })
    })
}

export async function loginUser(email: string, password:string){
    try{
        const res = await firebase.auth().signInWithEmailAndPassword(email, password)
        return res
    }catch(error){
        console.log(error)
        toast(error.message, 4000)
        return false
    }
}

export async function registerUser(email: string, password:string){
    try{
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
        return true
    }catch(error){
        toast(error.message, 4000)
        return false
    }
}

export default config;