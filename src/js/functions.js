import { dropdownFilter, dataTable, cardSales } from "./selectors";
let dataTableUser;

// Fetch data
export const loadData = () => {
  const url = "./assets/data/data.json";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      dataTableUser = data;
      printDataTable(data.transactions);
    });
};

// Function print html in DOM
const printDataTable = (data) => {
  const trTable = dataTable.querySelector("tbody");
  let html = "";

  data.forEach((transaction) => {
    const {
      paymentState,
      datePayment,
      brandCard,
      typePayment,
      paymentMethod,
      IdTransaction,
      amount,
      deduction,
    } = transaction;
    const brand = brandCard === 1 ? "masterd-card" : "visa";
    const state =
      paymentState === "successful" ? "Cobro exitoso" : "Cobro no realizado";

    html += `
         <tr class="${paymentState}">
            <td>
               <div class="state-transation">
                  <img src="./assets/images/${typePayment}.png" alt="icon"> ${state}
               </div>
            </td>
            <td>${datePayment}</td>
            <td><img src="./assets/images/${brand}-logo.png" alt="icon"> ${paymentMethod} </td>
            <td>${IdTransaction}</td>
            <td>
               <div class="value-total">${amount}</div>
               <div class="deduction">Deducción Bold</div>
               <div class="value-deduction">-${deduction}</div>
            </td>
         </tr>
      `;
    trTable.innerHTML = html;
  });
};

export const getResultRadioButtons = (e) => {
  e.preventDefault();
  dropdownFilter.classList.toggle("hidden");
  let isChecked;
  const radioButtons = e.target.querySelectorAll('input[name="filterType"]');
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      isChecked = radioButton.value;
      break;
    }
  }
  filterResultData(isChecked);
};

const filterResultData = (checked) => {
  const { transactions } = dataTableUser;
  const data = transactions.filter((transaction) => {
    if (checked === "all") {
      return transaction;
    }
    return transaction.typePayment === checked;
  });
  printDataTable(data);
};

// Filter slaes x Day
export const filterSalesTotal = (e) => {
  const titleCard = cardSales.querySelector(".sales__info-head span");
  const totalCard = cardSales.querySelector(".sales__info-total");

  const element = e.target;
  const selectElement = element.getAttribute("data-sales");
  const siblings = getSiblings(element);
  element.classList.add("active");
  siblings.map((sibling) => sibling.classList.remove("active"));

  if (selectElement === "today") {
    titleCard.textContent = `Total en ventas de hoy`;
    totalCard.textContent = `${dataTableUser.totalToday}`;
  }

  if (selectElement === "week") {
    titleCard.textContent = `Total en ventas de esta semana`;
    totalCard.textContent = `${dataTableUser.totalWeek}`;
  }

  if (selectElement === "month") {
    titleCard.textContent = `Total en ventas de septiembre`;
    totalCard.textContent = `${dataTableUser.totalMonth}`;
  }
};

// Button filter
export const btnFilter = (e) => {
  dropdownFilter.classList.remove("hidden");
  if (e.target.classList.contains("close")) {
    dropdownFilter.classList.add("hidden");
  }
};

// Get element sibling in nav filter
var getSiblings = function (elem) {
  var siblings = [];
  var sibling = elem.parentNode.firstChild;

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};
