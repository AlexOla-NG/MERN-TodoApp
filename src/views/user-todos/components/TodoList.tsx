import React from "react";
import SingleTodo, { SingleTodoProps } from "./SingleTodo";
import { updateTodoType } from "../../../hooks/user-todos";

type TodoListProps = {
	todos: SingleTodoProps[];
	deleteTodo: (id: string) => void;
	updateTodo: (todoData: updateTodoType) => void;
};

const TodoList = ({ todos, deleteTodo, updateTodo }: TodoListProps) => {
	return (
		<ul className="todo-list">
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
