//leon gitelman
function isPrimeNum(num) {
  for (let i = 2; i < num; i++) if (num % i === 0) return false;
  return true;
}

for (let i = 2; i < 237; i++) {
  isPrimeNum(i) && console.log(i);
}
