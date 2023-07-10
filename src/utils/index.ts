// import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
// import { getLoginToken } from "../storage";
// import { AxiosError } from "axios";

const SERVER_ERROR = "There was an error contacting the server.";

export const toastOptions = {
	position: toast.POSITION.TOP_RIGHT,
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

// STUB: convert seconds to hours
export function convertSecondsToHours(seconds: number) {
	var minutes = Math.floor(seconds / 60);
	var remainingSeconds = seconds % 60;

	return convertMinutesToHours(minutes) + " " + remainingSeconds + "s";
}

function convertMinutesToHours(minutes: number) {
	var hours = Math.floor(minutes / 60);
	var remainingMinutes = minutes % 60;

	var formattedTime = hours + "h " + remainingMinutes + "m";
	return formattedTime;
}

// STUB: convert seconds to mins
export function convertSecondToMinutes(seconds: number) {
	var minutes = Math.floor(seconds / 60);
	var remainingSeconds = seconds % 60;

	var formattedTime = minutes + "m " + remainingSeconds + "s";
	return formattedTime;
}

// STUB: check if element is array
export function isInArray(element: string, array: string[]) {
	if (array.length > 0) {
		return array.includes(element);
	}
}
