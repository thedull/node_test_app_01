import * as dogeAverage from "dogeAverage";

const firstId = +process.argv[2] || 1;
const lastId = +process.argv[3] || 1;

(async () => {
    const avgId = await dogeAverage(firstId, lastId);
    console.log(`Average between IDs ${firstId}-${lastId}: ${avgId}`);
})();