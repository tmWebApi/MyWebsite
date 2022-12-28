window.addEventListener('load', async (event) => {
    const dataProducts = await getAllProducts();
    const dataCategories = await getallCategories();
    drawCategories(dataCategories);
    drawProducts(dataProducts);

});
const getAllProducts = async () => {
    const response = await fetch("api/Product");
    if (!response.ok)
        throw new Error(`the connect failed ${response.status}, try again`);
    if (response.status == 204) {
        console.log("no products");
       // dataProducts = null;
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
const drawProducts = (products) => {
    document.getElementById("PoductList").innerHTML = "";
    console.log(products);
    if (products != null)
        products.map(drawProduct);
}
const drawProduct = (product) => {
    temp = document.getElementById("temp-card");
    var clonProducts = temp.content.cloneNode(true);

    clonProducts.querySelector("img").src = `..\\Images\\toys\\${product.imgUrl}`;
    clonProducts.querySelector("h1").innerText = product.name;
    clonProducts.querySelector(".price").innerText = "$" + product.price;
    clonProducts.querySelector(".description").innerText = product.description;
    clonProducts.querySelector("button").addEventListener("click", () => {
        addToCart(product)
    });

    document.getElementById("PoductList").appendChild(clonProducts);

}
const addToCart = (product) => {
    console.log(product);
}
const drawCategories = (categories) => {
    categories.map(drawCategory);
}

const drawCategory = (category) => {
    temp = document.getElementById("temp-category");
    var clonCategories = temp.content.cloneNode(true);
    clonCategories.querySelector("input").value = false;
    clonCategories.querySelector("input").id = category.categoryId;
    clonCategories.querySelector("input").addEventListener('change', () => { filterByCategory(category) });
    clonCategories.querySelector("label").for = category.categoryId;
    clonCategories.querySelector(".OptionName").innerText = category.name;

    document.getElementById("categoryList").appendChild(clonCategories);

}
/*const filterByCategory = async (category) => {
    console.log(category);
    const response = await fetch(`api/Product/?categoryId=${category.categoryId}`);
    if (!response.ok)
        throw new Error(`the connect failed ${response.status}, try again`);
    if (response.status == 204) {
        console.log("no products");
        return;
    }
    const dataProducts = await response.json();
    drawProducts(dataProducts);
}*/
const filterByCategory = async () => {
  


}