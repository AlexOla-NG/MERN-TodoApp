import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-Instance";
import { queryKeys } from "../../react-query/constants";
import { errorAlert, successAlert } from "../../utils";
import { getStoredUser } from "../../storage";

const getUserTodos = async () => {
	const res = await axiosInstance.get(`/users/${getStoredUser()}/todos`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res?.data?.data;
};

const addTodo = async (formData: unknown) => {
	const res = await axiosInstance.post(
		`/users/${getStoredUser()}/todos`,
		formData,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return res?.data?.data;
};

export const useGetUserTodos = () => {
	const { isSuccess, data, isLoading } = useQuery({
		queryKey: [queryKeys.userTodos],
		queryFn: () => getUserTodos(),
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { isSuccess, data, isLoading };
};

export const useAddTodo = () => {
	const queryClient = useQueryClient();
	// const navigate = useNavigate();
	const { data, isSuccess, mutate, isLoading } = useMutation({
		mutationFn: (formData: unknown) => addTodo(formData),
		onSuccess: () => {
			queryClient.invalidateQueries([queryKeys.authentication]);
			successAlert(`Todo added!`);
			// setTimeout(() => {
			// 	navigate("/");
			// }, 2000);
		},
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { data, isLoading, isSuccess, mutate };
};
