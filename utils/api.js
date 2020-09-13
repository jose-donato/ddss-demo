import axios from "axios"

const API_URL = "https://";
const temp = "https://jsonplaceholder.typicode.com/todos"

export async function callApi() {
    const res = await axios.get(temp);
    return res.data;
}