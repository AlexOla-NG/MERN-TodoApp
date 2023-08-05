import React, { useEffect, useState } from "react";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import TodoList from "./components/TodoList";
import { useGetUserTodos } from "../../hooks/user-todos";

const UserTodos = () => {
	const [userTodos, setUserTodos] = useState([])
	const { data, isSuccess } = useGetUserTodos();

	useEffect(() => {
		if(isSuccess) setUserTodos(data)
		
	}, [data, isSuccess])
	
	return (
		<AnimatedWrapper className="user-todos">
			<h2>My Todos</h2>
			<section>
				<TodoList todos={userTodos} />
			</section>
		</AnimatedWrapper>
	);
};

export default UserTodos;
