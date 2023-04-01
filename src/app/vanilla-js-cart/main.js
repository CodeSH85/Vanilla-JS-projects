import item_data from "./data.js";

document.addEventListener('DOMContentLoaded', () => {
  productDisplay();
  cartDisplay();
  if (localStorage.getItem('cart')) {
    const itemFromLocal = JSON.parse(localStorage.getItem('cart'));
    itemFromLocal.forEach(item => {
      cart.push(item);
    })
  }
});

const productSec = document.querySelector('#productSec');
function productDisplay () {
  const product = item_data.map( product => {
    return `
    <div class="card" id="card">
      <h3 class="card-title">${product.title}</h3>
      <div class="card-body">
        <div class="price">${product.price}</div>
        <div class="desc">
          ${product.desc}
        </div>
      </div>
      <button class="addToCartBtn" id="addToCartBtn" value="${product.id}">
        Add to cart
      </button>
    </div>
    `
  });
  const productList = product.join(' ');
  productSec.innerHTML = productList;
};

const cartSection = document.querySelector('#cartSec');
const cart = [];

// 對JS動態生成物件增加事件的方法：
document.addEventListener('click', (e) => {
  if (e.target.id === 'addToCartBtn') {
    console.log(e.target);
    item_data.forEach((product, index) => {
      if (item_data[index].id == e.target.value) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        cartDisplay();
      };
    });
  }
});

function cartDisplay() {
  // 判斷 localStorage 中是否已有商品存在
  if (localStorage.getItem('cart')) {
    const itemFromLocal = JSON.parse(localStorage.getItem('cart'));
    const cartList = itemFromLocal.map( product => {
      return `
      <div class="card" id="card">
        <h3 class="card-title">${product.title}</h3>
        <div class="card-body">
          <button class="remove-btn">
            remove
          </button>
          <div class="price">${product.price}</div>
          <div class="desc">
            ${product.desc}
          </div>
        </div>
      </div>
      `
    });
    const delItemBtn = document.createElement('button');

    cartSection.innerHTML = cartList.join(' ');
  } else {
    const emptyCart = `
    <h2>No Product in cart yet</h2>
    `
    cartSection.innerHTML = emptyCart;
  };
};

const clearCartBtn = document.querySelector('#clearCart');
clearCartBtn.addEventListener('click', clearCart);
function clearCart(e) {
  localStorage.clear();
  cartDisplay();
}
