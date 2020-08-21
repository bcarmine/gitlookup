const fetch = require('node-fetch');

const repoURL = 'https://api.github.com/users/marcusklein/repos';

module.exports = (req, res) => {
    fetch(repoURL)
        .then(res => res.json())
        .then(projects => {
            const gitHubProjects = projects.map(project => {
                return {
                    name: project.name,
                    html_url: project.html_url,
                    description: project.description
                }
            });
            res.json(gitHubProjects);   
        });
}