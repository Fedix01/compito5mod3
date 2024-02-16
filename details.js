
let endpoint = "https://jsonplaceholder.typicode.com/users";

let params = new URLSearchParams(location.search);
let userId = params.get("id");

let homePage = document.getElementById("home-page");

homePage.addEventListener("click", () => {
    window.location.href = "index.html";
})

console.log(userId)

window.onload = async function getFromApi() {
    try {
        const response = await fetch(`${endpoint}?id=${userId}`);
        const json = await response.json();
        cycleRes(json)
    } catch (error) {
        console.log(error)
    }
}

function cycleRes(json) {
    json.forEach((info) => {
        console.log(info)
        createHtml(info)
    })
}

function createHtml({ address, company, name, username, email, phone, website }) {
    console.log(company)
    let nameCont = document.getElementById("name");
    let addressCont = document.getElementById("address");
    let companyCont = document.getElementById("company");
    let personalCont = document.getElementById("personal");

    let addName = document.createElement("h2");
    addName.innerText = name + " " + username;
    nameCont.appendChild(addName);

    let firstName = document.createElement("h4");
    firstName.innerText = `Name: ${name}`;
    let userEmail = document.createElement("h4");
    userEmail.innerText = `Email: ${email}`;
    let userPhone = document.createElement("h4");
    userPhone.innerText = `Phone number: ${phone}`;
    let userWebsite = document.createElement("h4");
    userWebsite.innerText = `Website: ${website}`;

    personalCont.appendChild(firstName);
    personalCont.appendChild(userEmail);
    personalCont.appendChild(userPhone);
    personalCont.appendChild(userWebsite);

    let addStreet = document.createElement("h4");
    addStreet.innerText = `Address: ${address.street}`;
    let addSuite = document.createElement("h4");
    addSuite.innerText = `Apartment: ${address.suite}`;
    let addCity = document.createElement("h4");
    addCity.innerText = `City: ${address.city}`;


    addressCont.appendChild(addStreet);
    addressCont.appendChild(addSuite);
    addressCont.appendChild(addCity);

    let compName = document.createElement("h4");
    compName.innerText = `Company Name: ${company.name}`;
    let catchPhrase = document.createElement("h4");
    catchPhrase.innerText = `CatchPhrase is: ${company.catchPhrase}`;

    companyCont.appendChild(compName);
    companyCont.appendChild(catchPhrase);



}