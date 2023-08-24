import React from 'react'
import { dbTodoProps } from '../Home';

// TODO: stopped here
// destructure todo props

type TodoCardProps = {
	todo: dbTodoProps;
	isLoading: boolean;
};

const TodoCard = ({todo, isLoading}: TodoCardProps) => {
  return (
		<li className='todo-card'>
			<div className={`tag`}>tag</div>
			<h4>todo title</h4>
			<div>
				<div>time created</div>
				<div>name of creator</div>
			</div>

		</li>
  );
}

export default TodoCard