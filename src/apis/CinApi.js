import axios from "axios";

const baseURL = 'http://metroid-001-site1.atempurl.com/api';

const CinApi = axios.create({baseURL});

export default CinApi;