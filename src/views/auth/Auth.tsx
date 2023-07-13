import React, { useState } from "react";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import Register from "./components/Register";
import Login from "./components/Login";
import { Token } from "../../storage";

// TODO: stopped here
// setup register & login components

type Auth = {
	handleTokenUpdate(token: Token): void;
};

const Auth = ({ handleTokenUpdate }: Auth) => {
	const [pageView, setPageView] = useState("login");

	const toggleView = () => {
		setPageView(pageView === "login" ? "register" : "login");
	};

	return (
		<AnimatedWrapper>
			{pageView === "register" && <Register toggleView={toggleView} />}
			{pageView === "login" && (
				<Login
					toggleView={toggleView}
					handleTokenUpdate={handleTokenUpdate}
				/>
			)}
		</AnimatedWrapper>
	);
};

export default Auth;
