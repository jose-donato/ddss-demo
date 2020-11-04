import axios from "axios"

const API_URL = "https://ddss-demo.glitch.me"
const SHODAN_API_KEY = "FoqmjsojuDWj9qC4cwhAjBDQTrAFuTPU"

export async function callApi(query, token) {
    const res = await axios.get(API_URL+"/api", { params: { query }, headers: {
        Authorization: `Bearer ${token}`
    } });
    return res.data;
}

export async function __UNSAFE__callApi(query) {
    const res = await axios.get(`https://api.shodan.io/shodan/host/search?key=${SHODAN_API_KEY}&query=${query}`)
    return res.data
}

export async function login(username, password) {
    const res = await axios.post(API_URL+"/login", {
        username,
        password
    })
    return res.data
}

export async function register(username, password) {
    const res = await axios.post(API_URL+"/register", {
        username,
        password
    })
    return res.data

}