import axios from 'axios';

const SHODAN_API_KEY = 'FoqmjsojuDWj9qC4cwhAjBDQTrAFuTPU';

export async function __UNSAFE__callApi(query) {
  const res = await axios.get(
    `https://api.shodan.io/shodan/host/search?key=${SHODAN_API_KEY}&query=${query}`
  );
  return res.data.matches.splice(0, 10);
}
