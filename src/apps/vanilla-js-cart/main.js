let itemData;

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(json => {
    console.log(json);
    itemData = json.products;
    productDisplay();
    cartDisplay();
  });
  if (localStorage.getItem('cart')) {
    const itemFromLocal = JSON.parse(localStorage.getItem('cart'));
    itemFromLocal.forEach(item => {
      cart.push(item);
    })
  }
});

const productSec = document.querySelector('#productSec');
function productDisplay () {
  console.log(itemData);
  const product = itemData.map( product => {
    return `
    <div class="card" id="card" data-product-id=${product.id}>
      <div class="card-image-container">
        <img class="card-image" src="${product.images[0]}" alt="image">
      </div>
      <div class="card-body">
        <h3 class="card-title">${product.title}</h3>
        <div class="price">${product.price}$</div>
        <div class="card-desc">
          ${product.description}
        </div>
        <button class="add-to-cart-btn">
          Add to cart
        </button>
      </div>
    </div>
    `
  });
  const productList = product.join(' ');
  productSec.innerHTML = productList;
};

const cartSection = document.querySelector('#cartSec');
let cart = [];

// 對JS動態生成物件增加事件的方法：
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const product = itemData.find(({id}) => {
      return id == e.target.parentNode.parentNode.dataset.productId;
    });
    if (product) {
      console.log('test');
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      cartDisplay();
    }
  }
  if (e.target.classList.contains('remove-btn')) {
    const productId = e.target.parentNode.parentNode.dataset.productId;
    const itemIndex = cart.findIndex(item => item.id == productId);
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      cartDisplay();
    }
  }
});

function cartDisplay() {
  // 判斷 localStorage 中是否已有商品存在
  if (localStorage.getItem('cart')) {
    const itemFromLocal = JSON.parse(localStorage.getItem('cart'));
    const cartList = itemFromLocal.map( product => {
      return `
      <div class="card" id="card" data-product-id=${product.id}>
        <h3 class="card-title">${product.title}</h3>
        <div class="card-body">
          <div class="price">${product.price}$</div>
          <div class="desc">
            ${product.desc}
          </div>
          <button class="remove-btn">
          remove
          </button>
        </div>
      </div>
      `
    });
    cartSection.innerHTML = cartList.join(' ');
  } else {
    const emptyCart = document.createElement('h2');
    emptyCart.textContent = 'No Product in cart yet';
    cartSection.innerHTML = '';
    cartSection.appendChild(emptyCart);
  };
};

const clearCartBtn = document.querySelector('#clearCart');
clearCartBtn.addEventListener('click', clearCart);
function clearCart(e) {
  cart = [];
  localStorage.clear();
  cartDisplay();
}
