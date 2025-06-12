async function fetchBitcoinData() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await response.json();
    document.getElementById('btc-price').textContent = `Bitcoin Price: $${data.bitcoin.usd}`;

    const blockResponse = await fetch('https://api.blockchain.info/q/getblockcount');
    const blockData = await blockResponse.text();
    document.getElementById('block-height').textContent = `Block Height: ${blockData}`;
}

function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York' });
}

function updateTransactionLink() {
    const txId = document.getElementById('transaction-id').value;
    document.getElementById('transaction-link').href = `https://mempool.space/tx/${txId}`;
}

function calculateGrowth() {
    const current = parseFloat(document.getElementById('current-holdings').value) || 0;
    const previous = parseFloat(document.getElementById('previous-holdings').value) || 0;
    const growth = previous > 0 ? ((current - previous) / previous) * 100 : 0;
    document.getElementById('growth-percentage').textContent = `${growth.toFixed(2)}%`;
}

document.getElementById('transaction-id').addEventListener('input', updateTransactionLink);
document.getElementById('current-holdings').addEventListener('input', calculateGrowth);
document.getElementById('previous-holdings').addEventListener('input', calculateGrowth);

setInterval(updateClock, 1000);
fetchBitcoinData();
