//Variabler oprettes og defineres
let container = document.querySelector("#container");
let temp = document.querySelector("template");

document.addEventListener("DOMContentLoaded", hentData);

//Link til Wordpress page endpoint
const link = "http://jordbaerstudio.com/jordbaerstudio/wordpress//wp-json/wp/v2/pages/17";

//Her sendes en http anmodning via fetch til WordPress for at hente Json data
async function hentData() {
  const respons = await fetch(link);
  products = await respons.json();
  vis(products);
}

function vis(products) {
  let products_array = products;
  if (Array.isArray(products) == false) {
    products_array = [products];
  }
  console.log(products_array);
  container.innerHTML = "";
  products_array.forEach((product) => {
    console.log(product);
    const klon = temp.cloneNode(true).content;
    klon.querySelector(".page_titel").textContent = product.title.rendered;
    klon.querySelector(".beskrivelse").innerHTML = product.content.rendered;
    container.appendChild(klon);
  });
}
