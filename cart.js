const cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

document.querySelectorAll('.orderForm').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const option = form.querySelector('input[type="radio"]:checked');

    cart.push({
      name: form.dataset.name,
      price: Number(form.dataset.price),
      qty: Number(form.querySelector('.qtyInput').value),
      option: option ? option.parentElement.textContent.trim() : ''
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    form.closest('[popover]').hidePopover();
  });
});

const list = document.getElementById('cartItems');
if (list) {
  let total = 0;
  cart.forEach((item, index) => {
    const sum = item.price * item.qty;
    total += sum;
    list.innerHTML += `
      <li>
        <span>${item.qty} × ${item.name} ${item.option} – ${sum.toFixed(2)} €</span>
        <button class="removeButton" onclick="removeItem(${index})" aria-label="Pašalinti">✕</button>
      </li>`;
  });
  document.getElementById('cartTotal').textContent = total.toFixed(2) + ' €';
}

function removeItem(index) {
  cart.splice(index, 1);   // remove 1 item at that position
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

function clearCart() {
  localStorage.removeItem('cart');
  location.reload();
}

function updateCartCount() {
  const countElement = document.getElementById('cartCount');
  if (countElement) {
    countElement.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  }
}