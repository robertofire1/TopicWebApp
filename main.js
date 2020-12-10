console.log("data");
var app = document.getElementById("container");
console.log(app);
var input = document.getElementById("SearchAnime");

input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    load();

    event.preventDefault();
  }
});
async function load() {
  var seachIteam = input.value;
  var str = seachIteam.replace(/\s+/g, "%20");

  console.log(str);
  var querry = await fetch(
    `https://api.jikan.moe/v3/search/anime?q=${str || "naruto"}&limit=24`
  )
    .catch((error) => console.log(error))
    .then((response) => response.json());
  console.log(querry.results);
  app.innerHTML = "";

  querry.results.map((item) => {
    var itemContainer = document.createElement("div");

    itemContainer.classList.add("classcontainer");
    itemContainer.id = item.mal_id;

    var newimag = document.createElement("img");
    newimag.src = item.image_url;
    newimag.classList.add("imageclass");
    itemContainer.appendChild(newimag);

    var newname = document.createElement("h2")
    newname.innerHTML= item.title;
    newname.classList.add("h2")
    itemContainer.appendChild(newname);

    var newsinopsis = document.createElement("span");
    newsinopsis.innerHTML = item.synopsis;
    newsinopsis.classList.add("sinopsis");
    itemContainer.appendChild(newsinopsis);


    app.appendChild(itemContainer);
  });
}
