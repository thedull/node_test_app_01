import axios, { AxiosRequestConfig } from 'axios';
import { URLSearchParams } from 'url';

const first = process.argv[2] || '1';
const last = process.argv[3] || '1';

const baseUri = `http://localhost:3001/doge`;

const axiosOptions: AxiosRequestConfig = {
    url: baseUri,
    method: 'get',
    params: new URLSearchParams({ first, last })
};

(async () => {
    const response = await axios(axiosOptions);
    // console.log(response);
    const { firstId, lastId, avgId } = response.data;
    console.log(`Average between IDs ${firstId}-${lastId}: ${avgId}`);
})()



