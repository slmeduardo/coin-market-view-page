const boxCard = document.getElementById('boxcard')
const search = document.getElementById('search')
const btn = document.getElementById('btn')
const notFind = document.getElementById('error')
btn.addEventListener('click', searchCoin)

function cardGenerator(crypto) {
    boxCard.innerHTML = `<div class="card">
    <div class="title">
        <img src="${crypto.image.small}">
        <h1>${crypto.name}</h1>
    </div>
    
    <div class="info">
        <div class="price">
            <h2>Preço</h2>
            <p>R$${crypto.market_data.current_price.brl}</p>
        </div>
        <div class="ze">
            <h2>24h %</h2>
            <p>${crypto.market_data.high_24h.brl}%</p>
        </div>
        <div class="volume">
            <h2>Volume</h2>
            <p>R$${crypto.market_data.total_volume.brl}</p>
        </div>
    
        <div class="btn">
            <button><a href="https://www.coingecko.com/pt/moedas/${crypto.id}" target="_blank">Market CAP</a></button>
        </div>
    </div>
    </div>` 
}

function searchCoin() {
    boxCard.innerHTML = ''
    notFind.innerHTML = ''
    const searchValue = search.value
    fetch(`https://api.coingecko.com/api/v3/coins/${searchValue}`)
    .then(res => res.json())
    .then(res => {
        if(res.error) return notFind.innerHTML = res.error
        cardGenerator(res)}
    )
    .catch(error => console.log(error))
}