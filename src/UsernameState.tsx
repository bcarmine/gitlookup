import { createContext, useState, useEffect} from 'react';
import * as React from 'react';
import {Plugins} from '@capacitor/core'
import { toast } from './toast';

/*Github username that is entered by the user */
export interface Username {
    name: string;
    username: string;
}

/* Collection of Github usernames that a user enters*/ 
export interface Usernames{
    usernames: Username[];
}

const { Storage } = Plugins;

export async function saveUsernames(us : Username[]) {
    await Storage.set({
        key: 'usernames',
        value: JSON.stringify(us)
    })
    toast("Waitlist updated successfully!", 4000) 
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
