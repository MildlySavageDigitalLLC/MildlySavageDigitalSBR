async function fetchBitcoinData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        document.getElementById('btc-price').textContent = `Bitcoin Price: $${data.bitcoin.usd}`;

        const blockResponse = await fetch('https://api.blockchain.info/q/getblockcount');
        const blockData = await blockResponse.text();
        document.getElementById('block-height').textContent = `Block Height: ${blockData}`;
    } catch (error) {
        document.getElementById('btc-price').textContent = "Error fetching Bitcoin price";
        document.getElementById('block-height').textContent = "Error fetching Block Height";
    }
}

function updateClock() {
    const now = new Date();
    const options = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('clock').textContent = `Time: ${now.toLocaleTimeString('en-US', options)}`;
}

function updateDate() {
    const now = new Date();
    const options = { timeZone: 'America/New_York', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = `Date: ${now.toLocaleDateString('en-US', options)}`;
}

function calculateGrowth() {
    const currentHoldingsText = document.getElementById('current-holdings').textContent.replace(/\D/g, '');
    const previousHoldingsText = document.getElementById('previous-holdings').textContent.replace(/\D/g, '');

    const current = parseFloat(currentHoldingsText) || 0;
    const previous = parseFloat(previousHoldingsText) || 0;

    const growth = previous > 0 ? ((current - previous) / previous) * 100 : 0;
    document.getElementById('growth-percentage').textContent = `Month-to-Month Growth: ${growth.toFixed(2)}%`;
}

setInterval(updateClock, 1000);
setInterval(updateDate, 60000);
fetchBitcoinData();
setInterval(calculateGrowth, 5000);
