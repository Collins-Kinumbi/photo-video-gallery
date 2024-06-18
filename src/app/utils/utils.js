import axios from "axios";

const key = "pSyIbNAH6Xkb4wLGKpYIAvsCFjnk9eC2TicBeODON13alDGabikWOUMg";

export function params(per = "20", page = "1", query = "") {
  return {
    per_page: String(per),
    page: String(page),
    query: query,
  };
}

function auth() {
  return {
    Authorization: `${key}`,
  };
}

export async function fetchData(url, params = {}) {
  try {
    const res = await axios.get(url, {
      headers: auth(),
      params: params,
    });
    // console.log(res.data);
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
