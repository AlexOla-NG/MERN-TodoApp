import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-Instance";
import { queryKeys } from "../../react-query/constants";
import { errorAlert, successAlert } from "../../utils";
import { UserID } from "../../storage";

const createRecipe = async (formData: unknown) => {
	const res = await axiosInstance.post("/recipes", formData, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res?.data?.data;
};

const saveRecipe = async (data: unknown) => {
	const res = await axiosInstance.put("/recipes", data, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res?.data;
};

const getRecipes = async () => {
	const res = await axiosInstance.get("/recipes", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res?.data;
};

// STUB: get a list of all recipe IDs that a logged in user has saved
const getRecipeIDs = async (userID: UserID) => {
	const res = await axiosInstance.get(`/recipes/savedRecipes/ids/${userID}`);
	return res?.data;
};

// STUB: get a list of recipes that a logged in user has saved
const getSavedRecipes = async (userID: UserID) => {
	const res = await axiosInstance.get(`/recipes/savedRecipes/${userID}`);
	return res?.data;
};

// STUB: delete a recipe from the database that a logged in user has saved
export type DeleteSavedRecipeData = {
	recipeID: string;
	userID: UserID;
};
const deleteSavedRecipes = async (data: DeleteSavedRecipeData) => {
	const { recipeID, userID } = data;
	const res = await axiosInstance.delete(
		`/recipes/savedRecipes/${userID}/${recipeID}`
	);
	return res?.data;
};

export const useCreateRecipe = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { isSuccess, mutate, isLoading } = useMutation({
		mutationFn: (formData: unknown) => createRecipe(formData),
		onSuccess: () => {
			queryClient.invalidateQueries([queryKeys.recipes]);
			successAlert(`Recipe created successfully!`);
			setTimeout(() => {
				navigate("/");
			}, 3000);
		},
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { isSuccess, mutate, isLoading };
};

export const useSaveRecipe = () => {
	const queryClient = useQueryClient();
	const { isSuccess, mutate, isLoading, data } = useMutation({
		mutationFn: (data: unknown) => saveRecipe(data),
		onSuccess: () => {
			successAlert(`Recipe saved successfully!`);
		},
		onError: (error) => {
			errorAlert(error);
		},
	});

	return { isSuccess, mutate, isLoading, data };
};

export const useGetRecipes = () => {
	const fallback = [""];
	const {
		data = fallback,
		isLoading,
		isSuccess,
		isStale,
	} = useQuery({
		queryKey: [queryKeys.recipes],
		queryFn: () => getRecipes(),
		onSuccess: () => {
			successAlert(`Recipes loaded successfully!`);
		},
		onError: (error) => {
			console.error(error);

			errorAlert(error);
		},
		refetchOnMount: "always",
	});
	return { data, isSuccess, isLoading, isStale };
};

export const useGetRecipeIDs = () => {
	const { isSuccess, mutate, data } = useMutation({
		mutationFn: (userID: UserID) => getRecipeIDs(userID),
		onSuccess: () => {
			successAlert(`Recipe IDs loaded successfully!`);
		},
		onError: (error) => {
			console.error(error);
			errorAlert(error);
		},
	});

	return { isSuccess, mutate, data };
};

export const useGetSavedRecipes = (userID: UserID) => {
	const fallback = [""];
	const {
		data = fallback,
		isLoading,
		isSuccess,
		isStale,
	} = useQuery({
		queryKey: [queryKeys.savedRecipes, userID],
		queryFn: () => getSavedRecipes(userID),
		onSuccess: () => {
			successAlert(`Saved recipes loaded successfully!`);
		},
		onError: (error) => {
			console.error(error);

			errorAlert(error);
		},
		refetchOnMount: "always",
	});
	return { data, isSuccess, isLoading, isStale };
};

export const useDeleteSavedRecipe = () => {
	const queryClient = useQueryClient();
	const { isSuccess, mutate, data } = useMutation({
		mutationFn: (data: DeleteSavedRecipeData) => deleteSavedRecipes(data),
		onSuccess: () => {
			queryClient.invalidateQueries([queryKeys.savedRecipes]);
			successAlert(`Recipe deleted successfully!`);
		},
		onError: (error) => {
			console.error(error);
			errorAlert(error);
		},
	});

	return { isSuccess, mutate, data };
};
