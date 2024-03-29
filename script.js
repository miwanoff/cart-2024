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

function count() {
  let count = 0;
  if (getCartData()) {
    const cartData = getCartData();
    for (const key in cartData) {
      if (Object.hasOwnProperty.call(cartData, key)) {
        // console.log(cartData[key][2]);
        count += cartData[key][2];
      }
    }
  }
  return count;
}

console.log(count());

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

function removeItem(minus) {
  let cartData = getCartData();
  if (cartData) {
    let item = minus.getAttribute("data-id");
    console.log(item);
    console.log(cartData[item]);
    cartData[item][2] = cartData[item][2] - 1;

    if (cartData[item][2] == 0) {
      delete cartData[item];
    }
    setCartData(cartData);
    let length = Object.getOwnPropertyNames(cartData);
    if (length == 0) {
      clearCart();
    }
    openCart();
  }
}

function openCart(e) {
  let cartData = getCartData();
  console.log(cartData);
  if (cartData !== null) {
    let cardTable = "";
    cardTable =
      '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th><th>Удалить товар</th></tr>';
    for (let item in cartData) {
      cardTable += "<tr>";
      for (let i = 0; i < cartData[item].length; i++) {
        cardTable += "<td>" + cartData[item][i] + "</td>";
      }
      cardTable += `<td><span class="minus" onclick="removeItem(this)" data-id="${item}">-</span></td>`;
      cardTable += "</tr>";
    }
    cardTable += `<tr><td>Итого:</td><td></td><td>${count()}</td><td></td></tr>`;
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
