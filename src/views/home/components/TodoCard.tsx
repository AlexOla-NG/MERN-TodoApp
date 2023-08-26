import React from 'react'
import { dbTodoProps } from '../Home';
import Pill from './Pill';

// TODO: stopped here
// destructure todo props

type TodoCardProps = {
	todo: dbTodoProps;
	isLoading: boolean;
};

const TodoCard = ({todo, isLoading}: TodoCardProps) => {
	const {status, createdAt, user, title} = todo
  return (
		<li className="todo-card">
			<div className={`tag`}>
				<Pill status={status} />
			</div>
			<h4>{title}</h4>
			<div>
				<div>{createdAt}</div>
				<div>
					<p>{user?.fullname}</p>
				</div>
			</div>
		</li>
  );
}

export default TodoCard