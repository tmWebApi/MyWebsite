window.addEventListener('load', async (event) => {
    drawCart();
});
const drawCart = () => {
    cleanTbodyItems();

    const myCart = getCartFromSessionStorage();
    const countProducts = sumProducts(myCart);
    const priceProduct = myCart.map(drawProduct);
    const totalAmount = totalAmountPurchase(priceProduct);

    updateAmountElement(totalAmount);
    updateItemElement(countProducts);
}
const drawProduct = (productQuantity, i) => {
    temp = document.getElementById("temp-row");
    var clonProducts = temp.content.cloneNode(true);

    const product = productQuantity.productType;
    const quantity = productQuantity.quantity;
    clonProducts.querySelector(".image").style.backgroundImage = `url(../Images/toys/${product.imgUrl})`;
    clonProducts.querySelector(".itemName").innerText = product.name;
    clonProducts.querySelector(".price").innerText = "₪" + product.price * quantity;
    clonProducts.querySelector(".productCount").innerText = quantity;

    clonProducts.querySelector(".showText").addEventListener('click', () => { removeProductFromCart(i) });
    document.getElementById("tbodyItems").appendChild(clonProducts);

    return (product.price * quantity);
}
const totalAmountPurchase = (priceProduct) => {
    let totalAmount = 0;
    priceProduct.forEach(price => {
        totalAmount += price;
    });
    return totalAmount;
}
const sumProducts = (myCart) => {
    let counter = 0;
    myCart.forEach((product) => {
        counter += product.quantity;
    });
    return counter;
}
const removeProductFromCart = (i) => {
    const myCart = getCartFromSessionStorage()
    myCart.splice(i, 1);
    saveCartToSessionStorage(myCart);
    drawCart();
}
const updateItemElement = (itemCount) => {
    document.getElementById("itemCount").innerText = itemCount;
}
const updateAmountElement = (totalAmount) => {
    document.getElementById("totalAmount").innerText = totalAmount;
}
const getTotalPrice = () => {
    return document.getElementById("totalAmount").innerText;
}
const cleanTbodyItems = () => {
    document.getElementById("tbodyItems").innerHTML = "";
}
const saveCartToSessionStorage = (myCart) => {
    sessionStorage.setItem("myCart", JSON.stringify(myCart));
}
const getCartFromSessionStorage = () => {
    const item = sessionStorage.getItem("myCart");
    return JSON.parse(item);
}
const getUserFromSessionStorage = () => {
    const user = sessionStorage.getItem("user");
    return JSON.parse(user);
}
const placeOrder = async () => {
    const userId = getUserFromSessionStorage("user").userId;
    const myCart = getCartFromSessionStorage();
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
    alert(`הזמנתך התקבלה בהצלחה`);
    saveCartToSessionStorage([]);
    window.location.href = "Products.html";
}
const createOrderItemObject = (product) => {
    const orderItem = {
        "productId": product.productType.productId,
        "Quantity": product.quantity
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