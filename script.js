//Variabler oprettes og defineres
let products;
let container = document.querySelector("#container");
let temp = document.querySelector("template");

document.addEventListener("DOMContentLoaded", hentData);

//Link til Wordpress custom post endpoint
const link = "http://jordbaerstudio.com/jordbaerstudio/wordpress/wp-json/wp/v2/pages/17";

//Her sendes en http anmodning via fetch til WordPress for at hente Json data
async function hentData() {
  const respons = await fetch(link);
  kager = await respons.json();
  vis(products);
}

//Når Json data er modtaget, klones html templatet og indholdet fra Json lægges ind en for en
function vis(products) {
  container.innerHTML = "";
  products.forEach((product) => {
    console.log(product);
    const klon = temp.cloneNode(true).content;
    klon.querySelector("img").src = product.billede.guid;
    klon.querySelector(".produkt_navn").textContent = product.title.rendered;
    klon.querySelector(".beskrivelse").innerHTML = product.content.rendered;
    container.appendChild(klon);
  });
}
