const elForm = document.querySelector(".form");
const API = `https://fakestoreapi.com/auth/login`;

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = elForm["username"].value.trim();
  const password = elForm["password"].value.trim();

  if (!username || !password) {
    Toastify({
      text: "Iltimos barcha maydonlarni toldiring",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #b00000, #c93d3d)",
      },
    }).showToast();

    return;
  }

  const userData = {
    username: username,
    password: password,
  };

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Incorrect username or password. Please try again");
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        Toastify({
          text: "Login successful!",
          duration: 2000,
          close: true,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to right, #0fb000, #4dc93d)",
          },
        }).showToast();

        localStorage.setItem("userToken", data.token);

        elForm.reset();

        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      }
    })
    .catch((error) => {
      console.error("Xatolik:", error);

      Toastify({
        text: "Notogri username yoki password. Iltimos qaytadan urinib ko'ring",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #b00000, #c93d3d)",
        },
      }).showToast();
    });
});

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("modal");
const modalForm = document.getElementById("modalForm");

openModal.addEventListener("click", () => {
  modal.classList.add("show");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

modalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = modalForm["username"].value.trim();
  const password = modalForm["password"].value.trim();
  if (!username || !password) {
    Toastify({
      text: "Iltimos barcha maydonlarni toldiring",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #b00000, #c93d3d)",
      },
    }).showToast();
    return;
  }
  // Можно здесь вставить ту же логику входа или просто закрыть окно
  modal.classList.remove("show");
  Toastify({
    text: "Форма отправлена",
    duration: 2000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #0fb000, #4dc93d)",
    },
  }).showToast();
});
