// Element where profile information will appear
const overview = document.querySelector(".overview");

// Unordered list for repos
const repoUnorderedList = document.querySelector(".repo-list");

const username = "armstrong-l";

const userFetch = async function() {
    userRes = await fetch(`https://api.github.com/users/${username}`);
    const userSelect = await userRes.json();
    console.log(userSelect);
    userDisplay(userSelect);
};

userFetch();

const userDisplay = function(userSelect) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${"https://avatars.githubusercontent.com/u/170788865?v=4"} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${userSelect.name}</p>
            <p><strong>Bio:</strong> ${userSelect.bio}</p>
            <p><strong>Location:</strong> ${userSelect.location}</p>
            <p><strong>Number of public repos:</strong> ${userSelect.public_repos}</p>
        </div>`;
        overview.append(div);
        };

const repoFetch = async function() {
    repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoList = await repoRes.json();
    console.log(repoList);
    reposDisplay(repoList);
};

const reposDisplay = function(repoList) {
for (repo of repoList) {
    let li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`
    repoUnorderedList.append(li);
}
};

repoFetch();