window.addEventListener('load', async () => {
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
const myAcount = () => {
    const user = getUserFromSessionStorage();
    if (user != null) {
        window.location.href = './UpdateUser.html'
    }
    else {
        window.location.href = './Shopping.html'

    }
}
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
const drawProducts = (products) => {
    document.getElementById("PoductList").innerHTML = "";
    updateCountProduct(products.length);
    if (products.length > 0) {
        initMinMaxPrice(10000, 0);
        const productsWithQuantity = products.map(createProductObjWithQuantity);
        productsWithQuantity.map(drawProduct);
    }
    else
        initMinMaxPrice(0, 0);

}
const changeQuantityProduct = (product, amount) => {
    const minQuantity = 0;
    const maxQuantity = 20;
    const quantityAfterChange = product.quantity + amount;
    if (minQuantity <= quantityAfterChange && quantityAfterChange <= maxQuantity) {
        product.quantity = quantityAfterChange;
        return true;
    }
    return false;
}
const updateQuantityProduct = (elementId, amount) => {
    const quantityProduct = (Number)(document.getElementById(elementId).innerText);
    document.getElementById(elementId).innerText = quantityProduct + amount;
}
const drawProduct = (productQuantity) => {
    temp = document.getElementById("temp-card");
    var clonProducts = temp.content.cloneNode(true);

    const product = productQuantity.productType;
    clonProducts.querySelector("img").src = `..\\Images\\toys\\${product.imgUrl}`;
    clonProducts.querySelector("h1").innerText = product.name;
    clonProducts.querySelector(".price").innerText = "₪" + product.price;
    clonProducts.querySelector(".description").innerText = product.description;
    clonProducts.querySelector("#quantityProduct").innerText = productQuantity.quantity;
    clonProducts.querySelector("#quantityProduct").id += product.productId;

    clonProducts.querySelector("#minus").addEventListener("click", () => {
        if (changeQuantityProduct(productQuantity, -1))
            updateQuantityProduct(`quantityProduct${product.productId}`, -1)
    });
    clonProducts.querySelector("#plus").addEventListener("click", () => {
        if (changeQuantityProduct(productQuantity, 1))
            updateQuantityProduct(`quantityProduct${product.productId}`, 1)
    });
    clonProducts.querySelector("button").addEventListener("click", () => {
        addToCart(productQuantity)
    });
    updateFilterMinMaxPrice(product.price);
    document.getElementById("PoductList").appendChild(clonProducts);
}
const updateCountProduct = (counter) => {
    document.getElementById("counter").innerText = counter;
}
const updateItemsCountText = (itemsCount) => {
    document.getElementById("ItemsCountText").innerText = itemsCount;
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
const createProductObjWithQuantity = (product) => {
    const productQuantity = {
        productType: product,
        quantity: 1
    }
    return productQuantity;
}
const sumProducts = (myCart) => {
    let counter = 0;
    myCart.forEach((product) => {
        counter += product.quantity;
    });
    return counter;
}
const addToCart = (product) => {
    const myCart = getCartFromSessionStorage();
    let foundSameProduct = false;
    if (product != null) {
        for (let i = 0; i < myCart.length; i++) {
            const tmpProduct = myCart[i];
            if (tmpProduct.productType.productId === product.productType.productId) {
                const productQuantity = product.quantity;
                if (productQuantity <= 0) {
                    myCart.splice(i, 1);
                }
                else {
                    myCart[i].quantity = productQuantity;

                }
                foundSameProduct = true;
            }
        }
        if (!foundSameProduct) {
            myCart.push(product);
        }
        saveCartToSessionStorage(myCart);
    }
    const counter = sumProducts(myCart);
    updateItemsCountText(counter)
}
// const addToCart = (product) => {
//     if (!product) {
//         return;
//     }

//     const myCart = getCartFromSessionStorage();
//     const existingProductIndex = myCart.findIndex(p => p.productType.productId === product.productType.productId);
//     if (existingProductIndex !== -1) {
//         // Update quantity if product is already in cart
//         if (product.quantity <= 0) {
//             myCart.splice(existingProductIndex, 1);
//         } else {
//             myCart[existingProductIndex].quantity = product.quantity;
//         }
//     } else {
//         // Add product to cart if not already in cart
//         myCart.push(product);
//     }

//     saveCartToSessionStorage(myCart);
//     updateItemsCountText(sumProducts(myCart));
// }

const saveCartToSessionStorage = (myCart) => {
    sessionStorage.setItem("myCart", JSON.stringify(myCart));
}
const getCartFromSessionStorage = () => {
    const myCart = sessionStorage.getItem("myCart");
    return JSON.parse(myCart);
}
const getUserFromSessionStorage = () => {
    const user = sessionStorage.getItem("user");
    return JSON.parse(user);
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