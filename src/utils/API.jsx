import axios from "axios";

const BASEURL = "https://randomuser.me/api/?results=10";

const search = () => axios.get(BASEURL);

export default search;
