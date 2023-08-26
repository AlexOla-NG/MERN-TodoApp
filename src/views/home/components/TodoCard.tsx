import React from "react";
import { dbTodoProps } from "../Home";
import Pill from "./Pill";
import { ReactComponent as Clock } from "../../../assets/svg/clock.svg";
import { formatDate } from "../../../utils";

type TodoCardProps = {
	todo: dbTodoProps;
	isLoading: boolean;
};

const TodoCard = ({ todo, isLoading }: TodoCardProps) => {
	const { status, createdAt, user, title } = todo;
	return (
		<li className="todo-card">
			<Pill status={status} />
			<h4>{title}</h4>
			<div className="todo-card-footer">
				<div>
					<Clock />
					{formatDate(createdAt)}
				</div>
				<p>{user?.fullname}</p>
			</div>
		</li>
	);
};

export default TodoCard;
