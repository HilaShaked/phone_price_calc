function formatNumber(input) {
    let value = input.value;
    value = value.replace(/[^\d.]/g, '');

    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts[1];
    }

    let [integerPart, decimalPart] = value.split('.');
    if (integerPart) {
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    input.value = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
}

window.onload = function() {
    const listOfInputs = document.getElementsByTagName('input');
    for (let i in listOfInputs) {
        if (listOfInputs[i].id != undefined) {
            listOfInputs[i].addEventListener("keypress", function(event) {
                // console.log(`${event.key === "Enter"}`);
                if (event.key === "Enter") {
                    event.preventDefault();
                    calculate();
                }
            });
        }
    }
  };

function calculate() {
    const taxPercent = Number(document.getElementById('tax-percent').value);    
    // console.log({taxPercent});
    const months = Number(document.getElementById('months').value);
    // console.log({months});
    
    const taxCreditOfIndependent = Number(document.getElementById('tax-credits-independent').value);
    // console.log({taxCreditOfIndependent});
    const phonePrice = Number(document.getElementById('phone-price').value);
    // console.log({phonePrice});
    const monthlyCredit = Number(document.getElementById('monthly-credit').value)
    // console.log({monthlyCredit});

    const taxCreditOfCompany = Number(document.getElementById('tax-credits-company').value);
    const phoneUpgradePrice = Number(document.getElementById('phone-upgrade-price').value);
    // const phonePurchasePrice = Number(document.getElementById('phone-purchase-price').value);
    let phonePurchasePrice = document.getElementById('phone-purchase-price').value;
    if (!phonePurchasePrice){
        phonePurchasePrice = Number(document.getElementById('phone-purchase-price').placeholder);
    }


    const totalOfIndependent = totalWhenBuyingIndependently(phonePrice, taxPercent, months, monthlyCredit, taxCreditOfIndependent);
    const totalOfCompany = totalWhenBoughtByCompany(phoneUpgradePrice, taxPercent, months, taxCreditOfCompany, phonePurchasePrice);


    document.getElementById('total-of-independent').textContent = totalOfIndependent;
    document.getElementById('total-of-company-bought').textContent = totalOfCompany;

    document.getElementById('diff').textContent = (totalOfIndependent - totalOfCompany).toFixed(2);
}


function totalWhenBoughtByCompany(phoneUpgradePrice, taxPercentage, numOfMonths, taxCredits, phonePurchasePrice) {
    const netTaxCredits = taxCredits * taxPercentage;

    const totalTaxCredits = netTaxCredits * numOfMonths;

    const total = (-1 * (totalTaxCredits + phoneUpgradePrice)) - phonePurchasePrice;

    return total.toFixed(2);
}


function totalWhenBuyingIndependently(phonePrice, taxPercentage, numOfMonths, monthlyCredit, taxCredits) {
    const netMonthlyCredit = monthlyCredit * (1 - taxPercentage);

    const netTaxCredits = taxCredits * taxPercentage;

    const totalCredit = (netMonthlyCredit - netTaxCredits) * numOfMonths;

    const total = totalCredit - phonePrice;
	
	return total.toFixed(2);
}
