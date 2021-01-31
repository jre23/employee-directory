// import axios to do a get request to BASEURL for 15 random users 
import axios from "axios";

const BASEURL = "https://randomuser.me/api/?results=15";

const search = () => axios.get(BASEURL);

export default search;
