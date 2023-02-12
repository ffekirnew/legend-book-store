async function some() {
  let result;

  await fetch("http://localhost:3000/books")
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });

  return result;
}

async function main() {
  const data = await some();
  console.log(data);

  const tableBody = document.getElementById("tbody");

  for (let i = 0; i < data.length; i++) {
    tableBody.innerHTML += `<tr>
        <td><a href="./description-checkout.html?${data[i].id}">${data[i].title}</a></td>
        <td>${data[i].author}</td>
        <td>Personal Developement</td>
        <td>${data[i].price}</td>
    </tr>`;
  }
}

main();
