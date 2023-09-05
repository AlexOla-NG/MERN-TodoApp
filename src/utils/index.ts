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
// @param: array of todos
// @returns an object containing user fullname and title count
export function getUserTitleCount(data: dbTodoProps[]): UserTitleCount[] {
	const userTitleCount: { [userId: string]: UserTitleCount } = {};

	data.forEach((task) => {
		const userId = task.user.id;
		const fullname = task.user.fullname;

		if (!userTitleCount[userId]) {
			userTitleCount[userId] = {
				value: 0,
				name: fullname,
			};
		}

		userTitleCount[userId].value++;
	});

	return Object.values(userTitleCount);
}

// STUB: filter array by status
// @param: array of todos, status
// @returns an array of filtered todos
export function filterByStatus(array: dbTodoProps[], status: string): dbTodoProps[] {
	return array.filter((item) => item.status === status);
}

// STUB: sum up values in array object
// @param: array of objects
// @returns: sum of values
type ArrayItem = {
	value: number;
	name: string;
};

export function sumArrayValues(arr: ArrayItem[]): number {
	return arr.reduce((sum, currentItem) => sum + currentItem.value, 0);
}

// STUB: convert datetime into usable format
// eg, 2023-07-15T08:59:01.558Z into 15 July 2023
// @param: datetime string
// @returns: formatted date string
export function formatDate(inputDate: string): string {
	const months: string[] = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const date = new Date(inputDate);
	const day: number = date.getUTCDate();
	const month: string = months[date.getUTCMonth()];
	const year: number = date.getUTCFullYear();

	return `${day} ${month} ${year}`;
}

// STUB: extract user fullname
// @param: array of todos
// @returns: user fullname
export function extractFullNames(data: dbTodoProps[]): string[] {
	const uniqueFullNamesSet = new Set<string>();

	data.forEach((item) => {
		uniqueFullNamesSet.add(item?.user?.fullname);
	});

	const uniqueFullNames: string[] = Array.from(uniqueFullNamesSet);
	return uniqueFullNames;
}