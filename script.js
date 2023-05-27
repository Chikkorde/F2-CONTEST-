

const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
let data = []; // Global variable to store the fetched data
// Function to fetch data using .then
function fetchDataUsingThen() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        renderTable(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  
  
  // Function to fetch data using async/await
  async function fetchDataUsingAsyncAwait() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      renderTable(data);
    } catch (error) {
      console.log(error);
    }
  }


  
  // Function to render the table with data
  function renderTable(data) {
    const dataBody = document.getElementById('dataBody');
    dataBody.innerHTML = '';
  
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.id}</td>
        <td><img src="${item.image}" alt="${item.name}" width="20"></td>
        <td>${item.symbol}</td>
        <td>${item.current_price}</td>
        <td>${item.total_volume}</td>
      `;
      dataBody.appendChild(row);
    });
  }
  
  // Function to handle search button click
  function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
  
    const filteredData = data.filter(item => {
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.symbol.toLowerCase().includes(searchTerm)
      );
    });
  
    renderTable(filteredData);
  }
  
  // Function to handle sort by market cap button click
  function handleSortByMarketCap() {
    const sortedData = data.slice().sort((a, b) => {
      return a.market_cap - b.market_cap;
    });
  
    renderTable(sortedData);
  }
  
  // Function to handle sort by percentage change button click
  function handleSortByPercentageChange() {
    const sortedData = data.slice().sort((a, b) => {
      return a.price_change_percentage_24h - b.price_change_percentage_24h;
    });
  
    renderTable(sortedData);
  }
  
  // Event listeners
  document.getElementById('searchBtn').addEventListener('click', handleSearch);
  document.getElementById('sortMarketCapBtn').addEventListener('click', handleSortByMarketCap);
  document.getElementById('sortPercentageChangeBtn').addEventListener('click', handleSortByPercentageChange);
  
  // Fetch data using .then
  fetchDataUsingThen();
  
  // Fetch data using async/await
  // fetchDataUsingAsyncAwait();
  