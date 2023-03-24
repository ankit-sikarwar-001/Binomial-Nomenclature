function ready() {
  if (document.readyState !== "loading") {
    main();
    return;
  }
  document.addEventListener("DOMContentLoaded", main);
}

ready();

let species = [];
let filteredSpecies = [];

// this will be executed when page is loaded
function main() {
  console.log("page is ready");

  fetch("species.json")
    .then((res) => res.json()) // arrow function
    .then((res) => {
      console.log(res);
      species = res;
      filteredSpecies = species;
    });

  const form = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  console.log(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchText = searchInput.value;
    console.log(searchText);

    // do nothing if searchText is empty
    if (!searchText) return;

    filteredSpecies = species.filter((item) => item.name.includes(searchText));
    console.log(filteredSpecies);
    updateList();
  });
}

function updateList() {
  const speciesDiv = document.getElementById("species");
  speciesDiv.innerHTML = filteredSpecies.map(getNameHTMLTemplate).join('');
}

function getNameHTMLTemplate({ name, image, scientificName }) {
  return `
  <div class="name-cell">
    <img src="${image}" alt="${name}" />
    <div class="name-cell-details">
      <h5>${name}</h5>
      <p>${scientificName}</p>
    </div>
  </div>
  `;
}
