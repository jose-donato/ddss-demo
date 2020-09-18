import axios from "axios"

const API_URL = "https://";
const API_URL_SAFE = "https://urlscan.io/api/v1/scan/";
const temp = "https://jsonplaceholder.typicode.com/todos"

export async function callApi() {
    const res = await axios.post(temp);
    return res.data;
}