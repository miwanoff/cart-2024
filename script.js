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
}

for (let i = 0; i < itemBox.length; i++) {
   itemBox[i].querySelector(".add_item").addEventListener("click", addToCart);
}

