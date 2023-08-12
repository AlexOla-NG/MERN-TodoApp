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
// update function for showing all, active and completed todos

const UserTodos = () => {
	const [userTodos, setUserTodos] = useState([]);
	const [selectedButton, setSelectedButton] = useState(0);
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

	// STUB: show all todos
	const showAllTodos = (buttonID: number) => {
		setSelectedButton(buttonID);
	};
	
	// STUB: show active todos
	const showActiveTodos = (buttonID: number) => {
		setSelectedButton(buttonID);
	};

	// STUB: show completed todos
	const showCompletedTodos = (buttonID: number) => {
		setSelectedButton(buttonID);
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
						<div className="desktop-control control">
							<TextButton
								id={0}
								title="All"
								handleClick={() => showAllTodos(0)}
								selected={selectedButton === 0}
							/>
							<TextButton
								id={1}
								title="Active"
								handleClick={() => showActiveTodos(1)}
								selected={selectedButton === 1}
							/>
							<TextButton
								id={2}
								title="Completed"
								handleClick={() => showCompletedTodos(2)}
								selected={selectedButton === 2}
							/>
						</div>
						<TextButton title="Clear Completed" />
					</div>

					<div className="mobile-control control">
						<TextButton
							id={0}
							title="All"
							handleClick={() => showAllTodos(0)}
							selected={selectedButton === 0}
						/>
						<TextButton
							id={1}
							title="Active"
							handleClick={() => showActiveTodos(1)}
							selected={selectedButton === 1}
						/>
						<TextButton
							id={2}
							title="Completed"
							handleClick={() => showCompletedTodos(2)}
							selected={selectedButton === 2}
						/>
					</div>
				</div>
			</section>
		</AnimatedWrapper>
	);
};

export default UserTodos;
