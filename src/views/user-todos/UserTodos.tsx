import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import AnimatedWrapper from "../../routes/AnimatedWrapper";
import TodoList from "./components/TodoList";
import TextButton from "../../components/button/TextButton";
import {
	updateTodoType,
	useDeleteTodo,
	useGetUserTodos,
	useUpdateodo,
} from "../../hooks/user-todos";

// TODO: stopped here
// a: setup layout for showing all, active & completed todos controls
// b: complete styling for todo-list-control

const UserTodos = () => {
	const [userTodos, setUserTodos] = useState([]);
	const { data, isSuccess, isLoading } = useGetUserTodos();
	const { mutate: deleteDBTodo, isLoading: deleteLoading } = useDeleteTodo();
	const { mutate: updateDBTodo, isLoading: updateLoading } = useUpdateodo();

	// STUB: fetch user todos
	useEffect(() => {
		if (isSuccess) setUserTodos(data);
	}, [data, isSuccess]);

	// STUB: update todo status
	const updateTodo = (todoData: updateTodoType) => {
		updateDBTodo(todoData);
	};

	// STUB: delete todo
	const deleteTodo = (todoId: string) => {
		deleteDBTodo(todoId);
	};

	return (
		<AnimatedWrapper className="user-todos">
			<h2>My Todos</h2>
			<section className="todo-list-wrapper">
				<TodoList
					todos={userTodos}
					deleteTodo={deleteTodo}
					updateTodo={updateTodo}
					isLoading={isLoading}
					deleteLoading={deleteLoading}
					updateLoading={updateLoading}
				/>

				<div className="todo-list-control">
					<div className="todo-counter-wrapper">
						<p>{`5 items left ` || <Skeleton />}</p>
						<div className="desktop-control"></div>
						<TextButton title="Clear Completed" />
					</div>

					<div className="mobile-control">
						<TextButton title="All" />
						<TextButton title="Active" />
						<TextButton title="Completed" />
					</div>
				</div>
			</section>
		</AnimatedWrapper>
	);
};

export default UserTodos;
