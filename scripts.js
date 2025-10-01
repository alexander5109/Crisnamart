function showSection(section) {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("productos").classList.add("hidden");
  document.getElementById(section).classList.remove("hidden");
}

async function loadCSV() {
  const response = await fetch("products.csv");
  const text = await response.text();

  // separa por líneas y luego por tabulación
  const lines = text.trim().split("\n");
  const headers = lines.shift().split("\t");

  const products = lines.map(line => {
    const cols = line.split("\t");
    let obj = {};
    headers.forEach((h, i) => obj[h] = cols[i]);
    return obj;
  });

  renderProducts(products);
}

function renderProducts(products) {
  const catalogo = document.getElementById("catalogo");

  // agrupar por categoría (la carpeta después de IMAGENES JAZZ)
  const grouped = {};
  products.forEach(p => {
    const parts = p.path.split("\\"); // separador Windows
    const categoria = parts[1]; // Ej: ARGOS
    if (!grouped[categoria]) grouped[categoria] = [];
    grouped[categoria].push(p);
  });

  for (const cat in grouped) {
    const catDiv = document.createElement("div");
    catDiv.classList.add("category");
    catDiv.innerHTML = `<h2>${cat}</h2>`;

    const prodDiv = document.createElement("div");
    prodDiv.classList.add("products");

    grouped[cat].forEach(p => {
      const item = document.createElement("div");
      item.classList.add("product");
      item.innerHTML = `
        <img src="${p.path}" alt="${p.desc}">
        <p>${p.desc}</p>
      `;
      prodDiv.appendChild(item);
    });

    catDiv.appendChild(prodDiv);
    catalogo.appendChild(catDiv);
  }
}

loadCSV();
