
const data = [
  {
    "id": 1,
    "title": "product one",
    "price": 1000,
    "desc": "This is product one"
  },
  {
    "id": 2,
    "title": "product two",
    "price": 2000,
    "desc": "This is product two"
  },
  {
    "id": 3,
    "title": "product three",
    "price": 3000,
    "desc": "This is product three"
  },
  {
    "id": 4,
    "title": "product four",
    "price": 4000,
    "desc": "This is product four"
  }
];

const productSec = document.querySelector('#productSec');

productDisplay();

function productDisplay () {
  const product = data.map( product => {
    return `
    <div class="card" id="card">
    <h3 class="card-title">${product.title}</h3>
    <div class="card-body">
      <div class="price">${product.price}</div>
      <div class="desc">
        ${product.desc}
      </div>
    </div>
    <button id="addToCartBtn" value="${product.id}">Add to cart</button>
  </div>
    `
  });
  // 消除map產生的空格
  const productList = product.join(' ');
  productSec.innerHTML = productList;
};

// 購物車 ====================================================

const addToCartBtn = document.querySelector('.addToCartBtn');

const cartSec = document.querySelector('#cartSec');
const cart = [];

document.addEventListener('DOMContentLoaded',()=>{
  cartDisplay();
  localStorage.getItem('cart',JSON.stringify(cart));
});

// 對JS動態生成物件增加事件的方法：
document.addEventListener('click',(e)=>{
  if(e.target.id == 'addToCartBtn'){
    data.forEach((product, index)=>{
      if( (index+1) == e.target.value){
        localStorage.getItem('cart',JSON.stringify(cart));
        cart.push(product);
        localStorage.setItem('cart',JSON.stringify(cart));
        cartDisplay();
      };
    });
  }
});

// else if(e.target.id == 'delItemBtn'){
//   data.forEach((product)=>{
//     if( product.id == e.target.value){
//       cart.slice(product);
//       console.log(cart);
//       localStorage.setItem('cart',JSON.stringify(cart));
//       cartDisplay();
//     }
//   });
// }

 function cartDisplay() {
  // 判斷 localStorage 中是否已有商品存在
  if(localStorage.getItem('cart')){
    localStorage.getItem('cart',JSON.stringify(cart));
    const itemFromLocal = JSON.parse(localStorage.getItem('cart'));
    const cartList = itemFromLocal.map( product => {
      return `
      <div class="card" id="card">
      <h3 class="card-title">${product.title}</h3>
      <div class="card-body">
        <div class="price">${product.price}</div>
        <div class="desc">
          ${product.desc}
        </div>
      </div>
      </div>
      `
    });
    const delItemBtn = document.createElement('button');
    // delItemBtn.setAttribute("", ID)    

    cartSec.innerHTML = cartList.join(' ');
  } else {
    const emptyCart = `
    <h2>No Product in cart yet</h2>
    `
    cartSec.innerHTML = emptyCart;
  };
};
