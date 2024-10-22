// Element where profile information will appear
const overview = document.querySelector(".overview");

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

