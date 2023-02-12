const API = `http://localhost:3000/books/`;

const form = document.querySelector("#form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const categoryInput = document.querySelector("#category");
const backgroundStoryInput = document.querySelector("#backgroundStory");
const exampleQuoteInput = document.querySelector("#exampleQuote");
const priceInput = document.querySelector("#price");
const coverImageInput = document.querySelector("#coverImage");
const synopsis = document.querySelector("#synopsis");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData();
  data.append("title", titleInput.value);
  data.append("author", authorInput.value);
  data.append("category", categoryInput.value);
  data.append("backgroundStory", backgroundStoryInput.value);
  data.append("exampleQuote", exampleQuoteInput.value);
  data.append("price", priceInput.value);
  data.append("coverImage", coverImageInput.files[0]);
  data.append("synopsis", synopsis.value);

  const response = await fetch("http://localhost:3000/books/", {
    method: "POST",
    body: data,
  });

  if (response.ok) {
    console.log("ok");
  } else {
    console.log("not ok");
  }
});
