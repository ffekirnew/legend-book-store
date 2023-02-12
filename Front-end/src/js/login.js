const form = document.getElementById("form");
const usernameInput = document.getElementById("user-name");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let result;

    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "username": usernameInput.value,
                "password": passwordInput.value
            }
        ),
        })
        .then(response => response.json())
        .then(data => {
            result = data;
        });

    if ( !(result) ) {
        console.log("Error");
        
    } else {
        console.log(result);
        document.cookie = `access_token=${result.accesToken}`;
        let red = document.getElementById('redirect');
        red.click();
    }
  });
