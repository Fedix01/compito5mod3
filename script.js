let inputSearch = document.getElementById("inputSearch");
let myBtn = document.getElementById("btnSearch");

let endpoint = "https://jsonplaceholder.typicode.com/users";
fetch(endpoint)
    .then((result) => result.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err))