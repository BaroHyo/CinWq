import axios from "axios";

 
const baseURL = `https://us1.locationiq.com/v1`;

const Locationiq = axios.create({baseURL});

export default Locationiq;