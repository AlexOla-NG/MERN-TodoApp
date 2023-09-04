import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TodoCard from "./TodoCard";
import { dashboardProps } from "./Dashboard";

const TodoCardList = ({ dbTodos, isLoading }: dashboardProps) => {
	return (
		<div className="todo-card-list">
			<ul>
				{isLoading
					? Array.from({ length: 5 }).map((_, index) => (
							<li key={index}>
								<Skeleton
									baseColor="#202020"
									highlightColor="#444"
									height="140px"
									width="100%"
								/>
							</li>
						))
					: dbTodos?.map((todo) => (
							<TodoCard
								key={todo._id}
								todo={todo}
								isLoading={isLoading}
							/>
						))
				}
			</ul>
		</div>
	);
};

export default TodoCardList;
