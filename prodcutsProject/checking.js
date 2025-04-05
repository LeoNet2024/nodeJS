export function productsExist(id, prodcuts) {
  const select = prodcuts.find((el) => el.id === id * 1);

  return select;
}

export function findIndexOfProduct(id, prodcuts) {
  let indexToReturn = undefined;
  prodcuts.forEach((el, index) => {
    if (el.id === id * 1) indexToReturn = index;
  });

  console.log(indexToReturn);
  return indexToReturn;
}
