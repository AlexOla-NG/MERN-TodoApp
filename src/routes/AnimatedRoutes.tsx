import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../views/home/Home";
import Auth from "../views/auth/Auth";
import NewTodo from "../views/new-todo/NewTodo";
import UserTodos from "../views/user-todos/UserTodos";
import Error from "../views/Error";
import { Token } from "../storage";

type AnimatedRoutes = {
	handleTokenUpdate(token: Token): void;
};

const AnimatedRoutes = ({ handleTokenUpdate }: AnimatedRoutes) => {
	const location = useLocation();
	return (
		<AnimatePresence mode="wait" initial={false}>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Home />} />
				<Route
					path="auth"
					element={<Auth handleTokenUpdate={handleTokenUpdate} />}
				/>
				<Route path="new-todo" element={<NewTodo />} />
				<Route path="user-todos" element={<UserTodos />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</AnimatePresence>
	);
};

export default AnimatedRoutes;
