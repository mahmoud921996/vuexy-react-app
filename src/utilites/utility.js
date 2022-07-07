import products from "../data";
export function getPrices() {
  return products.map(product => product.price);
}
export function getMinPrice() {
  return Math.floor(Math.min(...getPrices()));
}

export function getMaxPrice() {
  return Math.ceil(Math.max(...getPrices()));
}
