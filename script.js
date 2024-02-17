let itemBox = document.querySelectorAll(".item_box"); // блок каждого товара
let cartCont = document.getElementById("cart_content"); // блок вывода данных корзины

// Записываем данные в LocalStorage
function setCartData(o) {
  localStorage.setItem("cart", JSON.stringify(o));
}
// Получаем данные из LocalStorage
function getCartData() {
  return JSON.parse(localStorage.getItem("cart"));
}

function addToCart(e) {
  //console.log("!!!");
  let button = e.target;
  button.disabled = true;
  let cartData = getCartData() || {};
  let parentBox = button.parentNode;
  let itemId = button.getAttribute("data-id");
  let itemTitle = parentBox.querySelector(".item_title").innerHTML; // название товара
  let itemPrice = parentBox.querySelector(".item_price").innerHTML; // стоимость товара
  console.log(cartData);
  cartData[itemId] = [itemTitle, itemPrice, 1];
  console.log(cartData);
}

for (let i = 0; i < itemBox.length; i++) {
  itemBox[i].querySelector(".add_item").addEventListener("click", addToCart);
}
