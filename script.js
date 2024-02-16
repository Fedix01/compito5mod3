let selectedName = document.getElementById("name");
let selectedUser = document.getElementById("username");
let selectedEmail = document.getElementById("email");

let mySelect = document.getElementById("mySelect");
console.log(mySelect.value);
let inputSearch = document.getElementById("inputSearch");
let myBtn = document.getElementById("btnSearch");

let tBody = document.getElementById("dynamicRows");


let endpoint = "https://jsonplaceholder.typicode.com/users";

myBtn.addEventListener("click", () => {
    getFromApi()
})

async function getFromApi() {
    try {
        const response = await fetch(endpoint);
        const parseBody = await response.json();
        search(parseBody)
    } catch (error) {
        console.log(error)
    }
}

function cycleRes(json) {
    tBody.innerHTML = "";

    json.forEach((user) => {
        console.log(user)
        createHtml(user)
    });
}

function createHtml(user) {
    let tBody = document.getElementById("dynamicRows");
    let tRows = document.createElement("tr");
    let id = document.createElement("th");
    id.innerText = user.id;
    let name = document.createElement("th");
    name.innerText = user.name;
    let username = document.createElement("th");
    username.innerText = user.username;
    let email = document.createElement("th");
    email.innerText = user.email;

    tRows.appendChild(id);
    tRows.appendChild(name);
    tRows.appendChild(username);
    tRows.appendChild(email);
    tBody.appendChild(tRows);
}

function search(json) {
    let selectValue = mySelect.value;
    let inputValue = inputSearch.value;
    if (selectValue === "Name") {
        let filteredName = json.filter((element) => {
            return element.name.toLowerCase().includes(inputValue.toLowerCase().trim())
        })
        cycleRes(filteredName)
    } else if (selectValue === "Username") {
        let filteredUsername = json.filter((element) => {
            return element.username.toLowerCase().includes(inputValue.toLowerCase().trim())
        })
        cycleRes(filteredUsername)
    } else if (selectValue === "Email") {
        let filteredEmail = json.filter((element) => {
            return element.email.toLowerCase().includes(inputValue.toLowerCase().trim())
        })
        cycleRes(filteredEmail)
    }
}