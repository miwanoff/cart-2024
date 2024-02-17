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
  //   cartData[itemId] = [itemTitle, itemPrice, 1];
  if (cartData.hasOwnProperty(itemId)) {
    // если такой товар уже в корзине, то добавляем +1 к его количеству
    cartData[itemId][2] += 1;
  } else {
    // если товара в корзине еще нет, то добавляем в объект
    cartData[itemId] = [itemTitle, itemPrice, 1];
  }
  //console.log(cartData);
  setCartData(cartData);
  button.disabled = false;
  cartCont.innerHTML = "Товар добавлен в корзину.";
  setTimeout(function () {
    cartCont.innerHTML = "Продолжить покупки...";
  }, 1000);
}

function openCart(e) {
    let cartData = getCartData();
    console.log(cartData);
    if (cartData !== null) {
        let cardTable = "";
        cardTable =
          '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th></tr>';
        for (let items in cartData) {
          cardTable += "<tr>";
          for (let i = 0; i < cartData[items].length; i++) {
            cardTable += "<td>" + cartData[items][i] + "</td>";
          }
          cardTable += "</tr>";
        }
        cardTable += "<table>";
        cartCont.innerHTML = cardTable;
      } else {
        // если в корзине пусто, то сигнализируем об этом
        cartCont.innerHTML = "В корзине пусто!";
      }
}

// Функция очистки корзины
function clearCart(e) {
  localStorage.removeItem("cart");
  cartCont.innerHTML = "Корзина очишена.";
}

for (let i = 0; i < itemBox.length; i++) {
  itemBox[i].querySelector(".add_item").addEventListener("click", addToCart);
}

document.getElementById("checkout").addEventListener("click", openCart);
document.getElementById("clear_cart").addEventListener("click", clearCart);
