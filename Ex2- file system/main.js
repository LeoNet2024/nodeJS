// Part One create 10 files:

const fs = require("fs");

//This function create 10 files with different text
function createTenFile() {
  for (let i = 0; i < 10; i++) {
    fs.writeFileSync(`${__dirname}/file${i + 1}.txt`, fillTextInfile(i + 1));
  }
}

// This funcion return lines(the number of the lines is a random)
function fillTextInfile(lineNum) {
  let str = "";
  const randomnumber = Math.floor(Math.random() * 10);

  for (let i = 0; i < randomnumber + 1; i++) {
    str += `This is file ${lineNum}, but Line number is  ${i + 1} \n `;
  }
  return str;
}

// createTenFile();

// Part Two Read from those file and create file

let files = [];

// add the files into a list
function listOffiles() {
  let filename = "";
  for (let i = 0; i < 10; i++) {
    filename = `${__dirname}/file${i + 1}.txt`;
    files.push(filename);
  }
}

// reading from list files and create final file

function createFinalFile() {
  let content = "";
  let textArray;

  for (let i = 0; i < files.length; i++) {
    for (let j = 0; j < i + 1; j++) {
      textArray = fs.readFileSync(files[i], "utf-8").split("\n");
      if (textArray[j] != null) {
        content += textArray[j] + "\n";
      }
    }
  }
  fs.writeFileSync(`${__dirname}/finalFile.txt`, content);
}
createTenFile();
listOffiles();
createFinalFile();
