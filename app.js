let currencySelect = document.querySelector(".js-input-currency");
let inputValue = document.querySelector(".js-input-value");
let resultValue = document.querySelector(".js-result-value");
let resultText = document.querySelector(".js-result-text");
let cursTable = document.querySelector(".js-curs-table");
let curs = 0;

async function getCurs() {
  try {
    let response = await fetch("https://cbu.uz/ru/arkhiv-kursov-valyut/json/");
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching currency data:", error);
  }
}

currencySelect.addEventListener("change", (e) => {
  let selectedCurrencyCode = currencySelect.value;
  editData(selectedCurrencyCode);
});

inputValue.addEventListener("input", (e) => {
  resultValue.value = (Number(inputValue.value) * curs).toFixed(2);
});

async function editData(currencyCode) {
  try {
    let valute = await getCurs();
    let newCurs = valute[currencyCode].Rate;
    curs = newCurs;
    resultText.innerHTML = valute[currencyCode].Name;

    inputValue.value = 1;
    resultValue.value = newCurs;
  } catch (error) {
    console.error("Error editing data:", error);
  }
}

const createTable = async () => {
  try {
    let data = await getCurs();

    Object.entries(data).forEach(([key, val]) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `<td>${val.Ccy}</td><td>${val.CcyNm_RU}</td><td>${val.Rate}</td>`;
      cursTable.querySelector("tbody").appendChild(tr);
    });
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

const editCurrency = async () => {
  try {
    let valute = await getCurs();

    Object.entries(valute).forEach(([key, val]) => {
      let option = document.createElement("option");
      option.value = key;
      option.innerHTML = val.CcyNm_RU;
      currencySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error editing currency options:", error);
  }
};

function start() {
  createTable();
  editCurrency();
}

start();
