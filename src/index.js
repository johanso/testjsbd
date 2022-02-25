import "./style.scss";

import { filterBtn, filterSales, filterForm } from "./js/selectors";
import {
  loadData,
  btnFilter,
  filterSalesTotal,
  getResultRadioButtons,
} from "./js/functions";

// EVENTlISTENER
const eventListeners = () => {
  document.addEventListener("DOMContentLoaded", loadData);
  filterForm.addEventListener("submit", getResultRadioButtons);
  filterBtn.addEventListener("click", btnFilter);
  filterSales.addEventListener("click", filterSalesTotal);
};

eventListeners();
