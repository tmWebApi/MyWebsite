
const saveInSessionStorage = (data) => {
    sessionStorage.setItem('user', JSON.stringify(data));
}

const connect = async () => {
    const userName = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;

    const response = await fetch(`api/user?userName=${userName}&password=${password}`);
    if (!response.ok)
        throw new Error(`the connect failed ${response.status}, try again`);
    if (response.status == 204) {
        alert("please register");
        return;
    }

    const data = await response.json();
    saveInSessionStorage(data);
    window.location.href = "ShoppingBag.html";

}

let scorePassword = 0;
const createObjectUser = () => {
    const newUserName = document.getElementById("newUserName").value;
    const newUserPassword = document.getElementById("newUserPassword").value;
    const newUserFirstName = document.getElementById("newUserFirstName").value;
    const newUserLastName = document.getElementById("newUserLastName").value;
    const newUser = {
        "UserName": newUserName,
        "Password": newUserPassword,
        "FirstName": newUserFirstName,
        "LastName": newUserLastName
    };
    scorePassword = newUserPassword;
    return newUser;
}

const checkPassword = async () => {
    const password = document.getElementById('newUserPassword').value;
    console.log(password);
    const response = await fetch("api/password/validate", {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify(password)

    });

    if (!response.ok)
        throw new Error(`the connect failed ${response.status}, try again`);
    const data = await response.json();
    console.log(data);
    scorePassword = data;
    const scoreSpn = document.getElementById("score");
    scoreSpn.innerHTML = `your score: ${scorePassword}`;

}

const checkScorePassword = async () => {
    if (scorePassword > -1)
        return true;
    return false;
}
const addNewUser = async () => {
    const newUser = createObjectUser();
    if (checkScorePassword()) {
        const response = await fetch("api/user", {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify(newUser)
        });

        if (!response.ok)
            throw new Error(`the connect failed ${response.status}, try again`);
        const data = await response.json();

    }
    else {
        const massegePasswordSpn = document.getElementById("massegePassword");
        massegePasswordSpn.innerHTML = `please change password`;

    }


}



