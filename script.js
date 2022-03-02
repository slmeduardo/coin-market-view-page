const boxCard = document.getElementById('boxcard')

let favorites = []

let cryptos = []

function cardGenerator(crypto) { 
    if(favorites.includes(crypto.id)) {
        return boxCard.innerHTML += `<div class="card">
    <div class="title">
    <img src="${crypto.image}">
    <h1>${crypto.name}</h1>
    <span id="${crypto.id}" class="favorite" onclick="addFavorite('${crypto.id}')">⭒</span>
    </div>
    
    <div class="info">
    <div class="price">
    <h2>Preço</h2>
    <p>R$${crypto.current_price}</p>
    </div>
    <div class="ze">
    <h2>24h %</h2>
    <p>${crypto.high_24h}%</p>
    </div>
    <div class="volume">
    <h2>Volume</h2>
    <p>R$${crypto.total_volume}</p>
    </div>
    
    <div class="btn">
    <button><a href="https://www.coingecko.com/pt/moedas/${crypto.id}" target="_blank">Market CAP</a></button>
    </div>
    </div>
    </div>` 
    }
    return boxCard.innerHTML += `<div class="card">
    <div class="title">
    <img src="${crypto.image}">
    <h1>${crypto.name}</h1>
    <span id="${crypto.id}" onclick="addFavorite('${crypto.id}')">⭒</span>
    </div>
    
    <div class="info">
    <div class="price">
    <h2>Preço</h2>
    <p>R$${crypto.current_price}</p>
    </div>
    <div class="ze">
    <h2>24h %</h2>
    <p>${crypto.high_24h}%</p>
    </div>
    <div class="volume">
    <h2>Volume</h2>
    <p>R$${crypto.total_volume}</p>
    </div>
    
    <div class="btn">
    <button><a href="https://www.coingecko.com/pt/moedas/${crypto.id}" target="_blank">Market CAP</a></button>
    </div>
    </div>
    </div>` 
        }


    function addFavorite(id) {
    if (document.getElementById(id).classList.contains('favorite')) {
        return removeFavorite(id)
    }
    favorites.push(id)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    document.getElementById(id).classList.add('favorite')
    sortList()
}

function removeFavorite(el) {
    const index = favorites.indexOf(el);
    if (index > -1) {
      favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites))
    document.getElementById(el).classList.remove('favorite')
    }
}

function sortList(resposta) {
    boxCard.innerHTML = ""
    if (cryptos.length <= 0) {
       cryptos = resposta
    }
    cryptos.sort((a, b) => favorites.includes(b.id) - favorites.includes(a.id)).forEach(crypto => cardGenerator(crypto))
}

favorites = JSON.parse(localStorage.getItem('favorites')) || []

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=100&page=1&sparkline=false')
.then(resposta => resposta.json())
.then(resposta => sortList(resposta))