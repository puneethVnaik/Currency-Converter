const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns with currency codes
for (let select of dropdowns) {
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

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Fetch exchange rates and update the conversion
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  let fromCurrency = fromCurr.value;
  let toCurrency = toCurr.value;
  let URL = `${BASE_URL}/${fromCurrency}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();

    if (data.result === "success") {
      let rate = data.rates[toCurrency];
      let finalAmount = (amtVal * rate).toFixed(2);
      msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmount} ${toCurrency}`;
    } else {
      msg.innerText = "Error fetching exchange rate.";
    }
  } catch (error) {
    console.error("API fetch error:", error);
    msg.innerText = "Failed to fetch rates. Try again later.";
  }
};

// Update country flag for selected currency
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Event listeners
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});


// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");

// for (let select of dropdowns) {
//   for (currCode in countryList) {
//     let newOption = document.createElement("option");
//     newOption.innerText = currCode;
//     newOption.value = currCode;
//     if (select.name === "from" && currCode === "USD") {
//       newOption.selected = "selected";
//     } else if (select.name === "to" && currCode === "INR") {
//       newOption.selected = "selected";
//     }
//     select.append(newOption);
//   }

//   select.addEventListener("change", (evt) => {
//     updateFlag(evt.target);
//   });
// }

// const updateExchangeRate = async () => {
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;
//   if (amtVal === "" || amtVal < 1) {
//     amtVal = 1;
//     amount.value = "1";
//   }
//   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//   let response = await fetch(URL);
//   let data = await response.json();
//   let rate = data[toCurr.value.toLowerCase()];

//   let finalAmount = amtVal * rate;
//   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// };

// const updateFlag = (element) => {
//   let currCode = element.value;
//   let countryCode = countryList[currCode];
//   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//   let img = element.parentElement.querySelector("img");
//   img.src = newSrc;
// };

// btn.addEventListener("click", (evt) => {
//   evt.preventDefault();
//   updateExchangeRate();
// });

// window.addEventListener("load", () => {
//   updateExchangeRate();
// });
