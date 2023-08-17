import React, { useEffect, useState } from "react";

import AnimatedWrapper from "../../routes/AnimatedWrapper";
import TodoList from "./components/TodoList";
import TextButton from "../../components/button/TextButton";
import {
	updateTodoType,
	useDeleteTodo,
	useDeleteUserCompletedTodos,
	useGetUserActiveTodos,
	useGetUserCompletedTodos,
	useGetUserTodos,
	useUpdateTodo,
} from "../../hooks/user-todos";

// TODO: stopped here
// active & completed todos should have updated values when todo is updated

const UserTodos = () => {
	const [userTodos, setUserTodos] = useState([]);
	const [selectedButton, setSelectedButton] = useState(0);
	const { data, isSuccess, isLoading } = useGetUserTodos();
	const {
		data: userActiveTodos,
		isSuccess: activeSuccess,
		isLoading: activeLoading,
	} = useGetUserActiveTodos();
	const {
		data: userCompletedTodos,
		isSuccess: completedSuccess,
		isLoading: completedLoading,
	} = useGetUserCompletedTodos();
	const { mutate: deleteDBTodo, isLoading: deleteLoading } = useDeleteTodo();
	const { mutate: deleteCompletedDBTodo } = useDeleteUserCompletedTodos();
	const { mutate: updateDBTodo, isLoading: updateLoading } = useUpdateTodo();

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
		if (isSuccess) {
			setSelectedButton(buttonID);
			setUserTodos(data);
		}
	};

	// STUB: show active todos
	const showActiveTodos = (buttonID: number) => {
		if (activeSuccess) {
			setSelectedButton(buttonID);
			setUserTodos(userActiveTodos);
		}
	};

	// STUB: show completed todos
	const showCompletedTodos = (buttonID: number) => {
		if (completedSuccess) {
			setSelectedButton(buttonID);
			setUserTodos(userCompletedTodos);
		}
	};

	// STUB: delete user completed todos
	const deleteCompletedTodos = () => {
		deleteCompletedDBTodo();
	};

	return (
		<AnimatedWrapper className="user-todos">
			<h2>My Todos</h2>
			<section className="todo-list-wrapper">
				<TodoList
					todos={userTodos}
					deleteTodo={deleteTodo}
					updateTodo={updateTodo}
					isLoading={isLoading || activeLoading || completedLoading}
					deleteLoading={deleteLoading}
					updateLoading={updateLoading}
				/>

				<div className="todo-list-control">
					<div className="todo-counter-wrapper">
						<p>
							{userTodos.length > 1
								? `${userTodos.length} items left `
								: `${userTodos.length} item left `}
						</p>
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
						<TextButton
							title="Clear Completed"
							handleClick={deleteCompletedTodos}
						/>
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
