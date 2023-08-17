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

const getUserActiveTodos = async () => {
	const res = await axiosInstance.get(
		`/users/${getStoredUser()}/todos?status=active`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return res?.data?.data;
};

const getUserCompletedTodos = async () => {
	const res = await axiosInstance.get(
		`/users/${getStoredUser()}/todos?status=completed`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return res?.data?.data;
};

const deleteTodo = async (todoID: string) => {
	const res = await axiosInstance.delete(`/todos/${todoID}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res?.data?.data;
};

const deleteUserCompletedTodos = async () => {
	const res = await axiosInstance.delete(`/users/${getStoredUser()}/todos`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res?.data?.data;
};

export type updateTodoType = {
	_id?: string;
	title?: string;
	description?: string;
	status?: string;
};
const updateTodo = async (formData: updateTodoType) => {
	const res = await axiosInstance.put(
		`/todos/${formData._id}`,
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

export const useGetUserActiveTodos = () => {
	const { isSuccess, data, isLoading } = useQuery({
		queryKey: [queryKeys.userActiveTodos],
		queryFn: () => getUserActiveTodos(),
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { isSuccess, data, isLoading };
};


export const useGetUserCompletedTodos = () => {
	const { isSuccess, data, isLoading } = useQuery({
		queryKey: [queryKeys.userCompletedTodos],
		queryFn: () => getUserCompletedTodos(),
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { isSuccess, data, isLoading };
};

export const useUpdateTodo = () => {
	const queryClient = useQueryClient();
	const { data, isSuccess, mutate, isLoading } = useMutation({
		mutationFn: (formData: updateTodoType) => updateTodo(formData),
		onSuccess: () => {
			Promise.all([
				queryClient.invalidateQueries([queryKeys.userTodos]),
				queryClient.invalidateQueries([queryKeys.userCompletedTodos]),
				queryClient.invalidateQueries([queryKeys.userActiveTodos]),
			]);
			successAlert(`Todo updated!`);
		},
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { data, isLoading, isSuccess, mutate };
};

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();
	const { data, isSuccess, mutate, isLoading } = useMutation({
		mutationFn: (todoID: string) => deleteTodo(todoID),
		onSuccess: () => {
			Promise.all([
				queryClient.invalidateQueries([queryKeys.userTodos]),
				queryClient.invalidateQueries([queryKeys.userCompletedTodos]),
				queryClient.invalidateQueries([queryKeys.userActiveTodos]),
			]);
			successAlert(`Todo deleted!`);
		},
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { data, isLoading, isSuccess, mutate };
};

export const useDeleteUserCompletedTodos = () => {
	const queryClient = useQueryClient();
	const { data, isSuccess, mutate, isLoading } = useMutation({
		mutationFn: () => deleteUserCompletedTodos(),
		onSuccess: () => {
			Promise.all([
				queryClient.invalidateQueries([queryKeys.userTodos]),
				queryClient.invalidateQueries([queryKeys.userCompletedTodos]),
				queryClient.invalidateQueries([queryKeys.userActiveTodos]),
			]);
			successAlert(`Completed todos cleared!`);
		},
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { data, isLoading, isSuccess, mutate };
};
