const cartsAPI = `https://fakestoreapi.com/carts`;
const productsAPI = `https://fakestoreapi.com/products`;

const cartsBody = document.getElementById("cartsBody");
const loadingState = document.getElementById("loadingState");
const emptyState = document.getElementById("emptyState");
const resultsLabel = document.getElementById("resultsLabel");
const searchInput = document.getElementById("searchInput");

let carts = [];
let filteredCarts = [];

fetch(cartsAPI)
  .then((res) => res.json())
  .then((data) => {
    carts = data;
    filteredCarts = carts;
    showCarts(data);
  });

fetch(productsAPI)
  .then((res) => res.json())
  .then((data) => showProducts(data));

function showCarts(data) {
  data.forEach((element) => {
    const { id, date, userId } = element;
    cartsBody.innerHTML += `
    <p>${id}</p>
    <p>${userId}</p>
    <p>${date}</p>
    `;
  });
}

function showProducts(data) {
  data.forEach((element) => {
    const { id, title, price } = element;
    cartsBody.innerHTML += `
    <p>${id}</p>
    <p>${title}</p>
    <p>${price}</p>
    `;
  });
}
