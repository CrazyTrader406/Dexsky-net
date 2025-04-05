
let allData = [];

async function fetchCryptoData() {
  try {
    const response = await fetch("https://api.dexscreener.com/latest/dex/pairs");
    const data = await response.json();

    const pairs = data.pairs.slice(0, 10);
    const formattedData = pairs.map(pair => ({
      name: pair.baseToken.symbol,
      price: parseFloat(pair.priceUsd).toFixed(6),
      volume: parseFloat(pair.volume.h24).toLocaleString()
    }));

    loadTableData(formattedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function loadTableData(data) {
  allData = data;
  renderTable(data);
}

function renderTable(data) {
  const tableBody = document.getElementById("crypto-table").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  data.forEach(token => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${token.name}</td>
      <td>$${token.price}</td>
      <td>${token.volume}</td>
    `;
    tableBody.appendChild(row);
  });
}

document.getElementById("search").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = allData.filter(token => token.name.toLowerCase().includes(keyword));
  renderTable(filtered);
});

window.onload = fetchCryptoData;
