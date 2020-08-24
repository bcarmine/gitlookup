import { Project, setCurrentProj, setResultFlag, setCurrentUserData } from './UsernameState'

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
            setResultFlag(true);
            
        }).catch(error => {
            //reassurance for anyone looking at the console
            console.log("Error has been handled and can be ignored");
        });
    }catch(error){
        console.log(error);
    }
};

/**
 * 
 * @param username 
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
    .then(userData => {
        setCurrentUserData({followers : userData.followers, 
            following : userData.following, publicRepos: userData.public_repos});
    });
}