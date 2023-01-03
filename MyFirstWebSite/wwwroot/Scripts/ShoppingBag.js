window.addEventListener('load', async (event) => {
    drawCart();
});
const drawCart = () => {
    document.getElementById("tbodyItems").innerHTML = "";

    const myCart = getItemFromSessionStorage("myCart");
    const countProducts = sumProducts(myCart);
    updateElementIdInnerText("itemCount", countProducts);
    const priceProduct = myCart.map(drawProduct);
    const totalAmount = totalAmountPurchase(priceProduct);
    updateElementIdInnerText("totalAmount", totalAmount);

}
const drawProduct = (productQuentity, i) => {
    temp = document.getElementById("temp-row");
    var clonProducts = temp.content.cloneNode(true);

    const product = productQuentity.productType;
    clonProducts.querySelector(".image").style.backgroundImage = `url(../Images/toys/${product.imgUrl})`;
    console.log(product.name);
    clonProducts.querySelector(".itemName").innerText = product.name;
    clonProducts.querySelector(".price").innerText = "₪" + product.price;
    clonProducts.querySelector(".productCount").innerText = productQuentity.quentity;

    clonProducts.querySelector(".showText").addEventListener('click', () => { removeProductFromCart(i) });
    document.getElementById("tbodyItems").appendChild(clonProducts);

    return (product.price * productQuentity.quentity);
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
        counter += product.quentity;
    });
    return counter;
}
const updateElementIdInnerText = (elementId, value) => {
    document.getElementById(elementId).innerText = value;
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
        "productId": product.productType.productId,
        "Quantity": product.quentity
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
    const userId = 4;//user.userId
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
    saveItemToSessionStorage("myCart", []);
    window.location.href = "Products.html";
}