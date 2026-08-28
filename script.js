document.addEventListener('DOMContentLoaded', () => {

  // Mobile Navigation
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Current Year
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // FAQ Toggle
  document.querySelectorAll('.faq-item button').forEach((button) => {

    button.addEventListener('click', () => {

      const answer = button.nextElementSibling;
      const expanded = button.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-item button').forEach((item) => {

        item.setAttribute('aria-expanded', 'false');

        const sibling = item.nextElementSibling;

        if (sibling) {
          sibling.classList.add('hidden');
        }

      });

      if (!expanded) {

        button.setAttribute('aria-expanded', 'true');

        if (answer) {
          answer.classList.remove('hidden');
        }

      }

    });

  });

  // Reservation Form
  const form = document.getElementById("reservationForm");

  if (form) {

    form.addEventListener("submit", function (e) {

      e.preventDefault();

      alert("Your reservation request has been submitted successfully!");

      form.reset();

    });

  }

});
 // Contact Form
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

      e.preventDefault();

      alert("Thank you! Your message has been sent successfully.");

      contactForm.reset();

    });

  }
  // Newsletter Form

const newsletter = document.getElementById("newsletterForm");

if(newsletter){

newsletter.addEventListener("submit",function(e){

e.preventDefault();

alert("Thank you for subscribing!");

newsletter.reset();

});

}
const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {

    reservationForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const message = document.getElementById("reservationMessage");

        message.style.display = "block";

        message.innerHTML =
        "Your table has been reserved successfully.<br>Thank you for choosing Taste Haven Restaurant.";

        reservationForm.reset();

    });

}
// Scroll To Top Button

const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 300){
            scrollBtn.style.display="block";
        }
        else{
            scrollBtn.style.display="none";
        }

    });


    scrollBtn.addEventListener("click",()=>{

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}
// Sticky Navbar

const header = document.querySelector(".site-header");

if(header){

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 100){
        header.classList.add("sticky");
    }
    else{
        header.classList.remove("sticky");
    }

});

}
/* =========================================
   GALLERY FILTER
========================================= */

const galleryFilters = document.querySelectorAll(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-item");

galleryFilters.forEach((button) => {

  button.addEventListener("click", () => {

    const filter = button.getAttribute("data-filter");

    // Remove active class from all buttons
    galleryFilters.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to clicked button
    button.classList.add("active");

    // Filter gallery items
    galleryItems.forEach((item) => {

      const category = item.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }

    });

  });

});
/* =========================================
   CATERING QUOTE FORM
========================================= */

const cateringForm = document.getElementById("cateringForm");

if (cateringForm) {

  cateringForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const cateringMessage =
      document.getElementById("cateringMessage");

    if (cateringMessage) {

      cateringMessage.style.display = "block";

      cateringMessage.innerHTML =
        "Thank you! Your catering quote request has been submitted successfully. We will contact you soon.";

    } else {

      alert(
        "Thank you! Your catering quote request has been submitted successfully."
      );

    }

    cateringForm.reset();

  });

}
/* =========================================
   ORDER ONLINE FUNCTIONALITY
========================================= */

const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutSection = document.getElementById("checkoutSection");
const checkoutForm = document.getElementById("checkoutForm");
const orderConfirmation = document.getElementById("orderConfirmation");
const orderNumber = document.getElementById("orderNumber");

let cart = [];


/* ADD TO CART */

addToCartButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {

      existingItem.quantity++;

    } else {

      cart.push({
        name: name,
        price: price,
        quantity: 1
      });

    }

    updateCart();

  });

});


/* UPDATE CART */

function updateCart() {

  if (!cartItems || !cartCount || !cartTotal) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Your cart is empty. Add some delicious items to get started.
      </p>
    `;

    cartCount.textContent = "0";
    cartTotal.textContent = "$0.00";

    return;
  }

  let total = 0;
  let totalItems = 0;

  cart.forEach((item, index) => {

    const itemTotal = item.price * item.quantity;

    total += itemTotal;
    totalItems += item.quantity;

    cartItems.innerHTML += `

      <div class="cart-item">

        <div>

          <strong>${item.name}</strong>

          <p>
            $${item.price.toFixed(2)} × ${item.quantity}
          </p>

        </div>

        <div>

          <strong>
            $${itemTotal.toFixed(2)}
          </strong>

          <button
            type="button"
            class="remove-item"
            data-index="${index}"
          >
            Remove
          </button>

        </div>

      </div>

    `;

  });

  cartCount.textContent = totalItems;

  cartTotal.textContent = "$" + total.toFixed(2);


  /* REMOVE ITEM */

  const removeButtons = document.querySelectorAll(".remove-item");

  removeButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const index = button.dataset.index;

      cart.splice(index, 1);

      updateCart();

    });

  });

}


/* PROCEED TO CHECKOUT */

if (checkoutBtn) {

  checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

      alert("Please add at least one item to your cart.");

      return;

    }

    if (checkoutSection) {

      checkoutSection.style.display = "block";

      checkoutSection.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

}


/* CONFIRM ORDER */

if (checkoutForm) {

  checkoutForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (cart.length === 0) {

      alert("Your cart is empty.");

      return;

    }

    const orderType = document.getElementById("orderType");

    if (!orderType || orderType.value === "") {

      alert("Please select Delivery or Pickup.");

      return;

    }


    /* GENERATE ORDER NUMBER */

    const generatedOrderNumber =
      "TH-" + Math.floor(100000 + Math.random() * 900000);


    if (orderNumber) {

      orderNumber.textContent = generatedOrderNumber;

    }


    /* HIDE FORM */

    checkoutForm.style.display = "none";


    /* SHOW CONFIRMATION */

    if (orderConfirmation) {

      orderConfirmation.style.display = "block";

      orderConfirmation.scrollIntoView({
        behavior: "smooth"
      });

    }


    /* EMPTY CART */

    cart = [];

    updateCart();

  });

}