// let scorePassword = 0;

// const checkPassword = async () => {
//     const password = document.getElementById('Password').value;
//     const response = await fetch("api/password/validate", {
//         headers: { "Content-Type": "application/json" },
//         method: 'POST',
//         body: JSON.stringify(password)

//     });

//     if (!response.ok)
//         throw new Error(`the connect failed ${response.status}, try again`);
//     const data = await response.json();
//     console.log(data);
//     scorePassword = data;
//     const scoreSpn = document.getElementById("score");
//     scoreSpn.innerHTML = `your score: ${scorePassword}`;

// }

// const checkScorePassword = async () => {
//     if (scorePassword > 1)
//         return true;
//     return false;
// }

const createObjectUser = () => {
    const newUserName = document.getElementById("Email").value;
    const newUserPassword = document.getElementById("Password").value;
    const newUserFirstName = document.getElementById("FirstName").value;
    const newUserLastName = document.getElementById("LastName").value;
    return {
        UserName: newUserName,
        Password: newUserPassword,
        FirstName: newUserFirstName,
        LastName: newUserLastName,
    };
};
const checkPassword = async (password) => {
    const response = await fetch("api/password/validate", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(password),
    });

    if (!response.ok) {
        throw new Error(`Failed to connect with status ${response.status}. Please try again.`);
    }
    const data = await response.json();

    if (data.error) {
        console.error(data.error);
        return false;
    }

    console.log(data);
    document.getElementById("score").innerHTML = `Your score: ${data}`;
    updateProgressValue(data);
    return data >= 2;
};
const updateProgressValue = (score) => {
    document.getElementById("progress").value = 0.25 * parseInt(score);
}
const register = async () => {
    const newUser = createObjectUser();
    if (checkPassword(newUser.Password)) {
        const response = await fetch("api/user", {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify(newUser)
        });

        if (!response.ok)
            throw new Error(`the connect failed ${response.status}, try again`);
        const data = await response.json();
        window.location.href = "./Login.html";

    }
    else {
        addMassegePassword();
    }
}
const addMassegePassword = () => {
    const massegePasswordSpn = document.getElementById("massegePassword");
    massegePasswordSpn.innerHTML = `please change password`;
}