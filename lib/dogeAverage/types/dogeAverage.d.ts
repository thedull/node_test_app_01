export = dogeAverage;

/**
 * 
 * @param {number} firstId The first id from the list to include in the calculation 
 * @param {number} lastId The last id to include
 * @return {Promise<number>} A promise with the average between the two ids
 */
declare function dogeAverage(firstId?: number, lastId?: number): Promise<number>;
