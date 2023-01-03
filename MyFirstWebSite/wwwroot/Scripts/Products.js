window.addEventListener('load', async () => {
    const dataProducts = await getAllProducts();
    const dataCategories = await getallCategories();

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
const getallCategories = async () => {
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
const updateElementIdInnerText = (elementId, value) => {
    document.getElementById(elementId).innerText = value;
}
const getFilterPrice = (elementId) => {
    return document.getElementById(elementId).placeholder;
}
const updateFilterMinMaxPrice = (price) => {
    if (getFilterPrice("maxPrice") < price) {
        document.getElementById("maxPrice").placeholder = price;
    }
    else if (getFilterPrice("minPrice") > price) {
        document.getElementById("minPrice").placeholder = price;
    }
}
const initMinMaxPrice = (min, max) => {
    document.getElementById("maxPrice").placeholder = max;
    document.getElementById("minPrice").placeholder = min;
}
const createProductObjWithQuentity = (product) => {
    const productQuentity = {
        productType: product,
        quentity: 1
    }
    return productQuentity;
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
const drawProduct = (productQuentity) => {
    temp = document.getElementById("temp-card");
    var clonProducts = temp.content.cloneNode(true);

    const product = productQuentity.productType;
    clonProducts.querySelector("img").src = `..\\Images\\toys\\${product.imgUrl}`;
    clonProducts.querySelector("h1").innerText = product.name;
    clonProducts.querySelector(".price").innerText = "₪" + product.price;
    clonProducts.querySelector(".description").innerText = product.description;
    clonProducts.querySelector("button").addEventListener("click", () => {
        addToCart(productQuentity)
    });
    updateFilterMinMaxPrice(product.price);
    document.getElementById("PoductList").appendChild(clonProducts);
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
    console.log(myCart);
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