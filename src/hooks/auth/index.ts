import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-Instance";
import { queryKeys } from "../../react-query/constants";
import { errorAlert, successAlert } from "../../utils";

const register = async (formData: unknown) => {
	const res = await axiosInstance.post("/users", formData, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res?.data?.data;
};

const login = async (formData: unknown) => {
	const res = await axiosInstance.post("/users/login", formData, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res?.data?.data;
};

export const useRegister = () => {
	const queryClient = useQueryClient();
	const { isSuccess, mutate, isLoading } = useMutation({
		mutationFn: (formData: unknown) => register(formData),
		onSuccess: () => {
			queryClient.invalidateQueries([queryKeys.authentication]);
			successAlert(`User registration successful!`);
		},
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { isSuccess, mutate, isLoading };
};

export const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { data, isSuccess, mutate, isLoading } = useMutation({
		mutationFn: (formData: unknown) => login(formData),
		onSuccess: () => {
			queryClient.invalidateQueries([queryKeys.authentication]);
			successAlert(`Login successful!`);
			setTimeout(() => {
				navigate("/");
			}, 2000);
		},
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { data, isLoading, isSuccess, mutate };
};
