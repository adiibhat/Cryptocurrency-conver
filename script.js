const amountInput = document.getElementById("amount");
const cryptoSelect = document.getElementById("crypto");
const currencySelect = document.getElementById("currency");
const resultDiv = document.getElementById("result");

async function fetchConversion() {
    const amount = parseFloat(amountInput.value) || 0;
    const crypto = cryptoSelect.value;
    const currency = currencySelect.value;

    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`;
        const res = await fetch(url);
        const data = await res.json();
        const price = data[crypto][currency];

        const converted = (amount * price).toFixed(2);
        const symbol = currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";
        resultDiv.innerText = `Converted value: ${symbol}${converted}`;
    } catch (err) {
        resultDiv.innerText = "Error fetching data";
    }
}

amountInput.addEventListener("input", fetchConversion);
cryptoSelect.addEventListener("change", fetchConversion);
currencySelect.addEventListener("change", fetchConversion);
