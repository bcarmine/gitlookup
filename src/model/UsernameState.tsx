import { createContext, useState, useEffect} from 'react';
import * as React from 'react';
import { Plugins } from '@capacitor/core'
import { toast } from '../components/toast';
import { fetcher , fetchUser} from './Fetcher'

//field for storing the current projects from the fetch function
var currentProj: Project[];
//flag used to determine whether the fetcher provided a result
var resultFlag : boolean = false;
// used for accessing the local storage
const { Storage } = Plugins;
//field for storing the current user data from the fetch function 
var currentUserData : UserData;

/**
 * Setter for the current project field.
 * @param {Project[]} [proj = []] the value to set
 */
export function setCurrentProj(proj : Project[] = []){ currentProj = proj; }
/* Getter for the current project field */
export function getCurrentProj() : Project[]{ return currentProj; }

/**
 * Setter for the result flag.
 * The flag determines whether the fetcher provided a result
 * @param {boolean} [value = false] the value to set
 */
export function setResultFlag(value : boolean = false){ resultFlag = value; }
/*** getter for the result flag */
export function getResultFlag(){ return resultFlag; }

/**
 * Setter for the current user data field.
 * @param {UserData} value 
 */
export function setCurrentUserData(value : UserData = {followers: 0, following: 0, publicRepos: 0}){
    currentUserData = value;
}
/** Getter for the current user data field */
export function getCurrentUserData() : UserData { return currentUserData; }

/* Username interface: Github username that is entered by the user */
export interface Username {
    name: string;
    username: string;
    projects: Project[];
    followers: number;
    following: number;
    numRepos: number;
}

/* Usernames interface: Array of Username interfaces*/ 
export interface Usernames{ usernames: Username[]; }

/* Project interface: Projects that have been fetched from github*/
export interface Project{
    name: string;
    html_url: string;
    description: string;
}

export interface UserData{
    followers: number;
    following: number;
    publicRepos: number;
}

/**
 * Takes some usernames, fetches their projects, 
 * updates the username object with its projects.
 * Uses toasts to communicate success/failure with the user.
 * @param {Username[]} us the usernames to save
 */
export async function saveUsernames(us : Username[]) {    
    //if there is a duplicate, remove it!
    if(checkDuplicateEntry(us)){
        us.splice(us.length-1, 1)
        updateUsernames(us)
        toast("Error: This username is already on your watchlist!", 2000)
        return; //stop the function there
    }

    us.map(async (u, index) => {
        resetProjectState() //reset the projects and flag

        fetcher(u.username).finally(async() => {
            if(getResultFlag()){ //fetch was successful
                //get the recently fetched projects and update user
                u.projects = getCurrentProj();

                fetchUser(u.username).finally(() => {
                    u.followers = getCurrentUserData().followers;
                    u.following = getCurrentUserData().following;
                    u.numRepos = getCurrentUserData().publicRepos;
                })

                resetProjectState() //reset the projects, flag, and user data

                if(index === us.length-1){
                    //tell the user when the info is updated
                    toast("Waitlist updated successfully!", 2000) 
                }
                updateUsernames(us); //write the usernames state to storage
            }else { // fetch was unsucessful
                //tell the user that the fetch was unsuccessful
                toast("Github user does not exist! Try again.", 2000)
                us.splice(index, 1) //exclude the failed entry
                updateUsernames(us) //rewrite the usernames to local storage
            }
        });    
    });   
}

/**
 * Reset the state of the current fetched project
 * and result flag - helper function.
 */
function resetProjectState(){
    setCurrentProj();
    setResultFlag();
    setCurrentUserData();
}

/**
 * Write the given username array into local storage.
 * @param {Username[]} us the username array to write
 */
export async function updateUsernames(us : Username[]){
    await Storage.set({
        key: 'usernames',
        value: JSON.stringify(us)
    });
}

/**
 * Checks if the most recent entry in the usernames array
 * has a username value that is already in another username object 
 * in the array.
 * @param {Username[]} us the usernames to check
 */
function checkDuplicateEntry(us : Username[]){
    var dup = us.slice(0); //duplicate
    var usernames : string[] = [];
    dup.forEach(u => { //extract the usernames
        usernames.push(u.username)
    })
    var last = usernames[usernames.length-1]
    usernames.pop()
    //return whether the most recently entered 
    //username is already in the array
    return usernames.includes(last);
}

let UsernamesContext = createContext({} as Usernames);

/**
 * react contexts allow you to use a provider component
 * at the highest level in the hierarchy to ensure all subcomponents
 * that want to use the consumer can get access to the state
 * stored in the relevant context
 * **/
function UsernamesContextProvider(props: {children: React.ReactNode; }){
    const [initialUsernames, setInitialUsernames] = useState([] as Username[]);

    useEffect(() => {
        Promise.resolve(Storage.get({key: 'usernames'}).then(
            (result: any) => {
                if(typeof result.value === 'string'){
                    setInitialUsernames(JSON.parse(result.value) as Username[]);
                }
            },
            (reason: any) => console.log("Failed to load usernames from storage because of:" + reason)
        ));
    },[]); //forces useEffect to be run once

    return(
        <UsernamesContext.Provider value = {
            {usernames : initialUsernames}
        }>{props.children}
        </UsernamesContext.Provider>
    )
}

let UsernamesContextConsumer = UsernamesContext.Consumer;

export{UsernamesContext, 
        UsernamesContextProvider, 
        UsernamesContextConsumer};
