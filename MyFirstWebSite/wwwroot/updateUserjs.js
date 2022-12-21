const getFromStorage = () => {
    const userObjectAsJson = sessionStorage.getItem('user');
    return JSON.parse(userObjectAsJson);

}
const paper = () => {
    const oldUser = getFromStorage();
    const hellowUserDiv = document.getElementById("hellowUser");
    hellowUserDiv.innerText = `hellow ${oldUser.firstName} ${oldUser.lastName}, login seccsess`
    
    const userNameUpdate = document.getElementById("userNameUpdate");
    userNameUpdate.defaultValue = oldUser.userName;
    const passwordUpdate = document.getElementById("passwordUpdate");
    passwordUpdate.defaultValue = oldUser.password;
    const firstNameUpdate = document.getElementById("firstNameUpdate");
    firstNameUpdate.defaultValue = oldUser.firstName;
    const lastNameUpdate = document.getElementById("lastNameUpdate");
    lastNameUpdate.defaultValue = oldUser.lastName;
}
paper();
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
    const response = await fetch(`https://localhost:44380/api/user/${userId}`, {
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