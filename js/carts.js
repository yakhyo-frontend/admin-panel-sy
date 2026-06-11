const cartsAPI = "https://fakestoreapi.com/carts";
const productsAPI = `https://fakestoreapi.com/products`;
const tBody = document.querySelector("tbody");

const fetchData = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showData(data);
    });
};

fetch(cartsAPI);

// let firstName, lastName;

function showData(data) {
  console.log(data);

  data.map((item) => {
    const { id, userId, products, date } = item;

    tBody.innerHTML += `
              <tr class="table-row">
              <td>${id}</td>
              <td>${userId}</td>
              <td>${date}</td>
              <td>3</td>
              <td>
                <button onclick="viewModal(${userId})">View</button>
              </td>
              </tr>
    `;

    getSingleUser(userId);
  });
}

// GetSingleUser
const getSingleUser = (id) => {
  console.log(id);

  fetch(`https://fakestoreapi.com/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");
const content = document.querySelector(".content");

if (openModal && closeModal && modal) {
  openModal.addEventListener("click", () => {
    modal.classList.add("show");
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
}

function viewModal(userId) {
  if (elViewModal) {
    elViewModal.classList.add("show");

    console.log(userId);

    fetch(`https://fakestoreapi.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const { name } = data;

        content.innerHTML = `
         <div>
              <p>Ism : ${name.firstName}</p>
              <p>Familiya : ${name.lastName}</p>
            </div>
        `;
      });
  }
}
