const BASE_URL = "https://api.exchangerate.host/convert";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const selects = document.querySelectorAll("select");




for (let select of selects) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }
}

selects.forEach((select) => {
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
});

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;

  const URL = `${BASE_URL}?from=${from}&to=${to}&amount=${amtVal}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();

    if (data.success) {
      let finalAmount = data.result.toFixed(2);
      msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`;
    } else {
      msg.innerText = "Conversion failed. Try again.";
    }
  } catch (error) {
    msg.innerText = "Error fetching exchange rate.";
    console.error("Fetch error:", error);
  }
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
