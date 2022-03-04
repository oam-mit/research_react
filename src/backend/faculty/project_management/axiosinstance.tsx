import axios from "axios";
import getCookie from "../../common/csrfCookie";

const instance = axios.create({
	baseURL: "/project_management/api/",
	headers: {
		"X-CSRFToken": getCookie("csrftoken"),
	},
});

export default instance;
