const elForm = document.querySelector("#main-form");
const elInput = document.querySelector("#main-input");
const elWrapper = document.querySelector("#wrapper");
const elTemplate = document.querySelector("#template").content;

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let InputValue = elInput.value.trim();

  (async function () {
    let someArray = [];
    let responce = await fetch(`https://api.github.com/users/${InputValue}`);
    let result = await responce.json();
    someArray.push(result);

    renderUsers(someArray, elWrapper);
  })();
});

function renderUsers(array, node) {
  let userFragment = document.createDocumentFragment();
  node.innerHTML = null;

  array.forEach((item) => {
    let userTemplate = elTemplate.cloneNode(true);

    console.log(item);

    userTemplate.querySelector("#user-img").src = item.avatar_url;
    userTemplate.querySelector("#user-github").href = item.html_url;
    userTemplate.querySelector("#user-login").textContent = "@" + item.login;
    userTemplate.querySelector("#user-repo").textContent = item.public_repos;
    userTemplate.querySelector("#user-name").textContent = item.name;
    userTemplate.querySelector("#user-follower").textContent = item.followers;
    userTemplate.querySelector("#user-following").textContent = item.following;
    userTemplate.querySelector("#user-loc").textContent = item.location;
    userTemplate.querySelector("#user-twitter").textContent =
      item.twitter_username;
    userTemplate.querySelector("#user-company").textContent = item.company;
    userTemplate.querySelector("#user-summary").textContent = item.bio;
    userTemplate.querySelector("#user-linkedin").textContent =
      item.blog.slice(16);

    userFragment.appendChild(userTemplate);
  });

  elInput.value = null;
  node.appendChild(userFragment);
}
