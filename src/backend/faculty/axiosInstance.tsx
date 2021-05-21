import axios from "axios";
import getCookie from "../common/csrfCookie";

const instance = axios.create({
	baseURL: "/faculty/api/",
	headers: {
		"X-CSRFToken": getCookie("csrftoken"),
	},
});

export default instance;
