const fs = require('fs');
const path = require('path');

function dogeAverage(firstId = 0, lastId = 0) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname,'Dogecoin.csv');
    
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
            resolve(sum/dataArr.length);
        }
    });
}

module.exports = dogeAverage;