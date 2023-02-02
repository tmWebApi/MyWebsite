window.addEventListener("load",()=>{
    const user = getUserFromStorage();    
    const userNameUpdate = document.getElementById("Email");
    userNameUpdate.defaultValue = user.userName;
    const firstNameUpdate = document.getElementById("FirstName");
    firstNameUpdate.defaultValue = user.firstName;
    const lastNameUpdate = document.getElementById("LastName");
    lastNameUpdate.defaultValue = user.lastName;
});

const getUserFromStorage = () => {
    const userObjectAsJson = sessionStorage.getItem('user');
    return JSON.parse(userObjectAsJson);

}
const createUpdateUser =()=>{
    
}
const updateUser = async () => {
    const userNameUpdate = document.getElementById("userNameUpdate").value;
    const passwordUpdate = document.getElementById("passwordUpdate").value;;
    const firstNameUpdate = document.getElementById("firstNameUpdate").value;
    const lastNameUpdate = document.getElementById("lastNameUpdate").value;

    const userId = getFromStorage().userId;
    
    const newUser = {
        "userId": userId,
        "userName": userNameUpdate,
        "password": passwordUpdate,
        "firstName": firstNameUpdate,
        "lastName": lastNameUpdate
    };
    const response = await fetch(`api/user/${userId}`, {
        headers: { "Content-Type": "application/json" },
        method: 'PUT',
        body: JSON.stringify(newUser)
    });
    debugger;
    if (!response.ok)
        throw new Error(`the connect failed ${response.status}, try again`);
    if (response.status == 204) {
        alert("no data");
        return;
    }
  
    alert(`the details update`);
}