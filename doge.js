const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'Dogecoin.csv');

const firstId = process.argv[2];
const lastId = process.argv[3];

let fileContents = '';

fs.createReadStream(filePath)
    .on('data', chunk => {
        console.log('Received chunk:' + chunk.length);
        fileContents += chunk.toString();
    })
    .on('end', onEndHandler);

function onEndHandler() {
    // console.log(fileContents);
    const dataArr = fileContents.split("\r\n").slice(+firstId, +lastId+1);
    console.log(dataArr);
    let sum = 0;
    for (let entry of dataArr) {
        sum += +entry.split(',')[2];
    }
    console.log(`Average price is ${sum/dataArr.length}`);
}