//internal imports
import { toast } from '../components/toast';
import { fetcher , fetchUser} from './FetcherAPI'
import { Project, Username, UserData } from './Types'
import { updateUsernames } from './Context'

// ----------------------------- Fields ------------------------------------------

//field for storing the current projects from the fetch function
var currentProj: Project[];
//flag used to determine whether the fetcher provided a result
var resultFlag : boolean = false;
//field for storing the current user data from the fetch function 
var currentUserData : UserData;
//field for storing the currently selected user
var selectedUser: Username;

// ----------------------------- Getters and Setters -----------------------------

/**
 * Setter for the current project field.
 * @param {Project[]} [proj = []] the value to set
 */
export function setCurrentProj(proj : Project[] = []){ currentProj = proj; }
/* Getter for the current project field */
function getCurrentProj() : Project[]{ return currentProj; }

/**
 * Setter for the result flag.
 * The flag determines whether the fetcher provided a result
 * @param {boolean} [value = false] the value to set
 */
export function setResultFlag(value : boolean = false){ resultFlag = value; }
/*** getter for the result flag */
function getResultFlag(){ return resultFlag; }

/**
 * Setter for the current user data field.
 * @param {UserData} value 
 */
export function setCurrentUserData(value : UserData = {followers: 0, following: 0, publicRepos: 0}){
    currentUserData = value;
}
/** Getter for the current user data field */
function getCurrentUserData() : UserData { return currentUserData; }

/**
 * Setter for the selected user field
 * @param value The username object to set
 */
export function setSelectedUser(value : Username){ selectedUser = value; }
/**Getter for the selected user field */
export function getSelectedUser(){ return selectedUser; }

// ----------------------------- Functions ----------------------------------------

/**
 * Takes some usernames, fetches their projects, 
 * updates the username object with its projects.
 * Uses toasts to communicate success/failure with the user.
 * @param {Username[]} us the usernames to save
 */
export async function saveUsernames(us : Username[]) { 
    //handles the case where the only watchlist username is deleted   
    if(us.length === 0){
        updateUsernames(us)
        toast("Watchlist updated successfully!", 2000)
        return;
    }

    //if there is a duplicate, remove it!
    if(checkDuplicateEntry(us)){
        us.splice(us.length-1, 1)
        updateUsernames(us)
        toast("Error: This username is already on your watchlist!", 3000)
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
                    
                    updateUsernames(us); //write the usernames state to storage
                    resetProjectState() //reset the projects, flag, and user data
                    if(index === us.length-1){
                        toast("Watchlist updated successfully!", 2000)  //tell the user that there was success
                    }
                })

            }else { // fetch was unsucessful
                //tell the user that the fetch was unsuccessful
                toast("Github user does not exist! Try again.", 2000)
                us.splice(index, 1) //exclude the failed entry
                updateUsernames(us) //rewrite the usernames to local storage
                return; 
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

