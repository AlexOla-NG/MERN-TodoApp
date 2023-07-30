import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-Instance";
import { queryKeys } from "../../react-query/constants";
import { errorAlert, successAlert } from "../../utils";
import { getStoredUser } from "../../storage";

const getStatusOptions = async () => {
	const res = await axiosInstance.get("/todos/status", {
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

export const useGetStatusOptions = () => {
	const { isSuccess, data, isLoading } = useQuery({
		queryKey: [queryKeys.statusOptions],
		queryFn: () => getStatusOptions(),
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
