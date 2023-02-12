const API = `http://localhost:3000/books/`;

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let userName = document.getElementById("user-name").value;
  let passWord = document.getElementById("password").value;

  fetch(
    API,
    {
      method: "POST",
      body: JSON.stringify({ username: userName, password: passWord }),
    }
      .then((response) => response.json())
      .then((response) => console.log(response))
  );
});
