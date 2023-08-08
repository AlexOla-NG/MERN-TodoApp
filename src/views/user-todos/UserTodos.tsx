import React, { useEffect, useState } from "react";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import TodoList from "./components/TodoList";
import { updateTodoType, useDeleteTodo, useGetUserTodos, useUpdateodo } from "../../hooks/user-todos";

// TODO: stopped here
// a: setup layout for showing all, active & completed todos controls 
// b: add a loading state for useGetUserTodos. Use framer motion.

const UserTodos = () => {
	const [userTodos, setUserTodos] = useState([])
	const { data, isSuccess, isLoading } = useGetUserTodos();
	const { mutate: deleteDBTodo } = useDeleteTodo();
	const { mutate: updateDBTodo } = useUpdateodo();

	// STUB: fetch user todos
	useEffect(() => {
		if(isSuccess) setUserTodos(data)
		
	}, [data, isSuccess])

	// STUB: update todo status
	const updateTodo = (todoData: updateTodoType) => {
		updateDBTodo(todoData);
	}

	// STUB: delete todo
	const deleteTodo = (todoId: string) => {
		deleteDBTodo(todoId);
	}
	
	return (
		<AnimatedWrapper className="user-todos">
			<h2>My Todos</h2>
			<section>
				<TodoList
					todos={userTodos}
					deleteTodo={deleteTodo}
					updateTodo={updateTodo}
					isLoading={isLoading}
				/>
			</section>
		</AnimatedWrapper>
	);
};

export default UserTodos;
