window.addEventListener('load', async (event) => {
    drawCart();
});
const drawCart = () => {
    document.getElementById("tbodyItems").innerHTML = "";

    const myCart = getItemFromSessionStorage("myCart");
    updateItemsCount(myCart.length);
    const priceProduct = myCart.map(drawProduct);
    let totalPrice = 0;
    priceProduct.forEach(price => {
        totalPrice += price;
    });
    updateTotalPrice(totalPrice);

}
const drawProduct = (product, i) => {
    temp = document.getElementById("temp-row");
    var clonProducts = temp.content.cloneNode(true);

    clonProducts.querySelector(".image").style.backgroundImage = `url(../Images/toys/${product.imgUrl})`;
    clonProducts.querySelector(".itemName").innerHtml = product.name;
    clonProducts.querySelector(".price").innerText = "₪" + product.price;
    clonProducts.querySelector(".showText").addEventListener('click', () => { removeProductFromCart(i) });
    document.getElementById("tbodyItems").appendChild(clonProducts);
    return product.price;
}
const updateItemsCount = (itemCount) => {
    document.getElementById("itemCount").innerText = itemCount;
}
const updateTotalPrice = (totalPrice) => {
    document.getElementById("totalAmount").innerText = totalPrice;
}
const getTotalPrice = () => {
    return document.getElementById("totalAmount").innerText;
}
const removeProductFromCart = (i) => {
    const myCart = getItemFromSessionStorage("myCart")
    myCart.splice(i, 1);
    saveItemToSessionStorage("myCart", myCart);
    drawCart();
}
const saveItemToSessionStorage = (value, myCart) => {
    sessionStorage.setItem(value, JSON.stringify(myCart));
}
const getItemFromSessionStorage = (value) => {
    const item = sessionStorage.getItem(value);
    return JSON.parse(item);
}
const createOrderItemObject = (product) => {
    const orderItem = {
        "productId": product.productId,
        "Quantity": 1
    }
    return orderItem;
}
const createOrderObject = (userId, price, orderItems) => {
    const order = {
        "date": new Date(),
        "price": price,
        "userId": userId,
        "orderItems": orderItems
    }
    return order;
}
const placeOrder = async () => {
    //const userId = getItemFromSessionStorage("user").userId;
    //const user = getItemFromSessionStorage("user");
    const userId = 4 ;//user.userId
    const myCart = getItemFromSessionStorage("myCart");
    const orderItems = myCart.map(createOrderItemObject);
    const totalPrice = getTotalPrice();
    const order = createOrderObject(userId, totalPrice, orderItems);

    const response = await fetch("api/order", {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify(order)

    });
    if (!response.ok) {
        throw new Error(`the connect failed ${response.status}, try again`);
    }
    if (response.status == 204) {
        console.log("order doeswnt craete");
        return;
    }
    const newOrder = response.json();
    alert("הזמנתך נקלטה בהצלחה");
    saveItemToSessionStorage("myCart",[]);
    window.location.href = "Products.html";
}