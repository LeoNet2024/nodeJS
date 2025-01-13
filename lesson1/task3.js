//leon gitelman
let array = [24, 5135, 8, 9, 0, 0, 34, 56];

// This function counting 0 in the array
function countzero(array) {
  let count = 0;
  array.forEach((elem) => {
    elem === 0 && count++;
  });
  return count;
}

console.log(countzero(array));
