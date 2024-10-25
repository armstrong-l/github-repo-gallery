// Element where profile information will appear
const overview = document.querySelector(".overview");

// Unordered list for repos
const repoList = document.querySelector(".repo-list");

// Section that contains the repos
const repos = document.querySelector(".repos");

// Section that contains the repo data
const repoData = document.querySelector(".repo-data");


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
        repoFetch();
        };

const repoFetch = async function() {
    repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoInfo = await repoRes.json();
    console.log(repoInfo);
    reposDisplay(repoInfo);
};

const reposDisplay = function(repos) {
for (const repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`
    repoList.append(li);
}
}; 

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        repoDetails(repoName);
    }
});

const repoDetails = async function(repoName) {
    const repoDetailsRes = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoDetailsRes.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (let language in languageData) {
        languages.push(language);
        console.log(languages);
    }
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function(repoInfo, languages) {
    repoData.innerText = "";
    const specificRepo = document.createElement("div");
    specificRepo.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.clone_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(specificRepo);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
};