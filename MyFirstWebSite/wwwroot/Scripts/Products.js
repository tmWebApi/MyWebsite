﻿window.addEventListener('load', async () => {
    const dataProducts = await getAllProducts();
    const dataCategories = await getAllCategories();

    drawCategories(dataCategories);
    drawProducts(dataProducts);

    if (getCartFromSessionStorage() == null) {
        saveCartToSessionStorage([]);
    }
    else {
        addToCart(null);
    }

});
const getAllProducts = async () => {
    const response = await fetch("api/Product");
    if (!response.ok)
        throw new Error(`the connect failed ${response.status}, try again`);
    if (response.status == 204) {
        console.log("no products");
        drawProducts([]);
        return;
    }
    const dataProducts = await response.json();
    return dataProducts;
}
const getAllCategories = async () => {
    const response = await fetch("api/Category");
    if (!response.ok)
        throw new Error(`the connect failed ${response.status}, try again`);
    if (response.status == 204) {
        console.log("no Categories");
        return;
    }
    const dataCategories = await response.json();
    return dataCategories;
}
const drawProducts = (products) => {
    document.getElementById("PoductList").innerHTML = "";
    updateElementIdInnerText("counter", products.length);
    if (products.length > 0) {
        initMinMaxPrice(10000, 0);
        const productsWithQuentity = products.map(createProductObjWithQuentity);
        productsWithQuentity.map(drawProduct);
    }
    else
        initMinMaxPrice(0, 0);

}
const changeQuentityProduct = (product, amount) => {
    const minQuentity = 1;
    const maxQuentity = 20;
    const quentityAfterChange = product.quentity + amount;
    if (minQuentity <= quentityAfterChange && quentityAfterChange <= maxQuentity) {
        product.quentity = quentityAfterChange;
        return true;
    }
    return false;
}
const updateQuentity = (elementId, amount) => {    
    const quentityProduct = (Number)(document.getElementById(elementId).innerText);
    document.getElementById(elementId).innerText = quentityProduct + amount;
}
const drawProduct = (productQuentity) => {
    temp = document.getElementById("temp-card");
    var clonProducts = temp.content.cloneNode(true);

    const product = productQuentity.productType;
    clonProducts.querySelector("img").src = `..\\Images\\toys\\${product.imgUrl}`;
    clonProducts.querySelector("h1").innerText = product.name;
    clonProducts.querySelector(".price").innerText = "₪" + product.price;
    clonProducts.querySelector(".description").innerText = product.description;
    clonProducts.querySelector("#quentityProduct").innerText = productQuentity.quentity;
    clonProducts.querySelector("#quentityProduct").id += product.productId;

    clonProducts.querySelector("#minus").addEventListener("click", () => {
        if (changeQuentityProduct(productQuentity, -1))
            updateQuentity(`quentityProduct${product.productId}`, -1)
    });
    clonProducts.querySelector("#plus").addEventListener("click", () => {
        if (changeQuentityProduct(productQuentity, 1))
            updateQuentity(`quentityProduct${product.productId}`, 1)
    });
    clonProducts.querySelector("button").addEventListener("click", () => {
        addToCart(productQuentity)
    });
    updateFilterMinMaxPrice(product.price);
    document.getElementById("PoductList").appendChild(clonProducts);
}
const updateElementIdInnerText = (elementId, value) => {
    document.getElementById(elementId).innerText = value;
}
const initMinMaxPrice = (min, max) => {
    document.getElementById("maxPrice").placeholder = max;
    document.getElementById("minPrice").placeholder = min;
}
const getMaxPrice = () => {
    return document.getElementById("maxPrice").placeholder;
}
const getMinPrice = () => {
    return document.getElementById("minPrice").placeholder;
}
const updateFilterMinMaxPrice = (price) => {
    if (getMaxPrice() < price) {
        document.getElementById("maxPrice").placeholder = price;
    }
    else if (getMinPrice() > price) {
        document.getElementById("minPrice").placeholder = price;
    }
}
const createProductObjWithQuentity = (product) => {
    const productQuentity = {
        productType: product,
        quentity: 1
    }
    return productQuentity;
}
const sumProducts = (myCart) => {
    let counter = 0;
    myCart.forEach((product) => {
        counter += product.quentity;
    });
    return counter;
}
const addToCart = (product) => {
    const myCart = getCartFromSessionStorage();
    let foundSameProduct = false;
    if (product != null) {
        console.log(product.productType);
        for (let i = 0; i < myCart.length; i++) {
            const tmpProduct = myCart[i];
            if (tmpProduct.productType.productId === product.productType.productId) {
                myCart[i].quentity += 1;
                foundSameProduct = true;
            }

        }
        if (!foundSameProduct) {
            myCart.push(product);
        }
        saveCartToSessionStorage(myCart);
    }
    const counter = sumProducts(myCart);
    updateElementIdInnerText("ItemsCountText", counter)
}
const saveCartToSessionStorage = (myCart) => {
    sessionStorage.setItem("myCart", JSON.stringify(myCart));
}
const getCartFromSessionStorage = () => {
    const myCart = sessionStorage.getItem("myCart");
    return JSON.parse(myCart);
}
const drawCategories = (categories) => {
    const categoriesView = categories.map(drawCategory);
}
const drawCategory = (category) => {
    temp = document.getElementById("temp-category");
    var clonCategories = temp.content.cloneNode(true);
    clonCategories.querySelector("input").value = category.name;
    clonCategories.querySelector("input").id = category.categoryId;
    clonCategories.querySelector("input").addEventListener('change', (event) => { filterParams(event, category) });
    clonCategories.querySelector("label").for = category.categoryId;
    clonCategories.querySelector(".OptionName").innerText = category.name;

    document.getElementById("categoryList").appendChild(clonCategories);
}
const filterParams = async (event, category) => {
    const categoriesId = filterByCategories();
    const nameSearch = filterByValue("nameSearch");
    const minPrice = filterByValue("minPrice");
    const maxPrice = filterByValue("maxPrice");
    queryString(categoriesId, nameSearch, minPrice, maxPrice);
}
const filterByValue = (value) => {
    const valueSearch = document.getElementById(value).value;
    return valueSearch;
}
const filterByCategories = () => {
    const categories = document.getElementsByClassName("opt");
    let checkedCategory = [];
    for (i = 0; i < categories.length; i++) {
        if (categories[i].checked) {
            checkedCategory.push(categories[i].id);
        }

    }
    return checkedCategory;
}
const queryString = (categoriesId = null, name, minPrice, maxPrice) => {
    let queryString = "";
    name != "" ? queryString += `&name=${name}` : queryString += ``;
    minPrice != "" ? queryString += `&minPrice=${minPrice}` : queryString += ``;
    maxPrice != "" ? queryString += `&maxPrice=${maxPrice}` : queryString += ``;
    if (categoriesId != null) {
        categoriesId.forEach(categoryId => {
            queryString += `&categoryId=${categoryId}`;
        });
    }
    filterProducts(queryString);
}
const filterProducts = async (queryString) => {
    const response = await fetch(`api/Product/?${queryString}`);
    if (!response.ok)
        throw new Error(`the connect failed ${response.status}, try again`);
    if (response.status == 204) {
        console.log("no products");
        drawProducts([]);
        return;
    }
    const dataProducts = await response.json();
    drawProducts(dataProducts);
}