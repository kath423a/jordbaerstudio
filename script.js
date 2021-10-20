//Variabler oprettes og defineres
// let products; it's not industry standard to define to many global variables, should be defined when you need them.
let container = document.querySelector("#container");
let temp = document.querySelector("template");

document.addEventListener("DOMContentLoaded", hentData);

//Link til Wordpress custom post endpoint
const link = "http://jordbaerstudio.com/jordbaerstudio/wordpress/wp-json/wp/v2/pages/17";

//Her sendes en http anmodning via fetch til WordPress for at hente Json data
async function hentData() {
  const respons = await fetch(link);
  products = await respons.json();
  vis(products);
}

//Når Json data er modtaget, klones html templatet og indholdet fra Json lægges ind en for en
// the product variable name is """again""" defined here, but it can be named whatever you like, but not products_array, because we will define that it in this function and so it's going to be reserved.
function vis(products) {
  // Here we say, products_array = product, and we will check next if it's an array or object.
  let products_array = products;
  // this checks if the parameter: products is NOT an array, if this is true we cast the products into an array, because only one product was returned from the fetch and that is an object.
  if (Array.isArray(products) == false) {
    products_array = [products];
  }
  console.log(products_array);
  container.innerHTML = "";
  products_array.forEach((product) => {
    console.log(product);
    const klon = temp.cloneNode(true).content;
    //// !!! tere was an error here, because the attribute you where trying to fetch didn't exists, I thought this would be the correct link to the picture, but it seems not. Not entirely sure where that attribute is.
    klon.querySelector("img").src = product._links["wp:attachment"][0];
    klon.querySelector(".produkt_navn").textContent = product.title.rendered;
    klon.querySelector(".beskrivelse").innerHTML = product.content.rendered;
    container.appendChild(klon);
  });
}
