import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import TextButton from "../button/TextButton";
import { TokenSchema } from "../../views/auth/interface";
import { successAlert } from "../../utils";

// TODO: stopped here
// login token is not being set in local storage, please fix

// TODO: add the clickaway library here
// we've already installed it

const Navbar = ({ handleTokenUpdate, token }: TokenSchema) => {
	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = (): void => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	// STUB: set loginToken state to false on logout
	const handleLogout = () => {
		if (handleTokenUpdate) {
			handleTokenUpdate(false);
			successAlert("Logged out successfully!");
			navigate("auth");
		}
	};

	// STUB: render different navlinks depending on whether user is logged in/out
	let output;
	if (token) {
		output = (
			<>
				<li className="menu-item">
					<NavLink to="/">Home</NavLink>
				</li>
				<li className="menu-item">
					<NavLink to="/new-todo">New Todo</NavLink>
				</li>
				<li className="menu-item">
					<NavLink to="/user-todos">My Todos</NavLink>
				</li>
				<li className="menu-item">
					<TextButton handleClick={handleLogout} title="logout" />
				</li>
			</>
		);
	} else {
		output = (
			<>
				<li className="menu-item">
					<NavLink to="/">Home</NavLink>
				</li>
				<li className="menu-item">
					<NavLink to="/auth">Login/Register</NavLink>
				</li>
			</>
		);
	}

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<NavLink to="/" className="logo">
					Todo App
				</NavLink>

				<div
					className={`menu-icon ${isMobileMenuOpen ? "open" : ""}`}
					onClick={toggleMobileMenu}
				>
					<span></span>
					<span></span>
					<span></span>
				</div>

				<ul className={`menu ${isMobileMenuOpen ? "open" : ""}`}>
					{output}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
