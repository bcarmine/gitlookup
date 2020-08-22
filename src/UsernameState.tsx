import { createContext, useState, useEffect} from 'react';
import * as React from 'react';
import {Plugins} from '@capacitor/core'
import { toast } from './toast';
import { getCurrentUser } from './firebaseConfig';
//import { setUsername }  from './api/projects'

var currentProj: Project[];
var resultFlag : boolean = false;

//getter and setter for the current project variable
function setCurrentProj(proj : Project[]){ currentProj = proj; }
function getCurrentProj() : Project[]{ return currentProj; }

export interface Project{
    name: string;
    html_url: string;
    description: string;
}

/*Github username that is entered by the user */
export interface Username {
    name: string;
    username: string;
    numProjects: number;
    projects: Project[];
}

/* Collection of Github usernames that a user enters*/ 
export interface Usernames{
    usernames: Username[];
}

const { Storage } = Plugins;

export async function saveUsernames(us : Username[]) {    

    us.map(async (u, index) => {
        resultFlag = false;
        setCurrentProj([]);

        fetcher2(u.username).then(response => {
            //console.log(response);
        }).finally(async() => {
            if(resultFlag){
                u.projects = getCurrentProj();
                u.numProjects = u.projects.length;
                resultFlag = false; //reset result flag
                if(index === us.length-1){
                    //tell the user when the info is updated
                    toast("Waitlist updated successfully!", 4000) 
                }
                updateUsernames(us);
            }else {
                toast("Github user does not exist! Try again.", 2000)
                updateUsernames(us.splice(index, 1))
            }
            
        });    
    });   

}

export async function updateUsernames(us : Username[]){
    await Storage.set({
        key: 'usernames',
        value: JSON.stringify(us)
    })
}

async function fetcher2(username : string){
    const URLpt1 = 'https://api.github.com/users/';
    const URLpt2 = '/repos';
    //piece the users repo URL together
    const repoURL = URLpt1.concat(username.concat(URLpt2));
    //fetch for the projects at the URL
        try{
            await fetch(repoURL, {
                method: 'GET',
                mode: 'cors'
            })
            .then(res => res.json())
            .then(projects => {
                var gitHubProjects =  projects.map((project: Project) => {
                    return {
                        name: project.name,
                        html_url: project.html_url,
                        description: project.description
                    }
                });
                //store the projects and cast them as type Project
                setCurrentProj(gitHubProjects as Project[]);
                resultFlag = true; //there was a result
                return gitHubProjects;
            }).catch(error => {
                console.log("error happened from fetch");
            });
        }catch(error){
            console.log(error)
        }
}

async function fetcher(username : string){
    const URLpt1 = 'https://api.github.com/users/';
    const URLpt2 = '/repos';
    //piece the users repo URL together
    const repoURL = URLpt1.concat(username.concat(URLpt2));
    //fetch for the projects at the URL
        try{
            await fetch(repoURL)
            .then(res => res.json())
            .then(projects => {
                const gitHubProjects =  projects.map((project: Project) => {
                    return {
                        name: project.name,
                        html_url: project.html_url,
                        description: project.description
                    }
                });
                //store the projects and cast them as type Project
                setCurrentProj(gitHubProjects as Project[]);
                return gitHubProjects;
            });
        }catch(error){
            console.log("A real error!")
            console.log(error)
        }
}

/**
 * react contexts allow you to use a provider component
 * at the highest level in the hierarchy to ensure all subcomponents
 * that want to use the consumer can get access to the state
 * stored in the relevant context
 * **/
let UsernamesContext = createContext({} as Usernames);

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


//let UsernamesContextProvider = UsernamesContext.Provider;
let UsernamesContextConsumer = UsernamesContext.Consumer;

export{UsernamesContext, 
        UsernamesContextProvider, 
        UsernamesContextConsumer};
