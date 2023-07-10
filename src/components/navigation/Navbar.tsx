import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// TODO: add the clickaway library here
// we've already installed it

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = (): void => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<a href="/" className="logo">
					Todo App
				</a>

				<div
					className={`menu-icon ${isMobileMenuOpen ? "open" : ""}`}
					onClick={toggleMobileMenu}
				>
					<span></span>
					<span></span>
					<span></span>
				</div>

				<ul className={`menu ${isMobileMenuOpen ? "open" : ""}`}>
					<li className="menu-item">
						<NavLink to="/">Home</NavLink>
					</li>
					<li className="menu-item">
						<NavLink to="/auth">Register</NavLink>
					</li>
					<li className="menu-item">
						<NavLink to="/new-todo">New Todo</NavLink>
					</li>
					<li className="menu-item">
						<NavLink to="/user-todos">My Todos</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
