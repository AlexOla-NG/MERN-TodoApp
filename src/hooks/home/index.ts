import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-Instance";
import { queryKeys } from "../../react-query/constants";
import { errorAlert } from "../../utils";

const getDBTodosStats = async () => {
	const res = await axiosInstance.get(`/todos`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res?.data?.data;
};

const getDBTodos = async (page: number, limit: number) => {
	const res = await axiosInstance.get(`/todos?page=${page}&limit=${limit}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res?.data?.data;
};

export const useGetDBTodosStats = () => {
	const { isSuccess, data, isLoading } = useQuery({
		queryKey: [queryKeys.dbTodos],
		queryFn: () => getDBTodosStats(),
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { isSuccess, data, isLoading };
};

export type mutationFnProps = {
	page: number;
	limit: number;
};

export const useGetDBTodos = () => {
	const { mutate, isSuccess, data, isLoading } = useMutation({
		mutationFn: ({ page, limit }: mutationFnProps) =>
			getDBTodos(page, limit),
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { mutate, isSuccess, data, isLoading };
};
