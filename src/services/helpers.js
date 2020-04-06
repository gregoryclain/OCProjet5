function calculTotal(productList) {
  let totalPrice = 0;
  if (productList.length > 0) {
    productList.forEach((el) => {
      totalPrice += parseFloat(el.price);
    });
  }

  return totalPrice;
}

export const helpers = { calculTotal };
