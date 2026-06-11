// username - mor_2314 | password - 83r5^_

const API = `https://fakestoreapi.com/products`;
const tBody = document.querySelector("tbody");
let allProducts = [];

const getProducts = (url) => {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      allProducts = data;
      showProducts(allProducts);
    })
    .catch((error) => {
      console.error(error);
      Toastify({
        text: "Invalid API URL",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #b00000, #c93d3d)",
        },
      }).showToast();
    });
};

getProducts(API);

function showProducts(data) {
  tBody.innerHTML = "";

  data.forEach((element) => {
    const { id, image, title, price, category, description } = element;

    tBody.innerHTML += `
    <tr class="table-row">
      <td>${element.id}</td>
      <td><img src="${element.image}" alt="${element.title}" width="50" /></td>
      <td class="t-title">${element.title.slice(0, 20)}...</td>
      <td class="t-price">$${element.price.toFixed(2)}</td>
      <td>${element.category}</td>
      <td>${element.description.slice(0, 50)}...</td>
      <td>
        <button class="btn btn-primary" onclick="viewModal(${id})">View</button>
        <button class="btn btn-primary" onclick="editModal(${id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteProduct(${id})">Delete</button>
      </td>
    </tr>
    `;
  });
}

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
    }
  });
}

const elForm = document.querySelector(".form");

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const image = elForm["image"].value.trim();
  const title = elForm["title"].value.trim();
  const price = elForm["price"].value.trim();
  const category = elForm["category"].value.trim();
  const description = elForm["description"].value.trim();

  const newProduct = {
    image: image,
    title: title,
    price: price,
    category: category,
    description: description,
  };

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));

  Toastify({
    text: "Product added succesfully",
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

function deleteProduct(id) {
  if (window.confirm("Are you sure you want to delete this product ?")) {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    Toastify({
      text: "Product deleted succesfully",
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

// Edit

const elEditModal = document.getElementById("editModal");
const editForm = document.querySelector(".edit-form");
const closeEditModal = document.getElementById("closeEditModal");
const closeEditModalBtn = document.getElementById("closeEditModalBtn");
const updateBtn = document.querySelector(".update");

const elViewModal = document.getElementById("viewModal");
const viewImage = document.querySelector(".view-card__image");
const viewTitle = document.querySelector(".view-card__title");
const viewPrice = document.querySelector(".view-card__price");
const viewCategory = document.querySelector(".view-card__category");
const viewDescription = document.querySelector(".view-card__description");
const closeViewModal = document.getElementById("closeViewModal");
const closeViewModalBtn = document.getElementById("closeViewModalBtn");

const hideEditModal = () => {
  elEditModal.classList.remove("show");
  document.body.style.overflow = "";
};

const hideViewModal = () => {
  elViewModal.classList.remove("show");
  document.body.style.overflow = "";
};

if (closeEditModal) {
  closeEditModal.addEventListener("click", hideEditModal);
}

if (closeEditModalBtn) {
  closeEditModalBtn.addEventListener("click", hideEditModal);
}

if (elEditModal) {
  elEditModal.addEventListener("click", (event) => {
    if (event.target === elEditModal) {
      hideEditModal();
    }
  });
}

if (closeViewModal) {
  closeViewModal.addEventListener("click", hideViewModal);
}

if (closeViewModalBtn) {
  closeViewModalBtn.addEventListener("click", hideViewModal);
}

if (elViewModal) {
  elViewModal.addEventListener("click", (event) => {
    if (event.target === elViewModal) {
      hideViewModal();
    }
  });
}

function editModal(id) {
  if (elEditModal) {
    elEditModal.classList.add("show");
  }

  document.body.style.overflow = "hidden";

  const editForm = document.querySelector(".edit-form");

  let imageValue = editForm["image"];
  let titleValue = editForm["title"];
  let priceValue = editForm["price"];
  let categoryValue = editForm["category"];
  let descriptionValue = editForm["description"];

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const { id, title, category, description, price, image } = data;

      imageValue.setAttribute("value", image);
      priceValue.setAttribute("value", price);
      titleValue.setAttribute("value", title);
      categoryValue.setAttribute("value", category);
      descriptionValue.setAttribute("value", description);

      console.log(data);
    });

  const updatePro = {
    image: imageValue.value,
    title: titleValue.value,
    category: categoryValue.value,
    description: descriptionValue.value,
    price: priceValue.value,
  };

  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePro),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Toastify({
          text: "Updated succesfully",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to right, #17b000, #77c93d)",
          },
        }).showToast();

        hideEditModal();
      });
  });
}

// View

function viewModal(id) {
  if (elViewModal) {
    elViewModal.classList.add("show");
  }

  document.body.style.overflow = "hidden";

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const { title, category, description, price, image } = data;

      if (viewImage) {
        viewImage.src = image;
        viewImage.alt = title;
      }
      if (viewTitle) viewTitle.textContent = title;
      if (viewPrice) viewPrice.textContent = `Price: $${price.toFixed(2)}`;
      if (viewCategory) viewCategory.textContent = `Category: ${category}`;
      if (viewDescription) viewDescription.textContent = description;
    });
}

const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter) {
  categoryFilter.addEventListener("change", (e) => {
    const selectedCategory = e.target.value;

    if (selectedCategory === "all") {
      showProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) => {
        return (
          product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      });

      showProducts(filtered);
    }
  });
}
