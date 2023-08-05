import React from "react";
import SingleTodo, { SingleTodoProps } from "./SingleTodo";

type TodoListProps = {
	todos: SingleTodoProps[];
};

const TodoList = ({ todos }: TodoListProps) => {
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
						/>
					</li>
				);
			})}
		</ul>
	);
};

export default TodoList;
