
let mySelect = document.getElementById("mySelect");
console.log(mySelect.value);
let inputSearch = document.getElementById("inputSearch");
let myBtn = document.getElementById("btnSearch");

let tBody = document.getElementById("dynamicRows");

if (localStorage.getItem("lastSearch") && localStorage.getItem("lastSelect")) {
    inputSearch.value = localStorage.getItem("lastSearch");
    mySelect.value = localStorage.getItem("lastSelect")
}

let endpoint = "https://jsonplaceholder.typicode.com/users";

myBtn.addEventListener("click", () => {
    getFromApi()
})

async function getFromApi() {
    localStorage.setItem("lastSearch", inputSearch.value);
    localStorage.setItem("lastSelect", mySelect.value);

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
    let details = document.createElement("th");
    let detailsBtn = document.createElement("button");
    detailsBtn.innerText = "Details";
    detailsBtn.classList.add("btn", "btn-outline-success");
    detailsBtn.addEventListener("click", () => {
        userDetails(user.id)
    })
    details.appendChild(detailsBtn);


    tRows.appendChild(id);
    tRows.appendChild(name);
    tRows.appendChild(username);
    tRows.appendChild(email);
    tRows.appendChild(details);
    tBody.appendChild(tRows);
}

function search(json) {
    let selectValue = mySelect.value;
    let inputValue = inputSearch.value;
    if (inputValue === "") {
        return cycleRes(json)
    }
    let filteredValue = json.filter((element) => {
        return element[selectValue.toLowerCase()].toLowerCase().includes(inputValue.toLowerCase().trim())
    })
    cycleRes(filteredValue)
}

function userDetails(userId) {
    let newPage = "details.html";
    window.location.href = `${newPage}?id=${userId}`;
}

window.onload = getFromApi()