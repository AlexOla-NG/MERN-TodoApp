import React from "react";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import SingleTodo from "./components/SingleTodo";

const UserTodos = () => {
	return (
		<AnimatedWrapper className="user-todos">
			<h2>My Todos</h2>
			<section>
				<SingleTodo />
			</section>
		</AnimatedWrapper>
	);
};

export default UserTodos;
