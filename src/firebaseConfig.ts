import * as firebase from 'firebase'
import { toast } from './components/toast';

//api configuration
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

/**
 * Logout the user and returns the result.
 * Informs the user of a successful logout.
 */
export async function logoutUser(){
    toast('Logout successful', 2000)
    return firebase.auth().signOut()
}

/**
 * Function to determine whether there is a
 * user signed in or not and returns the user if this is true.
 */
export function getCurrentUser(){
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(function(user){
            if(user){
                resolve(user) //signed in
            }else{
                resolve(null) //not signed in
            }
            unsubscribe()
        })
    })
}

/**
 * Attempt to Login the user through firebase. 
 * @param email The email to use.
 * @param password The password to use.
 */
export async function loginUser(email: string, password:string){
    try{
        const res = await firebase.auth().signInWithEmailAndPassword(email, password)
        return res; //return the result
    }catch(error){ //handle an error and inform the user
        toast(error.message, 4000)
        return false;
    }
}

/**
 * Attempt to register the user through firebase.
 * Note that the register page has already checked the entered passwords match.
 * @param email The email to register.
 * @param password The password to register.
 */
export async function registerUser(email: string, password:string){
    try{
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        return true; //if there was no error, then return true
    }catch(error){ //handle an error and inform the user
        toast(error.message, 4000)
        return false;
    }
}

export default config;