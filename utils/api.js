import axios from "axios"

const API_URL = "https://ddss-demo.glitch.me/"
const temp = "https://jsonplaceholder.typicode.com/todos"

export async function callApi(query) {
    const res = await axios.get(API_URL+"api", { params: { query } });
    return res.data;
}