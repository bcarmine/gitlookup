import { createContext, useState, useEffect} from 'react';
import * as React from 'react';
import { Plugins } from '@capacitor/core'
import { Usernames, Username } from './Types'


// used for accessing the local storage
export const { Storage } = Plugins;

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

let UsernamesContext = createContext({} as Usernames);

//react contexts allow you to use a provider component
// at the highest level in the hierarchy to ensure all subcomponents
// that want to use the consumer can get access to the state
// stored in the relevant context

 /**
  * Context provider will provide a hook with the user data in it.
  * The user data may be the initial empty array, or from storage.
  * @param props Props
  */
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