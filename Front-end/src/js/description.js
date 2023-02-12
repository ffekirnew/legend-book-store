const API = `http://localhost:3000/books/`;

const url = window.location.href.split("?");
const id = parseInt(url[url.length - 1]);

async function fetchData() {
  let result;

  await fetch(API + `${id}`)
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });

  return result;
}

async function main() {
  const data = await fetchData();
  console.log(data);

  const bookImage = document.getElementById("bookImage");
  fetch(API + `${id}/cover`)
    .then((response) => response.blob())
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      bookImage.src = imageUrl;
    });

  const bookTitle = document.getElementById("bookTitle");
  const bookName = document.getElementById("bookName");
  const bookAuthor = document.getElementById("bookAuthor");
  const category = document.getElementById("category");
  const price = document.getElementById("price");
  const backgroundStory = document.getElementById("backgroundStory");
  const exapmleQuote = document.getElementById("exapmleQuote");
  const synopsis = document.getElementById("synopsis");

  const dataExample = {
    id: 29,
    title: ";fjkldaj;",
    author: "jd;lafj;",
    category: "jdkajf;",
    backgroundStory: "jaj;fkla;",
    exampleQuote: "jdfklajf;l",
    synopsis: "jkadfj;lk",
    price: 200,
    coverImage:
      "2546103f16ccfcc2faf42f375211b23d3-Screenshot from 2023-02-10 08-37-51.png",
  };

  bookTitle.innerHTML = data.title;
  bookName.innerHTML = data.title;
  bookAuthor.innerHTML = data.author;
  category.innerHTML = data.category;
  backgroundStory.innerHTML = data.backgroundStory;
  exampleQuote.innerHTML = data.exampleQuote;
  synopsis.innerHTML = data.synopsis;
  console.log(price);
  price.innerHTML = data.price;
}

main();

form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  fname = document.querySelector("#first-name").value;
  lname = document.querySelector("#last-name").value;
  phone = document.querySelector("#phone").value;
  LOCATION = document.querySelector("#location").value;

  let result = await fetch("http://localhost:3000/orders/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: fname,
      lastName: lname,
      phone: phone,
      location: LOCATION,
      bookId: id,
    }),
  });
  console.log(result);
});
