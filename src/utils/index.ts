/* eslint-disable no-mixed-spaces-and-tabs */
// import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { dbTodoProps } from "../views/home/Home";
import { UserTitleCount } from "../views/home/components/Dashboard";
// import { getLoginToken } from "../storage";
// import { AxiosError } from "axios";

const SERVER_ERROR = "There was an error contacting the server.";

export const toastOptions = {
	position: toast.POSITION.TOP_CENTER,
	// autoClose: 8000,
	draggable: true,
	//   theme: "dark",
	// timeOut: 8000,
	pauseOnHover: true,
	style: {
		zIndex: "9999",
	},
};

export const successAlert = (msg: string) => {
	toast.success(msg || "Successfully created", toastOptions);
};
export const errorAlert = (error: any) => {
	const err =
		error?.response?.data?.message ||
		error?.response?.data?.msg ||
		error?.response?.data?.error
			? error?.response?.data?.message ||
			  error?.response?.data?.msg ||
			  error?.response?.data?.error
			: SERVER_ERROR;
	toast.error(err, toastOptions);
};
export const infoAlert = (msg: string) => {
	toast.info(msg || "Info Notification !", toastOptions);
};

// STUB: get user title count
// @returns an object containing user fullname and title count
export function getUserTitleCount(data: dbTodoProps[]): UserTitleCount[] {
	const userTitleCount: { [userId: string]: UserTitleCount } = {};

	data.forEach((task) => {
		const userId = task.user.id;
		const fullname = task.user.fullname;

		if (!userTitleCount[userId]) {
			userTitleCount[userId] = {
				fullname: fullname,
				count: 0,
			};
		}

		userTitleCount[userId].count++;
	});

	return Object.values(userTitleCount);
}