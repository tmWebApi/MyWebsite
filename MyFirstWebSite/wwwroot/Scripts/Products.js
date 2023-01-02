window.addEventListener('load', async (event) => {
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
const updateCounterProducts = (numProducts) => {
    document.getElementById("counter").innerText = numProducts;
}
const updateNumProductsInCart = (numProductsInCart) => {
    document.getElementById("ItemsCountText").innerText = numProductsInCart;
}
const drawProducts = (products) => {
    document.getElementById("PoductList").innerHTML = "";
    updateCounterProducts(products.length);
    if (products.length > 0)
        products.map(drawProduct);
}
const drawProduct = (product) => {
    temp = document.getElementById("temp-card");
    var clonProducts = temp.content.cloneNode(true);

    clonProducts.querySelector("img").src = `..\\Images\\toys\\${product.imgUrl}`;
    clonProducts.querySelector("h1").innerText = product.name;
    clonProducts.querySelector(".price").innerText = "₪" + product.price;
    clonProducts.querySelector(".description").innerText = product.description;
    clonProducts.querySelector("button").addEventListener("click", () => {
        addToCart(product)
    });
    document.getElementById("PoductList").appendChild(clonProducts);
}
const addToCart = (product) => {
    const myCart = getCartFromSessionStorage()
    if (product != null) {
        myCart.push(product);
        saveCartToSessionStorage(myCart);
    }
    updateNumProductsInCart(myCart.length)
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
    console.log(valueSearch);
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
    console.log(checkedCategory);
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
    console.log(queryString);
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