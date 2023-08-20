import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-Instance";
import { queryKeys } from "../../react-query/constants";
import { errorAlert } from "../../utils";

const getDBTodos = async () => {
	const res = await axiosInstance.get(`/todos`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res?.data?.data;
};

export const useGetDBTodos = () => {
	const { isSuccess, data, isLoading } = useQuery({
		queryKey: [queryKeys.dbTodos],
		queryFn: () => getDBTodos(),
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { isSuccess, data, isLoading };
};
