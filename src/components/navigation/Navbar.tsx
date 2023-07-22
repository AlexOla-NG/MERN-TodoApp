import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import TextButton from "../button/TextButton";
import { successAlert } from "../../utils";
import { Token } from "../../storage";

type Navbar = {
	handleTokenUpdate(token: Token): void;
	token: Token;
};

const Navbar = ({ handleTokenUpdate, token }: Navbar) => {
	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const mobileMenuRef = useRef<HTMLUListElement>(null);
	const menuIconRef = useRef<HTMLDivElement>(null);

	// STUB: handle clickaway functionality for mobile menu
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent): void => {
			if (
				mobileMenuRef.current &&
				!mobileMenuRef.current.contains(event.target as Node) &&
				!menuIconRef.current?.contains(event.target as Node)
			) {
				setIsMobileMenuOpen(false);
			}
		};
		document.addEventListener("click", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, []);

	// STUB: mobile menu toggle functionality
	const toggleMobileMenu = (): void => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = (): void => {
		setIsMobileMenuOpen(false);
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
					<NavLink to="/" onClick={closeMobileMenu}>
						Home
					</NavLink>
				</li>
				<li className="menu-item">
					<NavLink to="/new-todo" onClick={closeMobileMenu}>
						New Todo
					</NavLink>
				</li>
				<li className="menu-item">
					<NavLink to="/user-todos" onClick={closeMobileMenu}>
						My Todos
					</NavLink>
				</li>
				<li className="menu-item">
					<TextButton handleClick={handleLogout} title="Logout" />
				</li>
			</>
		);
	} else {
		output = (
			<>
				<li className="menu-item">
					<NavLink to="/" onClick={closeMobileMenu}>
						Home
					</NavLink>
				</li>
				<li className="menu-item">
					<NavLink to="/auth" onClick={closeMobileMenu}>
						Login/Register
					</NavLink>
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
					ref={menuIconRef}
					className={`menu-icon ${isMobileMenuOpen ? "open" : ""}`}
					onClick={toggleMobileMenu}
				>
					<span></span>
					<span></span>
					<span></span>
				</div>

				<ul
					ref={mobileMenuRef}
					className={`menu ${isMobileMenuOpen ? "open" : ""}`}
				>
					{output}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
