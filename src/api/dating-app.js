import axios from "axios";

const datingApp = axios.create('http://localhost:8080/api/v1');

export default datingApp;