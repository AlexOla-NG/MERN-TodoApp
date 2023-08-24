import React from 'react'
import TodoCard from './TodoCard'
import { dashboardProps } from './Dashboard'

const TodoCardList = ({dbTodos, isLoading}: dashboardProps) => {
  return (
		<section className="todo-card-list">
			<ul>
				{dbTodos.map((todo) => (
					<TodoCard
						key={todo._id}
						todo={todo}
						isLoading={isLoading}
					/>
				))}
			</ul>
		</section>
  );
}

export default TodoCardList