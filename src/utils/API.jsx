import axios from "axios";

const BASEURL = "https://randomuser.me/api/?results=23";

const searchAPI = () => {
    return axios.get(BASEURL);
};

const defaultOjb = { search: searchAPI };

export default defaultOjb;
