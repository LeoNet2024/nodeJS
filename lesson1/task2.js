//leon gitelman 
/**
This function check if the num is prime
**/
function isPrimeNum(num) {
  for (let i = 2; i < num; i++) if (num % i === 0) return false;
  return true;
}

// main function
function main(){
  for (let i = 2; i < 237; i++) {
    isPrimeNum(i) && console.log(i);
  }  
}
