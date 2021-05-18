'use strict'

var url = 'https://api.github.com/users';
var githubAPI = fetch(url, {
    headers: {
        'Authorization': `token ${githubToken}`
    }
});

console.log(githubAPI)

function getLastCommitDate(username) {
    return fetch(`https://api.github.com/users/${username}/events`, {
        headers: {'Authorization': `token ${githubToken}`}
    }).then(response => response.json())
        //turning it into an promise object above
        .then(events => {
            return events.filter(event => event.type ==="PushEvent")[0].created_at;
        });
}

getLastCommitDate('rogeliosandoval').then(date => {
    console.log(new Date(date).toDateString());
});