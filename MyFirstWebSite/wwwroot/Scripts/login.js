window.addEventListener('load', async () => {
    console.log(document.referrer);
});
const saveInSessionStorage = (data) => {
    sessionStorage.setItem('user', JSON.stringify(data));
}
const createUserLogin = () => {
    const userName = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    return {
        "userName": userName,
        "password": password
    };
}
const login = async () => {
    const userLogin = createUserLogin();
    const response = await fetch(`api/user`, {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify(userLogin)
    });
    if (!response.ok)
        throw new Error(`the connect failed ${response.status}, try again`);

    const data = await response.json();
    saveInSessionStorage(data);
    GoToAppropriatePage();
}
const GoToAppropriatePage = () => {
    if (document.referrer.endsWith("Product.html"))
        window.location.href = "UpdateUser.html";
    else
        window.location.href = "ShoppingBag.html";

}





