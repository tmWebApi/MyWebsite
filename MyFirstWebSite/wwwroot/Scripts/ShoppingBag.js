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
    clonProducts.querySelector(".showText").addEventListener('click', () => { removeFromCart(i) });
    document.getElementById("tbodyItems").appendChild(clonProducts);
    return product.price;
}
const updateItemsCount = (itemCount) => {
    document.getElementById("itemCount").innerText = itemCount;
}
const updateTotalPrice = (totalPrice) => {
    document.getElementById("totalAmount").innerText = totalPrice;
}
const getTotalPrice=()=>{
    
}
const removeFromCart = (i) => {
    const myCart = getItemFromSessionStorage("myCart")
    myCart.splice(i, 1);
    saveItemToSessionStorage("myCart", myCart);
    drawCart();
}
const saveItemToSessionStorage = (item, myCart) => {
    sessionStorage.setItem(item, JSON.stringify(myCart));
}
const getItemFromSessionStorage = (item) => {
    const myCart = sessionStorage.getItem(item);
    return JSON.parse(myCart);
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
    const myCart = getItemFromSessionStorage("myCart");
    const orderItems = myCart.map(createOrderItemObject);
    const order = createOrderObject(2, 890, orderItems);
    const orderString = JSON.stringify(order);

    console.log(orderString);
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
    console.log(newOrder);
    alert("הזמנתך נקלטה בהצלחה")

}