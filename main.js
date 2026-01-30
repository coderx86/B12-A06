// DOM Elements selector helper
const el = {
  categories: document.getElementById("category"),
  cards: document.getElementById("cards"),
  cartItems: document.getElementById("cart-items-container"),
  cartFooter: document.getElementById("cart-footer"),
  cartTotal: document.getElementById("cart-total-value"),
  modalContainer: document.getElementById("modal_container"),
  modalBox: document.getElementById("modal"),
  allBtn: document.getElementById("all"),
};

let plantsData = [];
let cartTotal = 0;

// Reusable Fetch
const fetchData = async (endpoint) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/${endpoint}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Application Initialization
const init = async () => {
  // Styling setup
  el.categories.classList.add("flex", "flex-col");
  el.cards.classList.add("grid", "grid-cols-1", "md:grid-cols-3", "gap-4");

  // Load Categories
  const catData = await fetchData("categories");
  if (catData?.categories) {
    catData.categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "cat w-full text-left p-2 md:p-3 rounded text-gray-800 font-normal transition-colors hover:bg-gray-100 text-base";
      btn.innerText = cat.category_name;
      btn.onclick = () => filterByCategory(btn, cat.category_name);
      el.categories.appendChild(btn);
    });
  }

  // Load Plants
  el.cards.innerHTML = `<div class="col-span-1 md:col-span-3 flex justify-center items-center py-20"><span class="loading loading-spinner loading-lg text-green-700"></span></div>`;



  const pData = await fetchData("plants");
  if (pData?.plants) {
    plantsData = pData.plants;
    renderPlants(plantsData);
  }
};

// Render Functions
const renderPlants = (plants) => {
  el.cards.innerHTML = plants.map((plant, index) => `
    <div class="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow card flex flex-col" data-category="${plant.category}">
      <img onclick="openModal(${index})" src="${plant.image}" class="w-full h-[200px] object-cover bg-gray-200 rounded-lg mb-3 cursor-pointer" alt="${plant.name}">
      <h3 onclick="openModal(${index})" class="font-semibold text-lg text-gray-800 mb-2 cursor-pointer">${plant.name}</h3>
      <p class="text-sm text-gray-800 opacity-80 mb-3 line-clamp-2 leading-snug flex-grow">${plant.description}</p>
      <div class="flex justify-between items-center mb-4">
        <div class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">${plant.category}</div>
        <p class="font-semibold text-gray-800">$${plant.price}</p>
      </div>
      <button onclick="addToCart(${index})" class="btn w-full bg-green-700 text-white rounded-full font-semibold hover:bg-green-800 transition-colors border-none min-h-[48px] h-auto">Add to Cart</button>
    </div>
  `).join("");
};

// Filter Logic
const filterByCategory = async (btn, category) => {
  // Reset Styles
  document.querySelectorAll(".cat").forEach((b) => (b.className = "cat w-full text-left p-2 md:p-3 rounded text-gray-800 font-normal transition-colors hover:bg-gray-100 text-base"));
  el.allBtn.className = "w-full text-left p-2 md:p-3 rounded text-gray-800 font-normal transition-colors hover:bg-gray-100 text-base";

  // Apply Active Style
  if (btn) btn.className = "cat w-full text-left p-2 md:p-3 rounded bg-green-700 text-white font-medium text-base";
  else el.allBtn.className = "w-full text-left p-2 md:p-3 rounded bg-green-700 text-white font-medium mb-2 transition-colors hover:bg-gray-100 dark:hover:text-gray-800";

  // Show Loader
  el.cards.innerHTML = `<div class="col-span-1 md:col-span-3 flex justify-center items-center py-20"><span class="loading loading-spinner loading-lg text-green-700"></span></div>`;

  // Fetch and Filter
  const data = await fetchData("plants");
  if (data?.plants) {
    plantsData = category ? data.plants.filter((plant) => plant.category === category) : data.plants;
    renderPlants(plantsData);
  }
};

el.allBtn.onclick = () => filterByCategory(null, null);

// Modal
window.openModal = (index) => {
  const plant = plantsData[index];
  el.modalBox.innerHTML = `
    <div class="flex flex-col gap-4 p-6">
      <img src="${plant.image}" class="w-full h-[250px] object-cover rounded-xl">
      <h3 class="text-2xl font-bold text-gray-800">${plant.name}</h3>
      <span class="badge badge-ghost">Category: ${plant.category}</span>
      <p class="py-4 text-gray-600">${plant.description}</p>
      <p class="text-xl font-bold text-green-700">Price: $${plant.price}</p>
      <div class="modal-action">
        <form method="dialog"><button class="btn">Close</button></form>
      </div>
    </div>
  `;
  el.modalContainer.showModal();
};

// Cart
window.addToCart = (index) => {
  const plant = plantsData[index];
  const item = document.createElement("div");
  item.className = "flex justify-between items-center p-4 bg-green-50 rounded-xl w-full relative mb-3";
  item.innerHTML = `
    <div class="flex flex-col">
      <p class="font-bold text-gray-800 text-base">${plant.name}</p>
      <p class="text-gray-400 text-sm mt-1">৳${plant.price} × 1</p>
    </div>
    <button class="btn btn-ghost btn-xs text-gray-400 hover:text-error font-bold text-lg">x</button>
  `;

  item.querySelector("button").onclick = () => {
    item.remove();
    updateCartTotal(-plant.price);
  };

  el.cartItems.appendChild(item);
  updateCartTotal(plant.price);
};

const updateCartTotal = (amount) => {
  cartTotal += amount;
  el.cartTotal.innerText = `৳${cartTotal}`;
  el.cartFooter.classList.toggle("hidden", el.cartItems.children.length === 0);
};

// Start
init();
