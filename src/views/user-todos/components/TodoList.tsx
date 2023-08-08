import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import SingleTodo, { SingleTodoProps } from "./SingleTodo";
import { updateTodoType } from "../../../hooks/user-todos";

type TodoListProps = {
	todos: SingleTodoProps[];
	isLoading: boolean;
	deleteTodo: (id: string) => void;
	updateTodo: (todoData: updateTodoType) => void;
};

const TodoList = ({
	todos,
	deleteTodo,
	updateTodo,
	isLoading,
}: TodoListProps) => {
	return (
		<ul className="todo-list">
			{isLoading &&
				Array.from({ length: 5 }).map((_, index) => (
					<li key={index}>
						<Skeleton baseColor="#202020" highlightColor="#444"/>
					</li>
				))}
			{todos.map((todo) => {
				const { _id, title, description, status } = todo;
				return (
					<li key={_id}>
						<SingleTodo
							_id={_id}
							title={title}
							status={status}
							description={description}
							deleteTodo={deleteTodo}
							updateTodo={updateTodo}
						/>
					</li>
				);
			})}
		</ul>
	);
};

export default TodoList;
