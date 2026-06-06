const API = "https://fakestoreapi.com/users";

const tbody = document.querySelector("tbody");

const getUsers = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showUsers(data);
    })
    .catch((error) => {
      Toastify({
        text: " Invalid api ",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
      }).showToast();

      console.log(error);
    });
};

getUsers(API);

function showUsers(users) {
  tbody.innerHTML = "";

  users.forEach((user) => {
    const { id, email, username, password, phone } = user;

    tbody.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>${email}</td>
        <td>${username}</td>
        <td>${password}</td>
        <td>${phone}</td>
        <td>
        <button
              class="open-modal-btn btn-danger"
              onclick="deleteUser(${id})"
            >
              Delete
            </button>
        </td>
      </tr>
    `;
  });
}

// Add a new user

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");

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
      elForm.reset();
    }
  });
}

const elForm = document.querySelector(".modal__form");

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = elForm["email"].value.trim();
  const username = elForm["username"].value.trim();
  const password = elForm["password"].value.trim();
  const phone = elForm["phone"].value.trim();

  const newUser = {
    email: email,
    username: username,
    password: password,
    phone: phone,
  };

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));

  Toastify({
    text: "The new user added succesfully",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #17b000, #77c93d)",
    },
  }).showToast();

  elForm.reset();
});

// Delete

function deleteUser(id) {
  if (window.confirm("Are you sure you want to delete this user ?")) {
    fetch(`https://fakestoreapi.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    Toastify({
      text: "User deleted succesfully",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #17b000, #77c93d)",
      },
    }).showToast();
  } else {
    Toastify({
      text: "Product deletion cancelled",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #b02000, #cd2d17)",
      },
    }).showToast();
  }
}
