const elBody = document.querySelector('body')
const elForm = document.querySelector('#main-form')
const elInput = document.querySelector('#main-input')
const elMode = document.querySelector('#mode-btn')
const elWrapper = document.querySelector('#wrapper')
const elTemplate = document.querySelector('#template').content

elMode.addEventListener('click', e => {
    elBody.classList.toggle('dark')
})

elForm.addEventListener('submit', e => {
    e.preventDefault()
    let InputValue = elInput.value.trim()

    ;(async function () {
        let someArray = []
        let responce = await fetch(`https://api.github.com/users/${InputValue}`)
        let result = await responce.json()
        someArray.push(result)

        renderUsers(someArray, elWrapper)
    })();
})

function renderUsers(array, node) {
    let userFragment = document.createDocumentFragment()
    node.innerHTML =null

    array.forEach(item => {
        let userTemplate = elTemplate.cloneNode(true);

        userTemplate.querySelector('#user-img').src = item.avatar_url 
        userTemplate.querySelector('#user-login').textContent = '@' + item.login 
        userTemplate.querySelector('#user-repo').textContent = item.public_repos
        userTemplate.querySelector('#user-name').textContent = item.name
        userTemplate.querySelector('#user-follower').textContent = item.followers
        userTemplate.querySelector('#user-following').textContent = item.following
        userTemplate.querySelector('#user-loc').textContent = item.location
        userTemplate.querySelector('#user-data').textContent = item.created_at
        userTemplate.querySelector('#user-id').textContent = item.id
        userTemplate.querySelector('#user-github').href = item.html_url 
        userTemplate.querySelector('#user-type').textContent = item.type 

        userFragment.appendChild(userTemplate)
    });

    elInput.value = null
    node.appendChild(userFragment)
}