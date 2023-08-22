import React, { useEffect, useState } from "react";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import Dashboard from "./components/Dashboard";
import TodoCardList from "./components/TodoCardList";

import { useGetDBTodos } from "../../hooks/home";

type user = {
	_id: string;
	id: string;
	fullname: string;
}

export type dbTodoProps = {
	createdAt: string;
	description?: string;
	status: string;
	title: string;
	user: user;
	_id: string;
	_v: number;
}

const Home = () => {
	const [dbTodos, setDBTodos] = useState<dbTodoProps[]>([]);
	const {data, isSuccess, isLoading} = useGetDBTodos();

	useEffect(() => {
		if (isSuccess) setDBTodos(data);
	}, [isSuccess, data]);
	
	return (
		<AnimatedWrapper>
			<Dashboard dbTodos={dbTodos} isLoading={isLoading} />
			<TodoCardList />
		</AnimatedWrapper>
	);
};

export default Home;
