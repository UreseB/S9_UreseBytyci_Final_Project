document.addEventListener("DOMContentLoaded", function () {
  const cartItem = JSON.parse(localStorage.getItem("cart"));

  if (cartItem) {
    document.getElementById("productName").textContent = cartItem.name;
    document.getElementById("price").textContent = `${cartItem.price}€`;
    document.getElementById("total").textContent = `${cartItem.price}€`;
  } else {
    displayMessage("Your cart is empty!", "error");
    setTimeout(() => {
      window.location.href = "product-page.html";
    }, 2000);
  }
});

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  try {
    const name = document.getElementById("customerName").value;
    const email = document.getElementById("email").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const promoCode = document.getElementById("promoCode").value;

    validateName(name);
    validateEmail(email);
    validateCardNumber(cardNumber);
    validatePromoCode(promoCode);

    const productPrice = parseFloat(document.getElementById("price").textContent.replace("€", ""));
    let total = productPrice;

    if (promoCode) {
      const discount = promoCode.match(/DISCOUNT(\d+)/i);
      if (discount) {
        const discountValue = Math.min(parseFloat(discount[1]), total);
        total -= discountValue;
        displayMessage(`Coupon applied! New total: ${total.toFixed(2)}€`, "success");
      }
    }

    displayMessage(`The purchase was made successfully! Total: ${total.toFixed(2)}€`, "success");

    localStorage.removeItem("cart");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } catch (error) {
    displayMessage(`Gabim: ${error}`, "error");
  }
});

function displayMessage(message, type) {
  const messageBox = document.createElement("div");
  messageBox.textContent = message;
  messageBox.style.position = "fixed";
  messageBox.style.bottom = "20px";
  messageBox.style.left = "50%";
  messageBox.style.transform = "translateX(-50%)";
  messageBox.style.padding = "10px 20px";
  messageBox.style.borderRadius = "5px";
  messageBox.style.color = "#fff";
  messageBox.style.backgroundColor = type === "success" ? "#4CAF50" : "#f44336";
  messageBox.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  messageBox.style.zIndex = "1000";
  document.body.appendChild(messageBox);

  setTimeout(() => {
    document.body.removeChild(messageBox);
  }, 3000);
}

function validateName(name) {
  if (!name.match(/^[a-zA-Z\s]+$/)) {
    throw "The name only contain letters and spaces.";
  }
}

function validateEmail(email) {
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw "Email format is not valid.";
  }
}

function validateCardNumber(cardNumber) {
  if (!/^\d{16}$/.test(cardNumber)) {
    throw "Card number must have 16 digits.";
  }
}

function validatePromoCode(promoCode) {
  const validCodes = Array.from(document.querySelectorAll("#promoCodes option")).map(
    (option) => option.value
  );

  if (promoCode && !validCodes.includes(promoCode)) {
    throw "The coupon is not valid.Please select an option from the list.";
  }
}
