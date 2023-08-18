import React, { useEffect, useRef, useState } from "react";

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

const UserTodos = () => {
	const isFirstRender = useRef(true);
	const [userTodos, setUserTodos] = useState([]);
	const [allTodos, setAllTodos] = useState([]);
	const [activeTodos, setActiveTodos] = useState([]);
	const [completedTodos, setCompletedTodos] = useState([]);
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

	// STUB: update user todos on initial render
	useEffect(() => {
		// STUB: do something after state has updated
		if (isFirstRender.current) {
			isFirstRender.current = false; // toggle flag after first render/mounting
			return;
		}

		// STUB: update user todos depending selected button value
		if (selectedButton === 0) setUserTodos(allTodos);
		if (selectedButton === 1) setUserTodos(activeTodos);
		if (selectedButton === 2) setUserTodos(completedTodos);
	}, [allTodos, activeTodos, completedTodos, selectedButton]);

	// STUB: fetch all todos
	useEffect(() => {
		if (isSuccess) setAllTodos(data);
	}, [data, isSuccess]);

	// STUB: fetch active todos
	useEffect(() => {
		if (activeSuccess) setActiveTodos(userActiveTodos);
	}, [userActiveTodos, activeSuccess]);

	// STUB: fetch completed todos
	useEffect(() => {
		if (completedSuccess) setCompletedTodos(userCompletedTodos);
	}, [userCompletedTodos, completedSuccess]);

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
			setUserTodos(allTodos);
		}
	};

	// STUB: show active todos
	const showActiveTodos = (buttonID: number) => {
		if (activeSuccess) {
			setSelectedButton(buttonID);
			setUserTodos(activeTodos);
		}
	};

	// STUB: show completed todos
	const showCompletedTodos = (buttonID: number) => {
		if (completedSuccess) {
			setSelectedButton(buttonID);
			setUserTodos(completedTodos);
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
