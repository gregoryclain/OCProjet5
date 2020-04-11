/* eslint-disable no-unused-vars */
import axios from "axios";

function calculTotal(productList) {
  let totalPrice = 0;
  if (productList.length > 0) {
    productList.forEach(el => {
      totalPrice += parseFloat(el.price);
    });
  }
  return totalPrice;
}

function callApi(method, url, payload) {
  return axios({ method, url, payload })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log("error", error);
      return false;
    });
}

export const helpers = { calculTotal, callApi };
