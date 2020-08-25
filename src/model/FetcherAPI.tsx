import { setCurrentProj, setResultFlag, setCurrentUserData } from './UserState'
import { Project } from './Types'

/**
 * Function to fetch github projects of a given user from
 * the github repo api. 
 * The fetched projects are put into the current project field.
 * @param {string} username the username to fetch
 */
export async function fetcher(username : string){
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
            //map the projects into an array
            var gitHubProjects =  projects.map((project: Project) => {
                return {
                    name: project.name,
                    html_url: project.html_url,
                    description: project.description,
                    language: project.language
                }
            });
            //store the projects and cast them as type Project
            setCurrentProj(gitHubProjects as Project[]);
            setResultFlag(true); //flag = there has been a result
            
        }).catch(error => {
            //reassurance for anyone looking at the console
            console.log("Error has been handled and can be ignored");
        });
    }catch(error){
        console.log(error);
    }
};

/**
 * Function to fetch github user information from the
 * github user api.
 * Fetched data is put into a currentUserData object.
 * 
 * NOTE: it is assumed that the username is a valid github
 * username as this method is only called if fetcher succeeds. 
 * 
 * @param username The username to fetch data on
 */
export async function fetchUser(username : string){
    const URLpt1 = 'https://api.github.com/users/';
    //piece the users repo URL together
    const repoURL = URLpt1.concat(username);
    //fetch for the user data at the URL
    await fetch(repoURL, {
        method: 'GET',
        mode: 'cors'
    })
    .then(res => res.json())
    .then(userData => { //store the user data
        setCurrentUserData({followers : userData.followers, 
            following : userData.following, publicRepos: userData.public_repos});
    });
}