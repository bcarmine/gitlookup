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
    language: string;
}

export interface UserData{
    followers: number;
    following: number;
    publicRepos: number;
}